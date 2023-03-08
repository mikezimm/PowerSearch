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
export function WPGeneralGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('powerEnable', {
      label: 'Power Search panel',
      offText: 'Disabled',
      onText: 'Enabled',
  }));

  groupFields.push(
    PropertyPaneToggle('highlightDetect', {
      label: 'Highlight detected Sources',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('showSourceLinks', {
      label: 'Show all available source links - to open in new tab',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('autoPressAll', {
      label: 'Auto-press all detected sources on redirect',
      offText: 'No',
      onText: 'Yes',
  }));


  // showSourceLinks: boolean;  // Show all available source links
  // autoPressAll: boolean;  // Auto-press all detected sources on redirect

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `General`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
