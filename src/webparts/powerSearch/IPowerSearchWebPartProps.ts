

/***
 * NOTE:  All imports in here Must be imported directly from fps-library-v2, not the fpsPreferences
 * Or else it will get into an endless loop because these values are imported into fpsPreferences
 * 
 */
import { IMinWPBannerProps } from '@mikezimm/fps-library-v2/lib/banner/interfaces/MinWP/IMinWPBannerProps';


export const changeSources : string[] = [ 'spoEnable', 'onPremEnable' , 'partsEnable' , 'projectsEnable' , 'standardsEnable', 'alcEnable', 'testsEnable', 'changesEnable', 'source1Enable', 'source2Enable' ];

export const changeSPO : string[] = [ 'spoEnable', 'spoAdvanced' ];
export const changeOnPrem : string[] = [ 'onPremEnable', 'onPremAdvanced' ];
export const changeParts : string[] = [ 'partsEnable', 'partsDetect' ];
export const changeProjects : string[] = [ 'projectsEnable', 'projectsDetect' ];
export const changeStandards : string[] = [ 'standardsEnable', 'standardsDetect' ];
export const changeTests : string[] = [ 'testsEnable', 'testsDetect' ];
export const changeChanges : string[] = [ 'changesEnable', 'changesDetect' ];

export const changeSource1 : string[] = [ 'source1Enable', 'source1Url' , 'source1Detect' , 'source1Advanced' , 'source1PowerRows', 'source1KQLDocs', ];
export const changeSource2 : string[] = [ 'source2Enable', 'source2Url' , 'source2Detect' , 'source2Advanced' , 'source2PowerRows', 'source2KQLDocs', ];

 /**
  For props to export to panel but NOT save in analytics
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WebPartAnalyticsChanges : any = {
  SPO: changeSPO,
  OnPrem: changeOnPrem,
  Parts: changeParts,
  Projects: changeProjects,
  Standards: changeStandards,
  Tests: changeTests,
  Changes: changeChanges,
  Source1: changeSource1,
  Source2: changeSource2,
}


 /**
 * These are properties to export BOTH to analytics AND the panel
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WebPartPanelChanges : any = {

}

//Specific for this web part
export const exportIgnorePropsWP : string[] = [ ];


//These props will not be imported even if they are in one of the change arrays above (fail-safe)
//This was done so user could not manually insert specific props to over-right fail-safes built in to the webpart

//Specific for this web part
export const importBlockPropsWP : string[] = [ 'showSomeProps' ];



// export interface IFpsCore115BannerWebPartProps extends IMinWPBannerProps {
  /**
   * Extend with portions of FPS Props that are needed
   * 
   */


export interface IPowerSearchWebPartProps extends IMinWPBannerProps {

  description: string;

  // spoEnable onPremEnable partsEnable projectsEnable standardsEnable testsEnable changesEnable source1Enable source2Enable

  spoEnable: boolean;
  spoAdvanced: boolean;

  onPremEnable: boolean;
  onPremAdvanced: boolean;

  partsEnable: boolean;
  partsDetect: boolean;

  projectsEnable: boolean;
  projectsDetect: boolean;

  standardsEnable: boolean;
  standardsDetect: boolean;

  alcEnable: boolean;

  testsEnable: boolean;
  testsDetect: boolean;

  changesEnable: boolean;
  changesDetect: boolean;

  source1Enable: boolean;
  source1Url: string;     // Source Url for iframe
  source1Detect: string;  // Possibly regex string for auto-detect
  source1Advanced: boolean; // Enable Advanced wizard
  source1PowerRows: string; // Possibly to define what PowerSearch rows would be visible
  source1KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

  source2Enable: boolean;
  source2Url: string;     // Source Url for iframe
  source2Detect: string;  // Possibly regex string for auto-detect
  source2Advanced: boolean; // Enable Advanced wizard
  source2PowerRows: string; // Possibly to define what PowerSearch rows would be visible
  source2KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

}
