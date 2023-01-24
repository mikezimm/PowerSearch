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
export function WPPartsGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('partsEnable', {
      label: 'Parts database',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('partsDetect', {
      label: 'Autodetect Part Numbers',
      offText: 'No',
      onText: 'Yes',
      disabled: wpProps.partsEnable !== true ? true : false,
  }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Parts list`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
