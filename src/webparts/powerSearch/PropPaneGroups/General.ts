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
    PropertyPaneToggle('highlightDetect', {
      label: 'Highlight detected Sources',
      offText: 'No',
      onText: 'Yes',
  }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `SharePoint Online`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
