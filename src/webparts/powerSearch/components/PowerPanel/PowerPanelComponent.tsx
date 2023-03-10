import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import styles from './PowerPanel.module.scss';
import { ClearHints, IInAndOut, IInOrOut, IPowerPanelProps, IPowerPanelState, IPowerSearch, IPowerSearchKeys } from './IPowerPanelProps';
import { check4Gulp } from '../../fpsMinIndex';
import { getDocsHeadings, getRandomTipElement, KQLDocLinkInt, KQLDocsHeadings } from './SearchTips/tips';
import { getTypesTable } from './SearchTips/filetype';

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: PowerPanelComponent';
const tenant: string = window.location.hostname.toLowerCase().replace(`.sharepoint.com`, '' );
// const code: string = `vla`.split("").reverse().join("");
const LockTitleText: string = 'Unfortunately, you cant modify both these boxes and the query.  Press the Unlock icon below to use these boxes again :)';

export default class PowerPanel extends React.Component<IPowerPanelProps, IPowerPanelState> {

    
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


public constructor(props:IPowerPanelProps){
  super(props);

  const search: IPowerSearch = {
    textSearch: '',
    blockInOut: false,

    keywords: { In: '', Out: '' },
    author: { In: '', Out: '' },
    editor: { In: '', Out: '' },
    filetype: { In: '', Out: '' },
    filename: { In: '', Out: '' },
    title: { In: '', Out: '' },
    time: '',

    cust1: { In: '', Out: '' },
    cust2: { In: '', Out: '' },
    cust3: { In: '', Out: '' },
    cust4: { In: '', Out: '' },
    date1: '',
  };
  this.state = {

    lastStateChange: 'Panel-Mount',
    showHistory: false,
    textHistory: [],
    searchHistory: [],
    iframeSrc: '',
    showBack: 0,

    search: search,
    rowsBackup: search,
    rowsBackupAsStr: JSON.stringify( search ),
    lastRowsSearchString: '',
    hints: ClearHints,
    powerIframeUrl: '',
    powerIndex: -1,
    reclickCount: 0,
  };
}

