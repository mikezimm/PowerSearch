import * as React from 'react';
import {  } from 'office-ui-fabric-react/lib/Icon';
// import ReactJson from "react-json-view";
import {  PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// export function putObjectIntoJSON ( obj: any, name: string = null ): JSX.Element {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }

export function getWebPartHelpElementCustom (  ): JSX.Element {

  const WebPartHelpElement = <PivotItem headerText={ 'Custom' } > 
    <div className={ 'fps-pph-content' }>

 
      <div className={ 'fps-pph-topic' }>Custom Search Sources</div>
      <div>These options let you create a button to search a custom iframe url like a SharePoint list view</div>
      
      {/* <div className={ 'fps-pph-topic' }>Highlight Detected Sources</div>
      <div></div> */}


      </div>
    </PivotItem>;

  return WebPartHelpElement;

}