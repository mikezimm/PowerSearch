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
export function WPOnPremGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];
  const isDisabled: boolean = wpProps.onPremEnable !== true ? true : false;

  groupFields.push(
    PropertyPaneToggle('onPremEnable', {
      label: 'Enable SharePoint Online search',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('onPremAdvanced', {
      label: 'Advanced Search Wizard',
      offText: 'No',
      onText: 'Yes',
      disabled: isDisabled,
  }));

  groupFields.push(
    PropertyPaneToggle('onPremLink', {
      label: 'Show Link to this source',
      offText: 'No',
      onText: 'Yes',
      disabled: isDisabled,
  }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `SharePoint On Premise`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
