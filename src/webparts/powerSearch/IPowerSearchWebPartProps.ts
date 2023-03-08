

/***
 * NOTE:  All imports in here Must be imported directly from fps-library-v2, not the fpsPreferences
 * Or else it will get into an endless loop because these values are imported into fpsPreferences
 * 
 */
import { IMinWPBannerProps } from '@mikezimm/fps-library-v2/lib/banner/interfaces/MinWP/IMinWPBannerProps';

export const changeGeneral : string[] = [ 'highlightDetect', 'powerEnable', 'showSourceLinks', 'autoPressAll' ];

export const changeSources : string[] = [ 'spoEnable', 'onPremEnable' , 'partsEnable' , 'projectsEnable' , 'standardsEnable', 'alcEnable', 'testsEnable', 'changesEnable', 'source1Enable', 'source2Enable' ];

export const changeSPO : string[] = [ 'spoEnable', 'spoAdvanced' ];
export const changeOnPrem : string[] = [ 'onPremEnable', 'onPremAdvanced' ];
export const changeParts : string[] = [ 'partsEnable', 'partsDetect', 'partsPress', 'partsTarget', 'partsLink' ];
export const changeProjects : string[] = [ 'projectsEnable', 'projectsDetect', 'projectsPress', 'projectsTarget', 'projectsLink' ];
export const changeStandards : string[] = [ 'standardsEnable', 'standardsDetect', 'standardsPress', 'standardsTarget', 'standardsLink' ];
export const changeTests : string[] = [ 'testsEnable', 'testsDetect', 'testsPress', 'testsTarget', 'testsLink' ];
export const changeChanges : string[] = [ 'changesEnable', 'changesDetect', 'changesPress', 'changesTarget', 'changesLink' ];

export const changeSource1 : string[] = [ 'source1Enable', 'source1Label', 'source1RegExp', 'source1Press', 'source1Power', 'source1Target', 'source1Link', 'source1Url' , 'source1Detect' , 'source1Advanced' , 'source1PowerRows', 'source1KQLDocs', ];
export const changeSource2 : string[] = [ 'source2Enable', 'source2Label', 'source2RegExp', 'source2Press', 'source2Power', 'source2Target', 'source2Link', 'source2Url' , 'source2Detect' , 'source2Advanced' , 'source2PowerRows', 'source2KQLDocs', ];

 /*
  For props to export to panel but NOT save in analytics
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WebPartAnalyticsChanges : any = {
  General: changeGeneral,
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

  highlightDetect: boolean;
  powerEnable: boolean;
  showSourceLinks: boolean;  // Show all available source links
  autoPressAll: boolean;  // Auto-press all detected sources on redirect

  spoEnable: boolean;
  spoAdvanced: boolean;

  onPremEnable: boolean;
  onPremAdvanced: boolean;

  partsEnable: boolean;
  partsDetect: boolean;
  partsPress: boolean;
  partsTarget: string; // Open Target on button press - iFrame || '_blank' ?
  partsLink: boolean; // Show Link to full page in some way

  projectsEnable: boolean;
  projectsDetect: boolean;
  projectsPress: boolean;
  projectsTarget: string; // Open Target on button press - iFrame || '_blank' ?
  projectsLink: boolean; // Show Link to full page in some way
  
  standardsEnable: boolean;
  standardsDetect: boolean;
  standardsPress: boolean;
  standardsTarget: string; // Open Target on button press - iFrame || '_blank' ?
  standardsLink: boolean; // Show Link to full page in some way

  alcEnable: boolean;

  testsEnable: boolean;
  testsDetect: boolean;
  testsPress: boolean;
  testsTarget: string; // Open Target on button press - iFrame || '_blank' ?
  testsLink: boolean; // Show Link to full page in some way

  changesEnable: boolean;
  changesDetect: boolean;
  changesPress: boolean;
  changesTarget: string; // Open Target on button press - iFrame || '_blank' ?
  changesLink: boolean; // Show Link to full page in some way

  source1Enable: boolean;
  source1Url: string;     // Source Url for iframe
  source1Detect: string;  // Possibly regex string for auto-detect
  source1PowerRows: string; // Possibly to define what PowerSearch rows would be visible
  source1KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

  source1Label: string;
  source1RegExp: string;
  source1Press: boolean;
  source1Power: boolean; // Enable Advanced wizard

  source1Target: string; // Open Target on button press - iFrame || '_blank' ?
  source1Link: boolean; // Show Link to full page in some way

  source2Enable: boolean;
  source2Url: string;     // Source Url for iframe
  source2Detect: string;  // Possibly regex string for auto-detect
  source2PowerRows: string; // Possibly to define what PowerSearch rows would be visible
  source2KQLDocs: boolean; // Possibly enable/disable KQL Docs if it is usable

  source2Label: string;
  source2RegExp: string;
  source2Press: boolean;
  source2Power: boolean; // Enable Advanced wizard
  
  source2Target: string; // Open Target on button press - iFrame || '_blank' ?
  source2Link: boolean; // Show Link to full page in some way
}
