import * as React from 'react';
import styles from './AlvSearch.module.scss';
import { IAlvSearchProps, IAlvSearchState, ISearchPlace } from './IAlvSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { saveViewAnalytics } from '../CoreFPS/Analytics';

// import FetchBanner from '../CoreFPS/FetchBannerElement';
import FetchBannerX from '@mikezimm/fps-library-v2/lib/banner/bannerX/FetchBannerX';
// import { createSpecialElement } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/component';
// import { ISpecialMessage, } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/interface';

import { getWebPartHelpElementBoxTiles } from '../PropPaneHelp/PropPaneHelp';
import { getBannerPages, } from './HelpPanel/AllContent';
import { check4Gulp, IBannerPages, } from "../fpsMinIndex";

import { ILoadPerformance, startPerformOp, updatePerformanceEnd } from "../fpsMinIndex";

import { ISiteThemes } from "@mikezimm/fps-library-v2/lib/common/commandStyles/ISiteThemeChoices";
const SiteThemes: ISiteThemes = { dark: styles.fpsSiteThemeDark, light: styles.fpsSiteThemeLight, primary: styles.fpsSiteThemePrimary };

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: FpsCore115Banner';

const tenant: string = window.location.hostname.toLowerCase().replace(`.sharepoint.com`, '' );
const code: string = `vla`.split("").reverse().join("");

export default class AlvSearch extends React.Component<IAlvSearchProps, IAlvSearchState> {

  private _backStyle = [
    undefined,
    styles.hideNav,
    styles.showNav,
  ]
  private _performance: ILoadPerformance = null;

  private _webPartHelpElement = [
    getWebPartHelpElementBoxTiles( ),
  ];

  private _contentPages : IBannerPages = getBannerPages( this.props.bannerProps );

  private _newRefreshId() :string  {

    const startTime = new Date();
    const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();
    return refreshId;

  }

  
 /***
*     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
*    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
*    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
*    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
*    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
*     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
*                                                                                                  
*                                                                                                  
*/


public constructor(props:IAlvSearchProps){
  super(props);

  if ( this._performance === null ) { this._performance = this.props.performance;  }

  this.state = {
    pinState: this.props.bannerProps.fpsPinMenu.defPinState ? this.props.bannerProps.fpsPinMenu.defPinState : 'normal',
    showDevHeader: false,
    lastStateChange: '', 
    analyticsWasExecuted: false,
    refreshId: this._newRefreshId(),
    debugMode: false,
    showSpinner: false,
    textSearch: '',
    iframeSrc: '',
    lastPlace: null,
    showBack: 0,
  };
}

  public componentDidMount(): void {
    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidMount` );

    //Start tracking performance
    this._performance.ops.fetch1 = startPerformOp( 'fetch1 TitleText', this.props.bannerProps.displayMode );
    //Do async code here

    //End tracking performance
    this._performance.ops.fetch1 = updatePerformanceEnd( this._performance.ops.fetch1, true, 777 );

    const analyticsWasExecuted = saveViewAnalytics( 'ALV Search View', 'didMount' , this.props, this.state.analyticsWasExecuted, this._performance );

    if ( this.state.analyticsWasExecuted !==  analyticsWasExecuted ) {
      this.setState({ analyticsWasExecuted: analyticsWasExecuted });
    }

  }



//
  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *         
 *         
 */

  public componentDidUpdate( prevProps: IAlvSearchProps ): void {

    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidUpdate` );

    const refresh = this.props.bannerProps.displayMode !== prevProps.bannerProps.displayMode ? true : false;

    //refresh these privates when the prop changes warrent it
    if ( refresh === true ) {
      this._contentPages = getBannerPages( this.props.bannerProps );
    }

