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
export function WProjectsGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];
  const isDisabled: boolean = wpProps.projectsEnable !== true ? true : false;

  groupFields.push(
    PropertyPaneToggle('projectsEnable', {
      label: 'Projects database',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('projectsDetect', {
      label: 'Autodetect Project numbers',
      offText: 'No',
      onText: 'Yes',
      disabled: isDisabled,
  }));

  groupFields.push(
    PropertyPaneToggle(`projectsPress`, {
      label: `Auto press this source on redirect load`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled === true || wpProps.projectsDetect !== true ? true : false,
    }));

  groupFields.push(
    PropertyPaneToggle(`projectsLink`, {
      label: `Show Link to this source`,
      onText: "Yes",
      offText: "No",
      disabled: isDisabled,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Projects list`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
