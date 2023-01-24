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

  groupFields.push(
    PropertyPaneToggle(`source${numb}Enable`, {
      label: `Enable Source ${numb}`,
      onText: "Yes",
      offText: "No",
      disabled: numb === 1 || ( numb === 2 && wpPropsAny[`source${1}Enable`] === true ) ? false : true ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}Url`, {
      label: `Iframe Url`,
      placeholder: `Paste Url here`,
      description: 'Link to Url for Iframe',
      disabled: wpPropsAny[`source${numb}Enable`] === true ? false : true ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}Detect`, {
      label: `Auto-Detect Regex`,
      placeholder: `Paste Regex here`,
      description: 'Only for SharePoint Team :)',
      disabled: wpPropsAny[`source${numb}Enable`] === true ? false : true ,
    }));

  groupFields.push(
    PropertyPaneToggle(`source${numb}Advanced`, {
      label: "Advanced Search Wizard",
      onText: "true",
      offText: "false",
      disabled: wpPropsAny[`source${numb}Enable`] === true ? false : true ,
    }));

  groupFields.push(
    PropertyPaneTextField(`source${numb}PowerRows`, {
      label: `Power Rows to include`,
      placeholder: `Paste Regex here`,
      description: 'Only for SharePoint Team :)',
      disabled: wpPropsAny[`source${numb}Enable`] === true && wpPropsAny[`source${numb}Advanced`] === true ? false : true ,
    }));

  groupFields.push(
    PropertyPaneToggle(`source${numb}KQLDocs`, {
      label: "Include KQL Docs wizard",
      onText: "true",
      offText: "false",
      disabled: wpPropsAny[`source${numb}Enable`] === true && wpPropsAny[`source${numb}Advanced`] === true ? false : true ,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Custom Source ${numb}`,
    isCollapsed: true,
    groupFields: groupFields,
  };


  return ExportThisGroup;

}