    if ( check4Gulp() === true )  console.log('React componentDidUpdate - this._performance:', JSON.parse(JSON.stringify(this._performance)) );

  }

  public render(): React.ReactElement<IAlvSearchProps> {
    const {
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const {
      showBack
    } = this.state;
    /***
 *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b.      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY'      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b        88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88   8D 88   88 88  V888 88  V888 88.     88 `88.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                        
 *                                        
 */

    const Banner = <FetchBannerX 

      panelPerformance={ this._performance }
      siteThemes = { SiteThemes }

      bannerProps={ this.props.bannerProps }
      parentState={ this.state }

      nearBannerElementsArray={ [] }
      farBannerElementsArray={ [] }

      contentPages={ this._contentPages }
      WebPartHelpPivots= { this._webPartHelpElement }

      // SpecialMessage = { Special }

      updatePinState = { null }
      pinState = { null }
    />;

    const BackDrop: JSX.Element = <div id='body-nav' className={ [ styles.bodyNav, this.state.showBack !== 0 ? styles.maxZindex : styles.minZindex , this._backStyle[ showBack ] ].join(' ') }>
      <div onClick={ () => this._hideBack() } style={{ fontSize: '48px'}}>Test text</div>
    </div>

    const SearchButtons : JSX.Element = <div>
      <div className={ styles.searchGrid }>
        <div className={ styles.heading }>
          <div className={ styles.headingText }>Welcome to Search - Re-thought, {escape(userDisplayName)}!</div>
          <div style={{ width: '100px', height: ''}} onClick={ () => { this._showBack() }}>{ <Icon iconName='Search'/> }</div>
         </div>
        <SearchBox
            value={ this.state.textSearch }
            styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '18px' } }}
            placeholder="Search"
            onSearch={ this._search.bind(this) }
            onFocus={ null }
            onBlur={ () => console.log('onBlur called') }
            onChange={ this._search.bind(this) }
            onKeyDown={(ev)=> { this._enter(ev.key)}}
          />
        <div className={ styles.buttonGrid }>
          <abbr title="Search (New) SharePoint Online"><button onClick={ () => { this._buttonClick( `SPO` ) }} >Updated Search</button></abbr>
          <abbr title="Search (Old) SharePoint On-Premise"><button onClick={ () => { this._buttonClick( `onPrem` ) }} >Legacy Search </button></abbr>
          <abbr title="Search for Engineering Parts"><button onClick={ () => { this._buttonClick( `parts` ) }} >Search Part Numbers</button></abbr>
          <abbr title="Search the AS100 Project Dashboard"><button onClick={ () => { this._buttonClick( `projects` ) }} >Search Projects</button></abbr>
          <abbr title="Search Standards"><button onClick={ () => { this._buttonClick( `standards` ) }} >Search Standards</button></abbr><br/><br/>
        </div>

        <iframe src="" width="100%" height="999px" name="search_iframe"/>

      </div>

    </div>;

    return (
      <section className={`${styles.alvSearch} ${hasTeamsContext ? styles.teams : ''}`}>
        { Banner }
        { BackDrop }
        { SearchButtons }
      </section>
    );
  }

  private _showBack() : void {
    const { showBack  } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newBack: any = showBack === 2 ? 0 : 2;
    console.log('newBack:',  this._backStyle[ newBack ]  );
    this.setState({ showBack: 2 });

    // // Delay creds to:  https://stackoverflow.com/a/42090488
    // setTimeout(function(){
    //   this.setState({ showBack: 1 });
    //   console.log('newBack:',  this._backStyle[ 1 ]  );
    // }.bind(this), 1000);

    // setTimeout(function(){
    //   this.setState({ showBack: 0 });
    //   console.log('newBack:',  this._backStyle[ 0 ]  );
    // }.bind(this), 2000);

  }

  private _hideBack() : void {

    this.setState({ showBack: 1 });

    // Delay creds to:  https://stackoverflow.com/a/42090488
    setTimeout(function(){
      this.setState({ showBack: 0 });
      console.log('newBack:',  0  );
    }.bind(this), 1000);

  }

  private _buttonClick( button: ISearchPlace ): void {
    console.log( `_buttonClick`, button );
    const { textSearch } = this.state;

    switch ( button ) {
      case 'SPO':
        window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${textSearch}`, "search_iframe");
        break;
      case 'onPrem':
        window.open(`https://${code}apps.${code}.${tenant}.int/sites/search/Pages/results.aspx?k=${textSearch}`, "_blank");
        break;
      case 'parts':
        window.open(`https://parts.${code}.${tenant}.int/eparts?q=${textSearch}`, "search_iframe");
        break;
      case 'projects':
        window.open(`https://projects.${code}.${tenant}.int/dashboard?q=${textSearch}`, "search_iframe");
        break;
      case 'standards':
        window.open(`https://${code}apps.${code}.${tenant}.int/sites/${code}acs/SitePages/Search%20All%20Standards.aspx?u=https%3A%2F%2F${code}apps%2E${code}%2E${tenant}%2Eint%2Fsites%2F${code}acs&k=#k=${textSearch}`, "_blank");
        break;
      default:
        window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${textSearch}`, "search_iframe");
    }

  }

  private _search(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ): void {
    console.log( '_search:', event , newValue );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( event === this.state.textSearch as any && newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${event}`, "search_iframe");
    } else {
      this.setState({ textSearch: newValue });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _enter(event: any, newValue?: string ): void {
    console.log( '_enter:', event , newValue );
  }
}