  public componentDidMount(): void {
    console.log('')
    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidUpdate` );
  }


  public shouldComponentUpdate( nextProps: IPowerPanelProps, nextState: IPowerPanelState ): boolean {
    if ( nextState.lastStateChange === 'Panel-Enter' ) {
      return false;
    } else return true
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

  public componentDidUpdate( prevProps: IPowerPanelProps ): void {
    // let refresh = false;
    if ( this.props.refreshId !== prevProps.refreshId ) {
      this.setState({ 
        iframeSrc: '',
        lastStateChange: 'Panel-ParentRefreshId',
       });
    }
  }

  public render(): React.ReactElement<IPowerPanelProps> {
    // const { } = this.props;
    const { blockInOut } = this.state.search;

    const PowerPanel = <div className={ styles.powerPanel }>
      <div onClick={ () => this.props._hideBack() } style={{ fontSize: '48px'}}>Welcome to PowerSearch</div>
      <div className={ styles.links} onClick={ () => window.open(`https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference`,`_blank` ) } style={{ fontSize: '48px'}}>Learn about KQL</div>
      { getRandomTipElement( '*' ) }
      { this.powerSearchRow( `keywords` ) }
      { this.powerSearchRow( `author` ) }
      {/* { this.powerSearchRow( `editor` ) } */}
      { this.powerSearchRow( `filetype` ) }
      { this.powerSearchRow( `filename` ) }
      <div style={{ fontSize: '14px', }}>
        <div style={{ fontSize: 'large' }} onClick={ () => this._setPowerIframe( KQLDocsHeadings[0].heading, 0 ) }>Tweak your query below and then press enter...</div>
        <div className={`${ styles.transAll } ${ blockInOut === true ? styles.showTips : styles.hideTips }`} 
          style={{ marginTop: '20px', color: 'yellow' }} 
          title= { LockTitleText } onClick={ () => this._resetPowerSearchText( ) }>
            Power Search boxes are now locked.  Click here to unlock them. <Icon iconName={ 'Unlock' } />
        </div>
      </div>

      <div className={ styles.currentQuery }>
        <Icon className={ styles.historyIcon } iconName={ this.state.textHistory.length > 0 ? "History" : '' } onClick={ () => this.setState({ 
            showHistory: !this.state.showHistory, hints: { ...this.state.hints, ...{ docs: false }},
            powerIndex: -1,
            powerIframeUrl: '',
          }) }/>
        <SearchBox
          value={ this.state.search.textSearch }
          styles={{ root: { height: '2.5em', fontSize: '16px', backgroundColor: `rgb(178 178 178)` } }}
          placeholder="Type in boxes above"
          onSearch={ this._updatePowerPanelSearchBox.bind(this) }
          onFocus={ null }
          // onBlur={ () => console.log('onBlur called') }
          onChange={ this._updatePowerPanelSearchBox.bind(this) }
          onKeyDown={(ev)=> { this.props._enter(ev.key)}}
        />
      </div>

      <div style={{ fontSize: '18px', marginTop: '30px', marginBottom: '20px', fontWeight: 500 }} onClick={ () => this.props._hideBack() }>Click here to return to page.</div>
      <div className={ this.state.showHistory === true ? styles.showTips : styles.hideTips }>
        <div style={{ fontSize: 'larger' }}>Query history - Click arrow to reload, Double Click to also execute search</div>
        { this.state.textHistory.map( ( textHistory, index ) => {
          return <div className={ styles.queryHistoryRow } key={ textHistory } ><Icon iconName={ "Upload" } 
            onClick={ () => this._loadHistory( index ) } 
            onDoubleClick={ () => this._executeHistory( index ) } />{ textHistory }</div>;
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

    </div>
    ;

    return ( PowerPanel );
  }


/**
 * This runs when the History item up arrow is pressed, it will reload a history stnapshot
 * @param index 
 */
  private _loadHistory( index: number ): void {

    const search: IPowerSearch = JSON.parse( this.state.searchHistory[index] );
    this.setState({ 
      search: search,
      lastStateChange: 'Panel-LoadHistory',
     });
  }
  /**
   * This runs when the History item up arrow is DOUBLE-CLICKED, it will reload a history stnapshot and execute search
   * @param index 
   */
  private _executeHistory( index: number ): void {

    const search: IPowerSearch = JSON.parse( this.state.searchHistory[index] );
    window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${search.textSearch}`, "search_iframe");
    this.props._updateParentTextSearch( `${search.textSearch}` );
    this.setState({ 
      search: search,
      lastStateChange: 'Panel-LoadHistory',
    });
  }

  /**
   * CALLED when PowerPanelSearchBox is updated by hand, not from when the Search Rows are updated
   * Basic intent of this function
   * 
   * If any manual update is made to this text box, the following should happen
   *  Block the PowerRows from being updated
   *  Update state.search - but NOT the history unless 'Enter' is pressed
   * 
   * @param event 
   * @param newValue 
   */
  private _updatePowerPanelSearchBox ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    const { textSearch, } = this.state.search;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( event === textSearch as any && newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      // this._detectRegex( this.state.textSearch, '_search ~ 1', true );
      this._onSearchPressedEnter( false );
    } else {
      const search: IPowerSearch = JSON.parse(JSON.stringify( this.state.search ));
      search.textSearch = newValue;
      //If current string matches last string created from just rows, then unblock
      search.blockInOut = newValue === this.state.lastRowsSearchString ? false : true;
      this.setState( { 
        search: search,
        lastStateChange: 'Panel-Text',
       } ); //textSearch: textSearch 
    }
  }


  /**
   * This will remove manual updates from the main search box and reset based on the PowerRows.
   * It will also unblock the PowerSearch Rows so they can be used again
   */
  private _resetPowerSearchText() : void {
    // rowsBackup: saveRows === true ? rowsBackup : this.state.rowsBackup,
    // rowsBackupAsStr: saveRows === true ? searchStringified :this.state.rowsBackupAsStr,
    const search: IPowerSearch = JSON.parse(this.state.rowsBackupAsStr );
    search.blockInOut = false;
    this.setState( { search: search, lastStateChange: 'Panel-Reset',} ); //textSearch: textSearch 

  }
  /**
   * _onRowSearch is called from the individual search boxes in the rows... NOT the main search box.
   * This should do the following;
   * If Enter is pressed, rebuild and update the main PowerSearch text, push that back to main component and update the iframe.
   * this onClick:  onChange={ this._search.bind(this, '+', 'words' ) }
   * matches this:  _search( inOrOut: string, what: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
   * @param inOrOut 
   * @param what 
   * @param event 
   * @param newValue 
   */

  private _onRowSearch( inOrOut: IInOrOut, what: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {
    console.log( '_search:', event , newValue, inOrOut, what );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      this._onSearchPressedEnter( true );

    } else {
      this._onRowSearch_UpdateText( inOrOut, what, newValue );
    }
  }

  /**
   * Basic intent of _onRowSearch_PressedEnter
   *  1. Row Search was updated and Enter was pressed
   *  2. Push full textSearch value up to parent so it is displayed in main page
   *  3.  Make the following state Updates
   *    a. textHistory        - which is array of strings with the actual text query
   *    b. searchHistory      - which is an array of all textHistory strings
   *    c. rowsBackup       - which is array of search objects saved which are recovered when clicking on a history item.
   *    d. rowsBackupAsStr  - which is just the stringified version of current history for easy use to 'reset' when reset custom search is pressed
   *  4. updates the search_iframe with the new search query
   */
  private _onSearchPressedEnter( saveRows: boolean ): void {
    window.open(`https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q=${this.state.search.textSearch}`, "search_iframe");
    const searchHistory: string[] = this.state.searchHistory;
    const searchStringified: string = JSON.stringify( this.state.search );
    searchHistory.push( searchStringified );
    const textHistory: string[] = this.state.textHistory;
    textHistory.push( this.state.search.textSearch );

    //Added callback to update search box in main component
    //https://github.com/mikezimm/PowerSearch/issues/27
    this.props._updateParentTextSearch( `${this.state.search.textSearch}` );
    const rowsBackup: IPowerSearch = JSON.parse( searchStringified );
    this.setState({ 
      textHistory: textHistory, 
      searchHistory: searchHistory, 
      rowsBackup: saveRows === true ? rowsBackup : this.state.rowsBackup,
      rowsBackupAsStr: saveRows === true ? searchStringified :this.state.rowsBackupAsStr,
      lastStateChange: 'Panel-Text',
    });
  }

  private _onRowSearch_UpdateText( inOrOut: IInOrOut, what: string, newValue: string ): void {
      const search: IPowerSearch = this._getPowerSearch( inOrOut, what, newValue );
      search.textSearch = this.powerSearchString( search );
      this.setState( { search: search, lastRowsSearchString: search.textSearch, rowsBackupAsStr: JSON.stringify( search ) } ); //textSearch: textSearch 
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

    const { keywords, author, filetype, filename } = search;

    const keyIn = this.buildSubStrings( keywords.In, 'In', 'keywords' );
    const keyOut = this.buildSubStrings( keywords.Out, 'Out', 'keywords' );

    const authorIn = this.buildSubStrings( author.In, 'In', 'author' );
    const authorOut = this.buildSubStrings( author.Out, 'Out', 'author' );

    const filetypeIn = this.buildSubStrings( filetype.In, 'In', 'filetype' );
    const filetypeOut = this.buildSubStrings( filetype.Out, 'Out', 'filetype' );

    const filenameIn = this.buildSubStrings( filename.In, 'In', 'filename' );
    const filenameOut = this.buildSubStrings( filename.Out, 'Out', 'filename' );

    const allChecks: string[] = [ ...keyIn, ...keyOut, ...authorIn, ...authorOut, ...filetypeIn, ...filetypeOut, ...filenameIn, ...filenameOut ];

    return allChecks.join(' AND ');

  }

  private buildSubStrings( str: string, inOrOut: IInOrOut, what: IPowerSearchKeys ): string[] {
    if ( !str ) { return []; }
    //filetypes will NEVER have whitespaces so split on ; space etc...
    const semiRegex: RegExp = what === 'filetype' ? /[;\s]+/g : /\s?;\s?/g;
    const parts: string[] = str.split(semiRegex);
    const newParts: string[] = [];

    parts.map( ( part: string ) => {
      const partTrimmed: string = part.trim();
      // Only push if the string has a value....
      if ( partTrimmed.length > 0 ) newParts.push( partTrimmed.indexOf( ' ' ) > -1 ? `"${ partTrimmed }"` : partTrimmed ); 
    });

    const theWhat: string = what && what !== 'keywords' ? `${ what }:` : '';
    const delim: string = inOrOut === 'In' ? `${ theWhat }` : `-${ theWhat }`;
    const result = newParts.length > 0 ? `${ delim }${ newParts.join(`~~~${ delim }`) }`.split('~~~') : [];
    console.log('buildSubString', newParts, result );
    return result;
  }

  private powerSearchRow( row: IPowerSearchKeys ) : JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stateAny : any = this.state;
    const { blockInOut } = this.state.search;
    const LockTitle = blockInOut === true ? LockTitleText : '';
    const LockIcon: JSX.Element = <Icon className= { `${ styles.transAll } ${ blockInOut === true ? styles.showTips : styles.hideTips }` } title={ LockTitle } iconName={ blockInOut === true ? 'Lock' : '' } />;
    const eleRow = 
    <div className={ styles.powerSearch }>
      <div className={ styles.searchRowLabel }>{`${row} ->`} { LockIcon }</div>
      <SearchBox
        value={ stateAny[ `searchIn${row}` ] }
        styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '16px' } }}
        placeholder="Include in Search"
        onSearch={ this._onRowSearch.bind(this, 'In', row ) }
        onFocus={ this._focusP.bind(this, 'In', row ) }
        // onBlur={ this._blurP.bind(this, 'In', row ) }
        onChange={ this._onRowSearch.bind(this, 'In', row ) }
        onKeyDown={(ev)=> { this._enterP( ev.key )}}
        disableAnimation={ true }
        disabled= { this.state.search.blockInOut }
      />
      <SearchBox
        value={ stateAny[ `searchOut${row}` ] }
        styles={{ root: { maxWidth: '100%', height: '2.5em', fontSize: '16px' } }}
        placeholder="Exclude in Search"
        onSearch={ this._onRowSearch.bind(this, 'Out', row ) }
        onFocus={ this._focusP.bind(this, 'Out', row ) }
        // onBlur={ this._blurP.bind(this, 'Out', row ) }
        onChange={ this._onRowSearch.bind(this, 'Out', row ) }
        onKeyDown={(ev)=> { this._enterP(ev.key)}}
        disabled= { this.state.search.blockInOut }
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

    window.open(`${powerIframeUrl}`, "power_iframe");
  }

  private _getPowerSearch( inOrOut: IInOrOut, what: string, newValue: string ) : IPowerSearch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSearch: any = JSON.parse(JSON.stringify( this.state.search ));
    newSearch[ what ][ inOrOut ] = newValue;
    return newSearch;
  }
}
