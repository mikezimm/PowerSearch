
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
  showFullLink?: boolean;
}

export interface IMainButtonObject extends IButtonBase {
  primary: boolean;
  click: ISearchPlace;

  // NOTE you can get the string version like this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source
  regExp?: RegExp[] ;
  detect?: boolean; // If this button allows for regex detection
  press?: boolean; // If this button allows for auto-press on load
  power?: boolean;  // Uses PowerSearchPane
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
  power: true,
}

export const MainOnPremButton: IMainButtonObject = {
  title: `Search (Old) SharePoint On-Premise`,
  primary: false,
  label: `Legacy Search`,
  click: `onPrem`,
  iframeUrl: `https://${code}apps.${code}.${tenant}.int/sites/search/Pages/results.aspx?k={{textSearch}}`,
  target: `_blank`,
  power: true,
}

export const MainPartsButton: IMainButtonObject = {
  title: `Search for Engineering Parts`,
  primary: false,
  label: `Search Part Numbers`,
  click: `parts`,
  iframeUrl: `https://parts.${code}.${tenant}.int/eparts?q={{textSearch}}`,
  target: `search_iframe`,
  regExp: [

    // NOTE:  2023-03-07 For all these, replaced \s? and $ with \s?$ so that it can not have any other characters except something like an enter if it is considered a character.

    // https://github.com/mikezimm/PowerSearch/issues/33 - expanded to include starting with a 7
    // /^[5-6]\d{6,8}[[:>:]]/g,
    /^[5-7]\d{6,8}\s?$/gi, // Start with 5 or 6, followed by either 6 or 8 digits - total of 7 or 9 digits - 6123456 || 612345678
    /^[5-7]\d{8}[a-z]\s?$/gi, // Start with 5 or 6, followed 8 digits AND a letter - total 10 characters - 612345678A

    // This one replaces all the ones directly below
    /^[5-7]\d{6}-?[a-z\d][a-z\d][a-z]\s?$/gi,
    // /^[5-7]\d{6}-?\d\d[a-z]\s?$/gi, // Start with 5 or 6, followed 6 digits, an optional hyphen, 2 more numbers AND a letter - 61234567-00A
    // https://github.com/mikezimm/PowerSearch/issues/55
    // /^[5-7]\d{6}-?\d[a-z][a-z]\s?$/gi, // Start with 5 or 6, followed 6 digits, an optional hyphen, 2 more numbers AND a letter - 61234567-0BA
    // /^[5-7]\d{6}-?[a-z]\d[a-z]\s?$/gi, // Start with 5 or 6, followed 6 digits, an optional hyphen, 2 more numbers AND a letter - 61234567-B0A

    // https://github.com/mikezimm/PowerSearch/issues/40
    /^[5-7]\d{6}-?[a-z][a-z][a-z]$/gi, // Start with 5 or 6, followed 6 digits, an optional hyphen, 2 more numbers AND a letter - 61234567-00A
    /^[x][5-7]\d{6}\s?$/gi, // Start x or X, then 5 or 6, followed 6 digits, - x5123456
    /^[x][5-7]\d{8}[a-z]\s?$/gi, // Start x or X, then 5 or 6, followed 8 digits, AND a letter - x512345678A
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

    // NOTE:  2023-03-07 For all these, replaced \s? and $ with \s?$ so that it can not have any other characters except something like an enter if it is considered a character.

    /^[a][s]-?\d{3}\s?$/gi, // this does find result from testing
    /^[a][s]\d{3}\s?$/gi, // this does find result from testing
    /^[a][s]-?\d{3}\s?[[:>:]]/gi,
  ],
  detect: true,
}

export const MainTestsButton: IMainButtonObject = {
  title: `Search Tests Dashboard`,
  primary: false,
  label: `Tests`,
  click: `tests`,
  iframeUrl: `https://tests.${code}.${tenant}.int/tests-dashboard?q={{textSearch}}`,
  target: `search_iframe`,
  regExp: [

    // NOTE:  2023-03-07 For all these, replaced \s? and $ with \s?$ so that it can not have any other characters except something like an enter if it is considered a character.

    // /^[t]2\d{7}\s?/gi,
    /^[t]-?2\d{7}\s?$/gi,      // like T21234567 || T-21234567
    // /^[t][o]2\d{7}\s?/gi,
    /^[t][o]-?2\d{7}\s?$/gi,  // like TO21234567 || TO-21234567
    // /^[t][p]2\d{7}\s?/gi,
    /^[t][p]-?2\d{7}\s?$/gi,  // like TP21234567 || TP-21234567

    // https://github.com/mikezimm/PowerSearch/issues/41
    /^[t]-?\d{8}\s?$/gi,       // Same as above but allow any digit as first number (instead of just #2)
    /^[t][o]-?\d{8}\s?$/gi,   // Same as above but allow any digit as first number (instead of just #2)
    /^[t][p]-?\d{8}\s?$/gi,   // Same as above but allow any digit as first number (instead of just #2)

  ],
  detect: true,
}

export const MainChangesButton: IMainButtonObject = {
  title: `Search Changes Dashboard`,
  primary: false,
  label: `Changes`,
  click: `changes`,
  iframeUrl: `https://changes.${code}.${tenant}.int/affected?q={{textSearch}}`, // close #31
  target: `search_iframe`,
  regExp: [

    // NOTE:  2023-03-07 For all these, replaced \s? and $ with \s?$ so that it can not have any other characters except something like an enter if it is considered a character.

    // https://github.com/mikezimm/PowerSearch/issues/42 - added O instead of R
    /^[e][c][ro][5-7]\d{5}\s?$/gi, // this does find result from testing
    /^[e][c][ro]-[5-7]\d{5}\s?$/gi, // this does find result from testing

    /^[5-7]\d{5}\s?$/g, // Start with 5, 6 or 7, followed 5 digits AND a letter - total 10 characters - 618723
  ],
  detect: true,
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

export const AllMainButtons: IMainButtonObject[] = [
  MainSPOButton,
  MainOnPremButton,
  MainPartsButton,
  MainProjectsButton,
  MainStandardsButton,
  MainChangesButton,
  MainTestsButton,
  MainALCButton,
  MainSource1Button,
  MainSource2Button,
];

export const MainWithDetect: IMainButtonObject[] = AllMainButtons.filter( button => button.detect === true );
export const MainWithPower: IMainButtonObject[] = AllMainButtons.filter( button => button.power === true );