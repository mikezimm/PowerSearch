
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
  showSourceLinks: boolean;  // Show all available source links
  autoPressAll: boolean;  // Auto-press all detected sources on redirect

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

export interface IBaseSPWPProps {
  enable: boolean;
  powerEnable: boolean;
  link: boolean; // Show Link to full page in some way
}

export interface ISPOWPProps extends IBaseSPWPProps {
}

export interface IOnPremWPProps extends IBaseSPWPProps {
}

export interface IAlcWPProps {
  // alcEnable: boolean;
  enable: boolean;
}

export interface IPrimarySourceWPProps {
  enable: boolean;
  detect: boolean;
  press: boolean; // Auto press on redirect load
  link: boolean; // Show Link to full page in some way
  target: string; // Open Target on button press - iFrame || '_blank' ?
}

export interface IPartsWPProps extends IPrimarySourceWPProps {
}

export interface IProjectsWPProps extends IPrimarySourceWPProps {
}

export interface IStandardsWPProps extends IPrimarySourceWPProps {
}


export interface ITestsWPProps extends IPrimarySourceWPProps {
}

export interface IChangesWPProps extends IPrimarySourceWPProps {
}

export interface ISourceXWPProps {
  enable: boolean;
  label: string;  // Button label
  url: string;     // Source Url for iframe
  powerEnable: boolean; // Enable Advanced wizard
  powerRows: string; // Possibly to define what PowerSearch rows would be visible
  KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

  detect: string;  // Possibly regex string for auto-detect
  regExp: string[]; // Array of RegExp for detection... is this the same as detect?

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
