import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import styles from './PowerPanel.module.scss';
import { ClearHints, IInOrOut, IPowerPanelProps, IPowerPanelState, IPowerSearch, IPowerSearchKeys } from './IPowerPanelProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { check4Gulp } from '../../fpsMinIndex';
import { getDocsHeadings, getRandomTipElement, KQLDocLinkInt, KQLDocsHeadings } from './SearchTips/tips';
import { getTypesTable } from './SearchTips/filetype';

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: PowerPanelComponent';
const tenant: string = window.location.hostname.toLowerCase().replace(`.sharepoint.com`, '' );
const code: string = `vla`.split("").reverse().join("");

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

  this.state = {

    showHistory: false,
    history: [],
    historyBuild: [],
    iframeSrc: '',
    showBack: 0,

    search: {
      textSearch: '',

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
    },
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

    console.log( `PowerPanel - componentDidUpdate` );
  }

  public render(): React.ReactElement<IPowerPanelProps> {
    // const { } = this.props;

    const PowerPanel = <div className={ styles.powerPanel }>
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
          onSearch={ this.props._search }
          onFocus={ null }
          // onBlur={ () => console.log('onBlur called') }
          onChange={ this.props._search }
          onKeyDown={(ev)=> { this.props._enter(ev.key)}}
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

    </div>
    ;

    return ( PowerPanel );
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
