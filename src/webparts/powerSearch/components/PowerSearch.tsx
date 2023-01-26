import * as React from 'react';
import styles from './PowerSearch.module.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IPowerSearchProps, IPowerSearchState, ISearchPlace, tenant } from './IPowerSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import PowerPanel from './PowerPanel/PowerPanelComponent';
import FadePanel from './FadePanel/component';

import FetchBannerX from '@mikezimm/fps-library-v2/lib/banner/bannerX/FetchBannerX';

import { check4Gulp, IBannerPages, ILoadPerformance, makeid, startPerformOp, updatePerformanceEnd } from '../fpsMinIndex';
import { getWebPartHelpElementGeneral } from '../PropPaneHelp/General';
import { getWebPartHelpElementSources } from '../PropPaneHelp/Sources';
// import { getWebPartHelpElementCustom } from '../PropPaneHelp/Custom';
import { getBannerPages } from './HelpPanel/AllContent';
import { saveViewAnalytics } from '../CoreFPS/Analytics';
import { ISiteThemes } from "@mikezimm/fps-library-v2/lib/common/commandStyles/ISiteThemeChoices";
import { IMainButtonObject } from './MainButtons/Available';
import { defineMainButtons } from './MainButtons/DefineMainButtons';

const SiteThemes: ISiteThemes = { dark: styles.fpsSiteThemeDark, light: styles.fpsSiteThemeLight, primary: styles.fpsSiteThemePrimary };


//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: PowerSearch';

export default class PowerSearch extends React.Component<IPowerSearchProps, IPowerSearchState> {

  private _powerPanelQueryString: string = '';
  private _performance: ILoadPerformance = null;

  private _webPartHelpElement = [
    getWebPartHelpElementGeneral( ),
    getWebPartHelpElementSources( ),
    // getWebPartHelpElementCustom( ),
  ];

  private _contentPages : IBannerPages = getBannerPages( this.props.bannerProps );

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


  public constructor(props:IPowerSearchProps){
    super(props);

    if ( this._performance === null ) { this._performance = this.props.performance;  }
    const mainButtons: IMainButtonObject[] = defineMainButtons( this.props );

    this.state = {
      pinState: this.props.bannerProps.fpsPinMenu.defPinState ? this.props.bannerProps.fpsPinMenu.defPinState : 'normal',
      showDevHeader: false,
      lastStateChange: 'Main-Constructor',
      analyticsWasExecuted: false,
      refreshId: makeid(10),
      debugMode: false,
      showSpinner: false,
      showPanel: false,
      mainSelectedButton: mainButtons[0].click,
      mainSelectedButtonIndex: 0,
      autoDetectButtonIndex: 0,

      textSearch: '',

      mainButtons: mainButtons,
      canAutoDetect: true,

    };
  }

  public componentDidMount(): void {
    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidMount` );

    //Start tracking performance
    this._performance.ops.fetch1 = startPerformOp( 'fetch1 TitleText', this.props.bannerProps.displayMode );
    //Do async code here

    //End tracking performance
    this._performance.ops.fetch1 = updatePerformanceEnd( this._performance.ops.fetch1, true, 777 );

    const analyticsWasExecuted = saveViewAnalytics( 'Power Search View', 'didMount' , this.props, this.state.analyticsWasExecuted, this._performance );

    // const buttons: IMainButtonObject[] = defineMainButtons( this.props );
    if ( this.state.analyticsWasExecuted !==  analyticsWasExecuted ) {
      this.setState({ 
        analyticsWasExecuted: analyticsWasExecuted,
        lastStateChange: 'Main-Mount',
        // mainButtons: buttons,
      });
    }

  }

  public shouldComponentUpdate( nextProps: IPowerSearchProps, nextState: IPowerSearchState ): boolean {
    if ( nextState.lastStateChange === 'Panel-Enter' ) {
      return false;
    } else {
      return true;
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

  public componentDidUpdate( prevProps: IPowerSearchProps ): void {

    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidUpdate` );

