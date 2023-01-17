
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

export type IPowerSearchKeys = 'keywords' |  'author' |  'editor' |  'filetype' |  'filename' ;
export interface IPowerSearch {
  keywords: IInAndOut ;
  author: IInAndOut;
  editor: IInAndOut;
  filetype: IInAndOut;
  filename: IInAndOut;
}
export interface IAlvSearchState extends IFPSCorePinMeReactComponentState {

  textSearch: string;
  iframeSrc: string;
  lastPlace: ISearchPlace;
  showBack: 0 | 1 | 2;

  search: IPowerSearch;

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