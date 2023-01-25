/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *          
 *          
 */

// import { encrptMeOriginalTest } from '../fpsReferences';

import { PresetFPSBanner, } from '../fpsMinIndex';
import { IPreConfigSettings, IAllPreConfigSettings,  } from '../fpsMinIndex';


/***
 *    db       .d88b.   .o88b.  .d8b.  db      
 *    88      .8P  Y8. d8P  Y8 d8' `8b 88      
 *    88      88    88 8P      88ooo88 88      
 *    88      88    88 8b      88~~~88 88      
 *    88booo. `8b  d8' Y8b  d8 88   88 88booo. 
 *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P 
 *                                             
 *                                             
 */

//Specific to this web part
export const WPForceEverywhere : IPreConfigSettings = {
    source: 'WPForceEverywhere',
    location: '*',
    props: {

        showRepoLinks : true,
        // showExport : false,
        showBanner : true,
    }
};

//Specific to this web part
export const WPPresetEverywhere : IPreConfigSettings = {
    source: 'WPPresetEverywhere',
    location: '*',
    props: {
        bannerTitle: "Power Search",
        defPinState: 'disabled',
        showGoToHome: false,
        showGoToParent: false,
        enableExpandoramic: false,
        homeParentGearAudience: 'Page Editors',

        requireDocumentation: true,
        requireContacts: true,

        highlightDetect: true,

        // Source specific presets
        spoEnable: true,
        spoAdvanced: true,

        onPremEnable: true,
        onPremAdvanced: true,

        partsEnable: true,
        partsDetect: true,

        projectsEnable: true,
        projectsDetect: true,

        standardsEnable: true,
        standardsDetect: true,

        alcEnable: false,

        testsEnable: false,
        testsDetect: true,

        changesEnable: false,
        changesDetect: true,

        source1Enable: false,
        source1Url: '',     // Source Url for iframe
        source1Detect: '',  // Possibly regex string for auto-detect
        source1Advanced: false, // Enable Advanced wizard
        source1PowerRows: '', // Possibly to define what PowerSearch rows would be visible
        source1KQLDocs: false, // Possibly enable/disable KQL Docs if it is usable

        source2Enable: false,
        source2Url: '',    // Source Url for iframe
        source2Detect: '',  // Possibly regex string for auto-detect
        source2Advanced: false, // Enable Advanced wizard
        source2PowerRows: '', // Possibly to define what PowerSearch rows would be visible
        source2KQLDocs: false, // Possibly enable/disable KQL Docs if it is usable

    }
};

export const PresetSomeRandomSite : IPreConfigSettings = {
    source: 'PresetSomeRandomSite',
    location: '/sites/lifenet'.toLowerCase(),
    props: {
        // homeParentGearAudience: 'Some Test Value',
        // requireDocumentation: false,
        requireDocumentation: 'true',
    }
};

export const ForceSomeRandomSite : IPreConfigSettings = {
    source: 'ForceSomeRandomSite',
    location: '/sites/FPS/'.toLowerCase(),
    props: {
        // homeParentGearAudience: 'Some Test Value',
        // requireDocumentation: false,
        // requireContacts: true,
        // bannerStyleChoice: 'redDark',
        // bannerStyle: createBannerStyleStr( 'redDark', 'banner'),
        // bannerCmdStyle: createBannerStyleStr( 'redDark', 'cmd'),
    }
};


export const PreConfiguredProps : IAllPreConfigSettings = {
    //Forced over-ride presets.
    //Forced and presets are applied in order of this array....
    //  This means the final preset in the array takes precedance.

    //For Forced, generally speaking put because this web part may have specific needs.
    forced: [ WPForceEverywhere, ForceSomeRandomSite,  ],

    //For Presets, Order should be:  PresetFPSBanner, WPPresetEverywhere, CUSTOM Sites,
    preset: [ PresetSomeRandomSite, WPPresetEverywhere, PresetFPSBanner, ],
};
