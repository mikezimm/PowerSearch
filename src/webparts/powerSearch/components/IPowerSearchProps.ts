
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { ILoadPerformance } from '../fpsMinIndex';
import { ILastPowerPanelChange } from './PowerPanel/ILastPowerPanelChange';
import { IMainButtonObject } from './MainButtons/Available';

export const tenant: string = window.location.hostname.toLowerCase().replace(`.sharepoint.com`, '' );
export const code: string = `vla`.split("").reverse().join("");

export type ISearchPlace = 'spo' | 'onPrem' | 'parts' | 'projects' | 'standards' | 'alc' | 'tests' | 'changes' | 'source1' | 'source2';

export interface IPowerSearchProps extends IFPSCoreReactComponentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

  highlightDetect: boolean;
  powerEnable: boolean;

  mainButtons: {
    spo: ISPOWPProps;
    onPrem: IOnPremWPProps;
    parts: IPartsWPProps;
    projects: IProjectsWPProps;
    standards: IStandardsWPProps;
    alc: IAlcWPProps;
    tests: ITestsWPProps;
    changes: IChangesWPProps;
    source1: ISourceXWPProps;
    source2: ISourceXWPProps;
  }
}

export interface ISPOWPProps {
  // spoEnable: boolean;
  // spoAdvanced: boolean;
  enable: boolean;
  powerEnable: boolean;
}

export interface IOnPremWPProps {
  // onPremEnable: boolean;
  // onPremAdvanced: boolean;
  enable: boolean;
  powerEnable: boolean;
}

export interface IPartsWPProps {
  // partsEnable: boolean;
  // partsDetect: boolean;
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way
}

export interface IProjectsWPProps {
  // projectsEnable: boolean;
  // projectsDetect: boolean;
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way
}

export interface IStandardsWPProps {
  // standardsEnable: boolean;
  // standardsDetect: boolean;
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way
}

export interface IAlcWPProps {
  // alcEnable: boolean;
  enable: boolean;
}

export interface ITestsWPProps {
  // testsEnable: boolean;
  // testsDetect: boolean;
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way
}

export interface IChangesWPProps {
  // changesEnable: boolean;
  // changesDetect: boolean;
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way
}

export interface ISourceXWPProps {
  enable: boolean;
  label: string;  // Button label
  url: string;     // Source Url for iframe
  powerEnable: boolean; // Enable Advanced wizard
  powerRows: string; // Possibly to define what PowerSearch rows would be visible
  KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

  detect: string;  // Possibly regex string for auto-detect
  regExp:[]; // Array of RegExp for detection... is this the same as detect?

  press: boolean; // Auto press on redirect load

  target: string; // Open Target on button press - iFrame || '_blank' ?
  link: boolean; // Show Link to full page in some way

}

export type ILastPowerSearchChange = ILastPowerPanelChange | & 'Main-Constructor' | 'Main-Mount' | 'Main-Mount-PreQuery' | 'Main-DidUpdate' | 'Main-Text' | 'Main-Button' | 'Main-Panel' | 'Main-Enter' ;

export interface IPowerSearchState extends IFPSCorePinMeReactComponentState {

  analyticsWasExecuted: boolean;
  mainSelectedButton: ISearchPlace;
  mainSelectedButtonIndex: number; // Index of Main Button last clicked
  autoDetectButtonIndex: number;
  queryParamDetectIndex: number;
  textSearch: string;
  showPanel: boolean;

  mainButtons: IMainButtonObject[];
  canAutoDetect: boolean;
  lastStateChange: ILastPowerSearchChange;  // Added to use in shouldComponentUpdate
}
