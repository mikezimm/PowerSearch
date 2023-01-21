import { IPowerSearchKeys } from "../IPowerPanelProps";

export type ISearchTipKey = IPowerSearchKeys | '*';

export interface ISearchTip {
  tip: string | JSX.Element;
  detail?: string;
  keys: ISearchTipKey[];
  url?: string;
  heading?: string;
}

export interface ITipsInfoIndex {
  keywords: number[] ;
  author: number[];
  editor: number[];
  filetype: number[];
  filename: number[];
}

export interface ITipsInfo {
  tips: ISearchTip;
  index: ITipsInfoIndex;
}