
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';


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
  time: boolean;  // future use aka - LastModified in last week
  cust1: boolean; // future use via property pane options
  cust2: boolean; // future use via property pane options
  cust3: boolean; // future use via property pane options
  cust4: boolean; // future use via property pane options
  date1: boolean; // future use via property pane options to do Time based search on fields other than LastModified
}

export interface IAlvSearchState extends IFPSCorePinMeReactComponentState {

  history: string[];  // Array of the actual search queries that have been executed (from power search page)
  historyBuild: string[];  // Array of stringified versions of this.state.search.  This makes it easier to rebuild the search boxes when you click on a historical search
  showHistory: boolean;  // History array of all searches in current section ( after you hit 'enter' in power search)
  // textSearch: string;
  iframeSrc: string;  // Main page iframe url
  lastSource: ISearchPlace;  // Most recent search source button selected.
  showBack: 0 | 1 | 2;

  search: IPowerSearch;  // All of the vaules of the search boxes and complete search string the user enters/generates

  powerIframeUrl: string;  // Url to show in the powerHint iframe below the search boxes
  powerIndex: number;  // Index of currently selected powerHint heading.
  reclickCount: number; // How many times the most recent PowerHint (right menu) was clicked in a row.  Used to allow double clicks to jump to heading section faster.

  hints: IPowerHints;  // booleans of all the powerHints used to track which ones should be visible

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