

export interface IPowerPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _search( arg0: any ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _enter(event: any, newValue?: string ): void;
}


  
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

export interface IPowerPanelState {

  history: string[];
  historyBuild: string[];
  showHistory: boolean;
  // textSearch: string;
  iframeSrc: string;

  showBack: 0 | 1 | 2;

  search: IPowerSearch;

  powerIframeUrl: string;
  powerIndex: number;
  reclickCount: number;

  hints: IPowerHints;

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
