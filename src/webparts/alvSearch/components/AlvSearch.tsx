import * as React from 'react';
import styles from './AlvSearch.module.scss';
import { ClearHints, IAlvSearchProps, IAlvSearchState, IInOrOut, IPowerSearch, IPowerSearchKeys, ISearchPlace } from './IAlvSearchProps';
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
import { getDocsHeadings, getRandomTipElement, KQLDocLinkInt, KQLDocsHeadings } from './SearchTips/tips';
import { getTypesTable } from './SearchTips/filetype';
import { TextField } from 'office-ui-fabric-react';
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

    showHistory: false,
    history: [],
    historyBuild: [],
    iframeSrc: '',
    lastPlace: null,
    showBack: 0,

    search: {
      textSearch: '',

      keywords: { In: '', Out: '' },
      author: { In: '', Out: '' },
      editor: { In: '', Out: '' },
      filetype: { In: '', Out: '' },
      filename: { In: '', Out: '' },
      title: { In: '', Out: '' },
      time: { In: '', Out: '' },

      cust1: { In: '', Out: '' },
      cust2: { In: '', Out: '' },
      cust3: { In: '', Out: '' },
      cust4: { In: '', Out: '' },
      date1: { In: '', Out: '' },
    },
    hints: ClearHints,
    powerIframeUrl: '',
    powerIndex: -1,
    reclickCount: 0,
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

    console.log( '_search-State', this.state );
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
      <div onClick={ () => this._hideBack() } style={{ fontSize: '48px'}}>Welcome to PowerSearch</div>
      <div className={ styles.links} onClick={ () => window.open(`https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference`,`_blank` ) } style={{ fontSize: '48px'}}>Learn about KQL</div>
      { getRandomTipElement( '*' ) }
      { this.powerSearchRow( `keywords` ) }
      { this.powerSearchRow( `author` ) }
      {/* { this.powerSearchRow( `editor` ) } */}
      { this.powerSearchRow( `filetype` ) }
      { this.powerSearchRow( `filename` ) }
      <div style={{ fontSize: '14px', marginTop: '20px' }} onClick={ () => this._setPowerIframe( KQLDocsHeadings[0].heading, 0 ) }>Tweak your query below and then press enter...</div>
      <div className={ styles.currentQuery }>
        <Icon iconName={ this.state.history.length > 0 ? "History" : '' } onClick={ () => this.setState({ 
            showHistory: !this.state.showHistory, hints: { ...this.state.hints, ...{ docs: false }},
            powerIndex: -1,
            powerIframeUrl: '',
          }) }/>
        <SearchBox
          value={ this.state.search.textSearch }
          styles={{ root: { height: '2.5em', fontSize: '16px', backgroundColor: `rgb(178 178 178)` } }}
          placeholder="Type in boxes above"
          onSearch={ this._search.bind(this) }
          onFocus={ null }
          // onBlur={ () => console.log('onBlur called') }
          onChange={ this._search.bind(this) }
          onKeyDown={(ev)=> { this._enter(ev.key)}}
        />
      </div>

      <div style={{ fontSize: '18px', marginTop: '30px', marginBottom: '20px', fontWeight: 500 }} onClick={ () => this._hideBack() }>Click here to return to page.</div>
      <div className={ this.state.showHistory === true ? styles.showTips : styles.hideTips }>
        <div style={{ fontSize: 'larger' }}>Query history - Click one to</div>
        { this.state.history.map( ( history, index ) => {
          return <div className={ styles.queryHistoryRow } key={ history } ><Icon iconName={ "Upload" } onClick={ () => this._loadHistory( index ) } />{history}</div>;
        })}

      </div>
      <div className={ this.state.powerIframeUrl && this.state.powerIndex > -1 ? styles.showTips : styles.hideTips } style={{ marginTop: '15px'}}>
          <div className={ styles.closeHeadingsIcon } >
            <Icon onClick={ () => this._setPowerIframe( ``, -1 ) } iconName='ChromeClose' title={ `Close docs window` }/>
            <Icon onClick={ () => window.open( `${KQLDocLinkInt}${ KQLDocsHeadings[ this.state.powerIndex ].heading }`, '_blank' ) } iconName='OpenInNewWindow' title={ `Open docs in new tab` } />
          </div>
        <iframe src={ this.state.powerIframeUrl } width="800px" height={ `600px` } name="power_iframe"/>
      </div>
      { getTypesTable( this.state.hints.filetype === true ? styles.showTips : styles.hideTips ) }
      { getDocsHeadings( this.state.hints.docs, this.state.hints.current, this._setPowerIframe.bind(this), this.state.powerIndex, this._blurP.bind( this ) ) }
      {/* <div className={ styles.powerSearch }>
        <div className={ styles.searchRowLabel }>{`keywords ->`}</div>
        <SearchBox
              value={ this.state.search.textSearch }
              styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '18px' } }}
              placeholder="Include in Search"
              onSearch={ this._search.bind(this) }
              onFocus={ null }
              onBlur={ () => console.log('onBlur called') }
              onChange={ this._search.bind(this, '+', 'words' ) }
              onKeyDown={(ev)=> { this._enter( ev.key )}}
            />
        <SearchBox
            value={ this.state.search.textSearch }
            styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '18px' } }}
            placeholder="Exclude in Search"
            onSearch={ this._search.bind(this) }
            onFocus={ null }
            onBlur={ () => console.log('onBlur called') }
            onChange={ this._search.bind(this) }
            onKeyDown={(ev)=> { this._enter(ev.key)}}
          />
      </div> */}

    </div>

    const SearchButtons : JSX.Element = <div>
      <div className={ styles.searchGrid }>
        <div className={ styles.heading }>
          <div className={ styles.headingText }>Welcome to Search - Re-thought, {escape(userDisplayName)}!</div>
          <div style={{ width: '100px', height: ''}} onClick={ () => { this._showBack() }}>{ <Icon iconName='Search'/> }</div>
         </div>
        <SearchBox
            value={ this.state.search.textSearch }
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
    const { textSearch } = this.state.search;
    this.setState({ showBack: 1 });

    // Delay creds to:  https://stackoverflow.com/a/42090488
    setTimeout(function(){
      this.setState({ showBack: 0 });
      console.log('newBack:',  0  );
      window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${textSearch}`, "search_iframe");
    }.bind(this), 1000);

  }

  private _buttonClick( button: ISearchPlace ): void {
    console.log( `_buttonClick`, button );
    const { textSearch } = this.state.search;

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


  private _search( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( event === this.state.search.textSearch as any && newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      if ( this.state.history.indexOf( this.state.search.textSearch ) < 0 ) {
        const historyBuild: string[] = this.state.historyBuild;
        historyBuild.push( JSON.stringify( this.state.search ) );
        const history: string[] = this.state.history;
        history.push( this.state.search.textSearch );
        this.setState({ history: history, historyBuild: historyBuild });
      }
      window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${event}`, "search_iframe");
    } else {
      const search: IPowerSearch = JSON.parse(JSON.stringify( this.state.search ));
      search.textSearch = newValue;
      this.setState({ search: search });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _enter(event: any, newValue?: string ): void {
    console.log( '_enter:', event , newValue );
  }

  private _loadHistory( index: number ): void {

    const search: IPowerSearch = JSON.parse( this.state.historyBuild[index] );
    this.setState({ search: search });
  }
  /**
   * 
   * this onClick:  onChange={ this._search.bind(this, '+', 'words' ) }
   * matches this:  _search( inOrOut: string, what: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
   * @param inOrOut 
   * @param what 
   * @param event 
   * @param newValue 
   */

  private _searchP( inOrOut: IInOrOut, what: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    console.log( '_search:', event , newValue, inOrOut, what );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${this.state.search.textSearch}`, "search_iframe");
      const historyBuild: string[] = this.state.historyBuild;
      historyBuild.push( JSON.stringify( this.state.search ) );
      const history: string[] = this.state.history;
      history.push( this.state.search.textSearch );
      this.setState({ history: history, historyBuild: historyBuild });

    } else {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const search: IPowerSearch = this._getPowerSearch( inOrOut, what, newValue );
      search.textSearch = this.powerSearchString( search );
      this.setState( { search: search, } ); //textSearch: textSearch 
    }
  }

  private _blurP( inOrOut: IInOrOut, what: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    console.log( '_blurP:', event , newValue, inOrOut, what );
    this.setState({
      hints: { ...ClearHints, ...{ docs: true }},
    });
  }

  private _focusP( inOrOut: IInOrOut, what: IPowerSearchKeys, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    console.log( '_focusP:', event , newValue, inOrOut, what );
    this.setState({
      hints: {
        docs: true,
        author: what === `author` ? true : false,
        editor: what === `editor` ? true : false,
        filename: what === `filename` ? true : false,
        filetype: what === `filetype` ? true : false,
        keywords: what === `keywords` ? true : false,
        title: what === `title` ? true : false,
        time: what === `time` ? true : false,

        cust1: what === `cust1` ? true : false,
        cust2: what === `cust2` ? true : false,
        cust3: what === `cust3` ? true : false,
        cust4: what === `cust4` ? true : false,
        date1: what === `date1` ? true : false,
        current: what,
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _enterP(event: any, newValue?: string ): void {
    console.log( '_enter:', event , newValue );
  }




  private powerSearchString( search: IPowerSearch ) : string {
    // const { keywords, author, filetype, filename } = search;
    // const keyIn = !keywords ? '' : `${keywords.In.split(';').join( ' AND ' )}`;
    // const keyOut = !keywords ? '' : `-${keywords.Out.split(';').join( ' AND -' )}`;

    // const authorIn = !author ? '' : `author:${author.In.split(';').join( ' AND author:' )}`;
    // const authorOut = !author ? '' : `-author:${author.Out.split(';').join( ' AND -author:' )}`;

    // const filetypeIn = !filetype ? '' : `filetype:${filetype.In.split(';').join( ' AND filetype:' )}`;
    // const filetypeOut = !filetype ? '' : `-filetype:${filetype.Out.split(';').join( ' AND -filetype:' )}`;

    // const filenameIn = !filename ? '' : `filename:${filename.In.split(';').join( ' AND filename:' )}`;
    // const filenameOut = !filename ? '' : `-filename:${filename.Out.split(';').join( ' AND -filename:' )}`;

    // return `${keyIn} ${keyOut} ${authorIn} ${authorOut} ${filetypeIn} ${filetypeOut} ${filenameIn} ${filenameOut}`;

    const { keywords, author, filetype, filename } = search;
    const keyIn = !keywords.In ? '' : keywords.In.split(';');
    const keyOut = !keywords.Out ? '' : `-${keywords.Out.split(';').join( ' -' )}`.split(' ');

    const authorIn = !author.In ? '' : `author:${author.In.split(';').join( ' author:' )}`.split(' ');
    const authorOut = !author.Out ? '' : `-author:${author.Out.split(';').join( ' -author:' )}`.split(' ');

    const filetypeIn = !filetype.In ? '' : `filetype:${filetype.In.split(';').join( ' filetype:' )}`.split(' ');
    const filetypeOut = !filetype.Out ? '' : `-filetype:${filetype.Out.split(';').join( ' -filetype:' )}`.split(' ');

    const filenameIn = !filename.In ? '' : `filename:${filename.In.split(';').join( ' filename:' )}`.split(' ');
    const filenameOut = !filename.Out ? '' : `-filename:${filename.Out.split(';').join( ' -filename:' )}`.split(' ');

    const allChecks: string[] = [ ...keyIn, ...keyOut, ...authorIn, ...authorOut, ...filetypeIn, ...filetypeOut, ...filenameIn, ...filenameOut ];
    return allChecks.join(' AND ');

  }

  private powerSearchRow( row: IPowerSearchKeys ) : JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stateAny : any = this.state;
    const eleRow = 
    <div className={ styles.powerSearch }>
      <div className={ styles.searchRowLabel }>{`${row} ->`}</div>
      <SearchBox
        value={ stateAny[ `searchIn${row}` ] }
        styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '16px' } }}
        placeholder="Include in Search"
        onSearch={ this._searchP.bind(this, 'In', row ) }
        onFocus={ this._focusP.bind(this, 'In', row ) }
        // onBlur={ this._blurP.bind(this, 'In', row ) }
        onChange={ this._searchP.bind(this, 'In', row ) }
        onKeyDown={(ev)=> { this._enterP( ev.key )}}
      />
      <SearchBox
        value={ stateAny[ `searchOut${row}` ] }
        styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '16px' } }}
        placeholder="Exclude in Search"
        onSearch={ this._searchP.bind(this, 'Out', row ) }
        onFocus={ this._focusP.bind(this, 'Out', row ) }
        // onBlur={ this._blurP.bind(this, 'Out', row ) }
        onChange={ this._searchP.bind(this, 'Out', row ) }
        onKeyDown={(ev)=> { this._enterP(ev.key)}}
      />
    </div>;

    return eleRow;

  }

  private _setPowerIframe( head: string, powerIndexNew: number ): void {
    console.log('');
    const { powerIndex, reclickCount } = this.state;
    const isSame : boolean = powerIndex === powerIndexNew ? true : false;
    // Sometimes you want to click twice when the docs are first loaded due to slow navigating to heading
    const clickedCount = isSame === true ? reclickCount + 1 : 0;

    const powerIframeUrl: string = head ? `${KQLDocLinkInt}${head}` : '';
    // this.setState({ powerIframeUrl: powerIframeUrl});

    this.setState({ powerIframeUrl: powerIframeUrl, powerIndex: isSame && clickedCount > 1 ? -1 : powerIndexNew, reclickCount: clickedCount, showHistory: false });
    // window.open(powerIframeUrl, "power_iframe");
    window.open(powerIframeUrl, "power_iframe");
  }

  private _getPowerSearch( inOrOut: IInOrOut, what: string, newValue: string ) : IPowerSearch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSearch: any = JSON.parse(JSON.stringify( this.state.search ));
    newSearch[ what ][ inOrOut ] = newValue;
    return newSearch;
  }
}
