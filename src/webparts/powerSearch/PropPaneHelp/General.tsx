import * as React from 'react';
import {  } from 'office-ui-fabric-react/lib/Icon';
// import ReactJson from "react-json-view";
import {  PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
import { MainWithDetect, MainWithPower } from '../components/MainButtons/Available';

// export function putObjectIntoJSON ( obj: any, name: string = null ): JSX.Element {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }

// eslint-disable-next-line react/jsx-no-target-blank
export const regexpLink = <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions" target="_blank">Javascript RegExp pattern</a>;

export function getWebPartHelpElementGeneral (  ): JSX.Element {

  const WebPartHelpElement = <PivotItem headerText={ 'General' } > 
    <div className={ 'fps-pph-content' }>

      <div className={ 'fps-pph-topic' }>Power Search Panel</div>
      <div>Show PowerSearch Panel Icon when selecting these sources that leverage the feature.</div>
      <ul>
        { MainWithPower.map ( button => {
          return <li key={ button.label }>{ button.label } </li>;
        })}
      </ul>

      <div className={ 'fps-pph-topic' }>Highlight Detected Sources</div>
      <div>Highlights source button if your search text matches a { regexpLink } for that button</div>
      <ul>
        { MainWithDetect.map ( button => {
          return <li key={ button.label }>{ button.label }
            <ul style={{ paddingBottom: '10px'}}>
              { button.regExp.map( reg => {
                return <li key={ reg.source }>Regex Pattern: { reg.source }</li>;
              })}
            </ul>
          </li>;
        })}
      </ul>

    </div>
  </PivotItem>;

  return WebPartHelpElement;

}