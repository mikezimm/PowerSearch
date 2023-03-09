import * as React from 'react';
import {  } from 'office-ui-fabric-react/lib/Icon';
// import ReactJson from "react-json-view";
import {  PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// export function putObjectIntoJSON ( obj: any, name: string = null ): JSX.Element {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }

const sourceLabelCSS: React.CSSProperties = { width: '115px', display: 'inline-block' }

export function getWebPartHelpElementSources (  ): JSX.Element {

  const WebPartHelpElement = <PivotItem headerText={ 'Sources' } > 
    <div className={ 'fps-pph-content' }>

      <div>This feature is currently under development.</div>

      <div className={ 'fps-pph-topic' }>Corporate Search Sources</div>
      <div>You can leverage any combination of these standard search sources.</div>
      <div className={ 'fps-pph-topic' }>Custom Search Sources</div>
      <div>These options let you create a button to search a custom iframe url like a SharePoint list view</div>

      <div className={ 'fps-pph-topic' }>Common public sources allowing iframes...</div>
      <ul>
        <li><span style={ sourceLabelCSS }><b>bing</b></span>{`https://www.bing.com/search?q={{textSearch}}`}</li>
        <li><span style={ sourceLabelCSS }><b>bingimages</b></span>{`https://www.google.com/images/search?q={{textSearch}}`}</li>
        <li><span style={ sourceLabelCSS }><b>bingvideos</b></span>{`https://www.google.com/videos/search?q={{textSearch}}`}</li>
      </ul>
      <div className={ 'fps-pph-topic' }>Common public sources NOT allowing iframes...</div>
      <ul>
        <li><span style={ sourceLabelCSS }><b>google</b></span>{`https://www.google.com/search?q={{textSearch}}`}</li>
        <div style={{ height: '15px'}}/>

        <li><span style={ sourceLabelCSS }><b>bingmaps</b></span>{`https://www.bing.com/maps/search?q={{textSearch}}`}</li>
        <div style={{ height: '15px'}}/>

        <li><span style={ sourceLabelCSS }><b>youtube</b></span>{`https://www.youtube.com/results?search_query={{textSearch}}`}</li>
        <div style={{ height: '15px'}}/>

        <li><span style={ sourceLabelCSS }><b>githubrepos</b></span>{`https://github.com/search?type=repositories&q={{textSearch}}`}</li>
        <li><span style={ sourceLabelCSS }><b>githubissues</b></span>{`https://github.com/search?type=issues&q={{textSearch}}`}</li>
        <li><span style={ sourceLabelCSS }><b>githubcode</b></span>{`https://github.com/search?type=code&q={{textSearch}}`}</li>
      </ul>

    </div>
  </PivotItem>;

  return WebPartHelpElement;

}