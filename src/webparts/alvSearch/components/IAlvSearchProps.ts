
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
export interface IAlvSearchState extends IFPSCorePinMeReactComponentState {

  textSearch: string;
  iframeSrc: string;
  lastPlace: ISearchPlace;
  showBack: 0 | 1 | 2;
}