import {
  IPropertyPaneGroup,
  // PropertyPaneTextField, 

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
export function WPStandardsGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];
  const isDisabled: boolean = wpProps.standardsEnable !== true ? true : false;

  groupFields.push(
    PropertyPaneToggle('standardsEnable', {
      label: 'Standards database',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('standardsDetect', {
      label: 'Autodetect Standards',
      offText: 'No',
      onText: 'Yes',
      disabled: isDisabled,
  }));

  groupFields.push(
    PropertyPaneToggle(`standardsPress`, {
      label: `Auto press this source on redirect load`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled === true || wpProps.standardsDetect !== true ? true : false,
    }));
    
  groupFields.push(
    PropertyPaneToggle(`standardsLink`, {
      label: `Show Link to this source`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Standards list`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