    const refresh = this.props.bannerProps.displayMode !== prevProps.bannerProps.displayMode ? true : false;

    //refresh these privates when the prop changes warrent it
    if ( refresh === true ) {
      this._contentPages = getBannerPages( this.props.bannerProps );
    }

    if ( this.props.bannerProps.refreshId !== prevProps.bannerProps.refreshId ) {
      const mainButtons = defineMainButtons( this.props );
      this.setState({
        mainButtons: mainButtons,
        mainSelectedButton: mainButtons[0].click,
        mainSelectedButtonIndex: 0,
        autoDetectButtonIndex: 0,
        lastStateChange: 'Main-DidUpdate',
       });
    }
    if ( check4Gulp() === true )  console.log('React componentDidUpdate - this._performance:', JSON.parse(JSON.stringify(this._performance)) );

  }



  public render(): React.ReactElement<IPowerSearchProps> {
    const {
      hasTeamsContext,
      userDisplayName,
      highlightDetect,
      powerEnable,
    } = this.props;

    const { mainButtons, mainSelectedButtonIndex, autoDetectButtonIndex, textSearch } = this.state;

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

    const content = <PowerPanel
      _updateParentTextSearch={ this._updateTextSearch.bind(this) }
      _enter={ this._enter.bind(this) }
      _hideBack={ this._hideBack.bind(this) }
      refreshId={ this.state.refreshId }
    />;

    const BackDrop : JSX.Element = <FadePanel 
      content={ content }
      show={ this.state.showPanel }
      refreshId={ this.state.refreshId }
    />

    const MainButtons: JSX.Element[] = mainButtons.map(( button : IMainButtonObject, index: number ) => {
      let selectClass = styles.bNormal;
      if ( index === mainSelectedButtonIndex ) { selectClass = styles.bSelected }
      else if ( highlightDetect === true && textSearch && index === autoDetectButtonIndex ) { selectClass = styles.bDetected }
      return <button className={ selectClass } key = {button.label} title={button.title} onClick={ () => { this._mainButtonClick( index ) }} >{button.label}</button>;
    });

    const powerIconClass = powerEnable === true && mainButtons[ mainSelectedButtonIndex ].power === true ? styles.powerShow : styles.powerHide;
    const SearchButtons : JSX.Element = <div>
      <div className={ styles.searchGrid }>
        <div className={ styles.heading }>
          <div className={ styles.headingText }>Welcome to Search - Re-thought, {escape(userDisplayName)}!</div>
          <div className={ powerIconClass } style={{ width: '100px', height: ''}} onClick={ () => { this._showBack() }}>{ <Icon iconName='Search'/> }</div>
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
          { MainButtons }
        </div>

        <iframe src="" width="100%" height="999px" name="search_iframe"/>

      </div>

    </div>;

    return (
      <section className={`${styles.powerSearch} ${hasTeamsContext ? styles.teams : ''}`}>
        { Banner }
        { BackDrop }
        { SearchButtons }
      </section>
    );
  }

  private _showBack() : void {
    this.setState({ 
      showPanel: true, refreshId: makeid(10),
      lastStateChange: 'Panel-Open',
     });
  }

  private _hideBack() : void {
    // this.setState({ showPanel: false, refreshId: makeid(10),  });
    this.setState({ showPanel: false, textSearch: this._powerPanelQueryString, lastStateChange: 'Panel-Close', });
  }

  private _mainButtonClick( index: number ): void {

    const { textSearch } = this.state;
    const ClickedButton: IMainButtonObject = this.state.mainButtons[ index ];
    const openUrl = ClickedButton.iframeUrl.replace(`{{textSearch}}`, textSearch );

    window.open( openUrl, ClickedButton.target );

    this.setState({
      mainSelectedButton: ClickedButton.click,
      mainSelectedButtonIndex: index,
      canAutoDetect: false, // Once you actually click a button, then turn off auto-detect
      lastStateChange: 'Main-Button',
    });

  }


  /**
   * 
   * @param event 
   * @param newValue 
   */
  private _search( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    const { textSearch, } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( event === textSearch as any && newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      // this._detectRegex( this.state.textSearch, '_search ~ 1', true );
      this._updateSelectedButton( true );
    } else {
      this._updateTextSearchWithAutoDetect( newValue );
    }
  }

  /**
   * _updateTextSearchWithAutoDetect updates the main search text box text, and autoDetect button info if needed.
   * @param newValue 
   */
  private _updateTextSearchWithAutoDetect( newValue: string ): void {
    const { mainButtons, } = this.state;
    const newIndex: number = this._detectRegex( newValue, '_search ~ 2', false );
    const mainSelectedButton: IMainButtonObject = mainButtons[ newIndex ];
    this.setState({ 
      textSearch: newValue,
      mainSelectedButton: mainSelectedButton.click,
      autoDetectButtonIndex: newIndex,
      lastStateChange: 'Main-Text',
    });
  }

  /**
   * _updateTextSearch updates the main search text box text, called from PowerPanel component.
   * Added for https://github.com/mikezimm/PowerSearch/issues/27
   * @param newValue 
   */
  private _updateTextSearch( newValue: string ): void {
    console.log(`main: _updateTextSearch`, newValue );
    this.setState({
      textSearch: newValue,
      lastStateChange: 'Panel-Enter',
    })
  }

  /**
   * _updateSelectedButton should be called when the user presses 'enter' in the text box.
   * @param open - option to also open the window/update the iframe
   */
  private _updateSelectedButton( open: boolean) : void {
    const { textSearch, autoDetectButtonIndex, canAutoDetect, mainButtons, mainSelectedButtonIndex } = this.state;
    const buttonIdx: number = canAutoDetect === true ? autoDetectButtonIndex : mainSelectedButtonIndex;
    const ClickedButton: IMainButtonObject = mainButtons [ buttonIdx ];
    const openUrl = ClickedButton.iframeUrl.replace(`{{textSearch}}`, textSearch );
    if ( open === true ) window.open( openUrl, ClickedButton.target );
    this.setState({ 
      mainSelectedButton: ClickedButton.click,
      mainSelectedButtonIndex: buttonIdx,
      lastStateChange: 'Main-Enter',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _enter(event: any, newValue?: string ): void {
    console.log( '_enter:', event , newValue );
    // this._detectRegex( this.state.textSearch, '_enter', false );
  }
  
  private _detectRegex( currentTextSearch: string, caller: string, open: boolean ): number {
    const currentIndex: number = this.state.mainSelectedButtonIndex;
    // const currentMain: ISearchPlace = this.state.mainSelectedButton;
    const mainButtons: IMainButtonObject[] = this.state.mainButtons;
    // const SelectedButton: IMainButtonObject = mainButtons[ currentIndex ];
    let newIndex: number = currentIndex + 0;
    let found = false;
    if ( this.state.canAutoDetect === true ) {
      mainButtons.map( (button: IMainButtonObject, index: number ) => {
        if ( found === false ) { // Only continue if a match has not been found yet
          if ( button.detect === true && button.regExp && button.regExp.length > 0 ) {
            button.regExp.map( ( thisRegex: RegExp ) => {
              if ( thisRegex.test( currentTextSearch ) === true ) { 
                newIndex = index;
                found = true;
                console.log( `_detectRegex MATCH:`, currentTextSearch, thisRegex.source, true, newIndex );
              } else {
                // console.log( `_detectRegex NO Match`, currentTextSearch, thisRegex.source, false, newIndex );
              }
            });
          }
        }
      });
    }
    // console.log( `_detectRegex text, current, new:`, caller, open, currentTextSearch, currentIndex, newIndex, mainButtons[ newIndex ].click );
    if ( open === true ) {
      const ClickedButton: IMainButtonObject = this.state.mainButtons [ this.state.mainSelectedButtonIndex ];
      const openUrl = ClickedButton.iframeUrl.replace(`{{textSearch}}`, currentTextSearch );
      window.open( openUrl, ClickedButton.target );
    }

    return newIndex;
  }
}
