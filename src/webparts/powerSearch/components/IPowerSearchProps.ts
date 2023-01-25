
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';

import { ILoadPerformance } from '../fpsMinIndex';
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
  advanced: boolean;
}

export interface IOnPremWPProps {
  // onPremEnable: boolean;
  // onPremAdvanced: boolean;
  enable: boolean;
  advanced: boolean;
}

export interface IPartsWPProps {
  // partsEnable: boolean;
  // partsDetect: boolean;
  enable: boolean;
  detect: boolean;
}

export interface IProjectsWPProps {
  // projectsEnable: boolean;
  // projectsDetect: boolean;
  enable: boolean;
  detect: boolean;
}

export interface IStandardsWPProps {
  // standardsEnable: boolean;
  // standardsDetect: boolean;
  enable: boolean;
  detect: boolean;
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
}

export interface IChangesWPProps {
  // changesEnable: boolean;
  // changesDetect: boolean;
  enable: boolean;
  detect: boolean;
}

export interface ISourceXWPProps {
  enable: boolean;
  url: string;     // Source Url for iframe
  detect: string;  // Possibly regex string for auto-detect
  advanced: boolean; // Enable Advanced wizard
  powerRows: string; // Possibly to define what PowerSearch rows would be visible
  KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable
}


export interface IPowerSearchState extends IFPSCorePinMeReactComponentState {

  analyticsWasExecuted: boolean;
  mainSelectedButton: ISearchPlace;
  mainSelectedButtonIndex: number; // Index of Main Button last clicked
  autoDetectButtonIndex: number;
  textSearch: string;
  showPanel: boolean;

  mainButtons: IMainButtonObject[];
  canAutoDetect: boolean;
}
