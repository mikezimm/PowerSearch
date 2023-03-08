import {
  IPropertyPaneGroup,
  PropertyPaneTextField, 

  // PropertyPaneDropdown, IPropertyPaneDropdownProps,
  // IPropertyPaneDropdownOption,
  PropertyPaneToggle,
  IPropertyPaneField,

} from '@microsoft/sp-property-pane';

import { IThisFPSWebPartClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass';
import { IPowerSearchWebPartProps } from '../IPowerSearchWebPartProps';
// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

// export function FPSEasyPagesGroup( wpProps: IEasyPagesIconsWPProps, pageContext: PageContextCopy_15_2 ) : IPropertyPaneGroup {
export function WPSourceXGroup(  wpProps: IPowerSearchWebPartProps, numb: number, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wpPropsAny: any = wpProps;
  const isDisabled: boolean = wpPropsAny[`source${numb}Enable`] !== true ? true : false;

  groupFields.push(
    PropertyPaneToggle(`source${numb}Enable`, {
      label: `Enable Source ${numb}`,
      onText: "Yes",
      offText: "No",
      disabled: numb === 1 || ( numb === 2 && wpPropsAny[`source${1}Enable`] === true ) ? false : true ,
    }));

    // label: this.properties.source2Label,
    // // detect: this.properties.source1RegExp ? true : false,
    // regExp: [],
    // press: this.properties.source2Press,
    // powerEnable: this.properties.source2Power,

  groupFields.push(
    PropertyPaneTextField(`source${numb}Label`, {
      label: `Button Label`,
      placeholder: `Add label here`,
      description: 'Button Text',
      disabled: isDisabled ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}Url`, {
      label: `Iframe Url`,
      placeholder: `Paste Url here`,
      description: 'Link to Url for Iframe',
      disabled: isDisabled ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}Detect`, {
      label: `Auto-Detect Regex`,
      placeholder: `Paste Regex here`,
      description: 'Only for SharePoint Team :)',
      disabled: isDisabled ,
    }));

  groupFields.push(
    PropertyPaneToggle(`source${numb}Press`, {
      label: `Auto press this source ${numb} on redirect load`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled !== true && wpPropsAny[`source${numb}Detect`] ? false : true ,
    }));

  groupFields.push(
    PropertyPaneToggle(`source${numb}Link`, {
      label: `Show Link to this source ${numb}`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled ,
    }));

    groupFields.push(
    PropertyPaneToggle(`source${numb}Power`, {
      label: "Enable PowerSearch pane",
      onText: "true",
      offText: "false",
      disabled: isDisabled ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}PowerRows`, {
      label: `Power Rows to include`,
      placeholder: `Paste Regex here`,
      description: 'Only for SharePoint Team :)',
      disabled:  isDisabled !== true && wpPropsAny[`source${numb}Power`] === true ? false : true ,
    }));

  groupFields.push(
    PropertyPaneToggle(`source${numb}KQLDocs`, {
      label: "Include KQL Docs wizard",
      onText: "true",
      offText: "false",
      disabled: isDisabled !== true && wpPropsAny[`source${numb}Power`] === true ? false : true ,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Custom Source ${numb}`,
    isCollapsed: true,
    groupFields: groupFields,
  };


  return ExportThisGroup;

}
