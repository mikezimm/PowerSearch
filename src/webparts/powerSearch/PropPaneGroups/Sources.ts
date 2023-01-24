import {
  IPropertyPaneGroup,

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
export function WPSourcesGroup(  wpProps: IPowerSearchWebPartProps, thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('spoEnable', {
      label: 'SharePoint Online search',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('onPremEnable', {
      label: 'SharePoint Legacy (Old SharePoint)',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('partsEnable', {
      label: 'Part Numbers',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('projectsEnable', {
      label: 'Projects',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('standardsEnable', {
      label: 'Standards',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('alcEnable', {
      label: 'ALC',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('testsEnable', {
      label: 'Tests Dashboard',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('changesEnable', {
      label: 'Changes Dashboard',
      offText: 'No',
      onText: 'Yes',
  }));

  groupFields.push(
    PropertyPaneToggle('source1Enable', {
      label: 'Custom source 1',
      offText: 'No',
      onText: 'Yes',
  }));
  
  groupFields.push(
    PropertyPaneToggle('source2Enable', {
      label: 'Custom source 2',
      offText: 'No',
      onText: 'Yes',
      disabled: wpProps.source1Enable === false ? true : false,
  }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Search sources`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
