
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';
import { ISelectionOptionsWithRequiredGetKey } from 'office-ui-fabric-react';

import { ILoadPerformance } from '../fpsMinIndex';

export interface IAlvSearchProps extends IFPSCoreReactComponentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

}


export type ISearchPlace = 'SPO' | 'onPrem' | 'projects' | 'parts' | 'standards';

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export type IInOrOut = 'In' | 'Out';

export interface IInAndOut {
  In: string;
  Out: string;
}

export type IPowerTimeChoice = 'Today' | 'Yesterday' | 'ThisWeek' | 'LastWeek' | 'ThisMonth' | 'LastMonth' | 'ThisYear' | 'LastYear' | string;

export type IPowerSearchKeys = 'keywords' |  'author' |  'editor' |  'filetype' |  'filename' | 'title' | 'time'  | 'cust1' | 'cust2' | 'cust3' | 'cust4' | 'date1' ;
export interface IPowerSearch {
  textSearch: string;
  keywords: IInAndOut ;
  author: IInAndOut;
  editor: IInAndOut;
  filetype: IInAndOut;
  filename: IInAndOut;
  title: IInAndOut;
  time: IPowerTimeChoice;
  cust1: IInAndOut;
  cust2: IInAndOut;
  cust3: IInAndOut;
  cust4: IInAndOut;
  date1: IPowerTimeChoice;
}

export interface IPowerHints {
  current: IPowerSearchKeys;
  docs: boolean;

  keywords: boolean ;
  author: boolean;
  editor: boolean;
  filetype: boolean;
  filename: boolean;
  title: boolean;
  time: boolean;
  cust1: boolean;
  cust2: boolean;
  cust3: boolean;
  cust4: boolean;
  date1: boolean;
}

export interface IAlvSearchState extends IFPSCorePinMeReactComponentState {

  history: string[];
  historyBuild: string[];
  showHistory: boolean;
  // textSearch: string;
  iframeSrc: string;
  lastPlace: ISearchPlace;
  showBack: 0 | 1 | 2;

  search: IPowerSearch;

  powerIframeUrl: string;
  powerIndex: number;
  reclickCount: number;

  hints: IPowerHints;

  // searchInWords: string;
  // searchOutWords: string;
  // searchInAuth: string;
  // searchOutAuth: string;
  // searchInEdit: string;
  // searchOutEdit: string;
  // searchInType: string;
  // searchOutType: string;
  // searchInFileName: string;
  // searchOutFileName: string;
}

export const ClearHints : IPowerHints = {
  current: null,
  docs: false,

  keywords: false,
  author: false,
  editor: false,
  filetype: false,
  filename: false,
  title: false,
  time: false,

  cust1: false,
  cust2: false,
  cust3: false,
  cust4: false,
  date1: false,
}