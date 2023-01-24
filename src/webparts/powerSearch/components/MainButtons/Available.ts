
import { code, ISearchPlace, tenant } from '../IPowerSearchProps';

/**
 * IButtonStatus:  
 *    default = gray
 *    primary = blue or primary color meaning selected/active 
 *    opposite = red meaning it's an 'exclusion' setting - used in PowerPane
 */
export type IButtonStatus = 'default' | 'primary' | 'opposite';

export type IIFrameTarget = '_blank' | 'search_iframe' | 'power_iframe';

export interface IButtonBase {
  title: string;
  label: string;
  iframeUrl: string;
  target: IIFrameTarget;
  click?: string;  // string passed in onClick
  disabled?: boolean;
}

export interface IMainButtonObject extends IButtonBase {
  primary: boolean;
  click: ISearchPlace;

  // NOTE you can get the string version like this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source
  regExp?: RegExp[] ;
  detect?: boolean; // If this button allows for regex detection
}

export interface IPowerButtonObject extends IButtonBase {
  status?: IButtonStatus;  // Alternate to primary when it's complex styling option
}

export const MainSPOButton: IMainButtonObject = {
  title: `Search (New) SharePoint Online`,
  primary: false,
  label: `Updated Search`,
  click: `spo`,
  iframeUrl: `https://${tenant}.sharepoint.com/sites/lifenet_it/_layouts/15/search.aspx?q={{textSearch}}`,
  target: `search_iframe`,
}

export const MainOnPremButton: IMainButtonObject = {
  title: `Search (Old) SharePoint On-Premise`,
  primary: false,
  label: `Legacy Search`,
  click: `onPrem`,
  iframeUrl: `https://${code}apps.${code}.${tenant}.int/sites/search/Pages/results.aspx?k={{textSearch}}`,
  target: `_blank`,
}

export const MainPartsButton: IMainButtonObject = {
  title: `Search for Engineering Parts`,
  primary: false,
  label: `Search Part Numbers`,
  click: `parts`,
  iframeUrl: `https://parts.${code}.${tenant}.int/eparts?q={{textSearch}}`,
  target: `search_iframe`,
  regExp: [
    // /^[5-6]\d{6,8}[[:>:]]/g,
    /^[5-6]\d{6,8}$/g,
    /^[5-6]\d{8}[a-zA-Z]$/g,
    /^[5-6]\d{6}-\d\d[a-zA-Z]$/g,
  ],
  detect: true,
}

export const MainProjectsButton: IMainButtonObject = {
  title: `Search the AS100 Project Dashboard`,
  primary: false,
  label: `Search Projects`,
  click: `projects`,
  iframeUrl: `https://projects.${code}.${tenant}.int/dashboard?q={{textSearch}}`,
  target: `search_iframe`,
  regExp: [
    // /^[1-3]\d{5}\s?[[:>:]]/g,
    /^[1-3]\d{5}\s?$/g,
  ],
  detect: true,
}

export const MainStandardsButton: IMainButtonObject = {
  title: `Search ALV Standards`,
  primary: false,
  label: `Search Standards`,
  click: `standards`,
  iframeUrl: `https://${code}apps.${code}.${tenant}.int/sites/${code}acs/SitePages/Search%20All%20Standards.aspx?u=https%3A%2F%2F${code}apps%2E${code}%2E${tenant}%2Eint%2Fsites%2F${code}acs&k=#k={{textSearch}}`,
  target: `_blank`,
  regExp: [
    // /^AS\d{3}\s?[[:>:]]/g,
    // /^[aA][sS]-?\d{3}\\z/g, -- DOES NOT WORK
    // /^[aA][sS]-?\d{3}\\Z/g, -- DOES NOT WORK
    /^[aA][sS]-?\d{3}\s?/g, // this does find result from testing
    /^[aA][sS]\d{3}\s?/g, // this does find result from testing
    /^[aA][sS]-?\d{3}\s?[[:>:]]/g,
  ],
  detect: true,
}

export const MainTestsButton: IMainButtonObject = {
  title: `Search Tests Dashboard`,
  primary: false,
  label: `Tests`,
  click: `tests`,
  iframeUrl: ``,
  target: `search_iframe`,
}

export const MainChangesButton: IMainButtonObject = {
  title: `Search Changes Dashboard`,
  primary: false,
  label: `Changes`,
  click: `changes`,
  iframeUrl: ``,
  target: `search_iframe`,
}

export const MainALCButton: IMainButtonObject = {
  title: `Search ALC List`,
  primary: false,
  label: `ALC`,
  click: `alc`,
  iframeUrl: ``,
  target: `_blank`,
}

export const MainSource1Button: IMainButtonObject = {
  title: `Search Custom Source 1`,
  primary: false,
  label: `Source1`,
  click: `source1`,
  iframeUrl: ``,
  target: `search_iframe`,
}

export const MainSource2Button: IMainButtonObject = {
  title: `Search Custom Source 2`,
  primary: false,
  label: `Source2`,
  click: `source2`,
  iframeUrl: ``,
  target: `search_iframe`,
}
