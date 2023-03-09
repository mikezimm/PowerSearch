/***
 *    db    db  .d88b.       d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b .d8888. 
 *    `8b  d8' .8P  Y8.        `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~' 88'  YP 
 *     `8bd8'  88    88         88    88  88  88 88oodD' 88    88 88oobY'    88    `8bo.   
 *       88    88    88         88    88  88  88 88~~~   88    88 88`8b      88      `Y8b. 
 *       88    `8b  d8'        .88.   88  88  88 88      `8b  d8' 88 `88.    88    db   8D 
 *       YP     `Y88P'       Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP    `8888Y' 
 *         
 *         
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneGroup,
} from '@microsoft/sp-property-pane';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import { SPPermission, } from '@microsoft/sp-page-context';

/***
 *    d888888b db   db d888888b .d8888.      db   d8b   db d88888b d8888b.      d8888b.  .d8b.  d8888b. d888888b 
 *    `~~88~~' 88   88   `88'   88'  YP      88   I8I   88 88'     88  `8D      88  `8D d8' `8b 88  `8D `~~88~~' 
 *       88    88ooo88    88    `8bo.        88   I8I   88 88ooooo 88oooY'      88oodD' 88ooo88 88oobY'    88    
 *       88    88~~~88    88      `Y8b.      Y8   I8I   88 88~~~~~ 88~~~b.      88~~~   88~~~88 88`8b      88    
 *       88    88   88   .88.   db   8D      `8b d8'8b d8' 88.     88   8D      88      88   88 88 `88.    88    
 *       YP    YP   YP Y888888P `8888Y'       `8b8' `8d8'  Y88888P Y8888P'      88      YP   YP 88   YD    YP    
 *                               
 *                               
 */

// STANDARD PROJECT IMPORTS

import * as strings from 'PowerSearchWebPartStrings';
import PowerSearch from './components/PowerSearch';
import { IPowerSearchWebPartProps } from './IPowerSearchWebPartProps';
import { IPowerSearchProps } from './components/IPowerSearchProps';

 /***
  *     .o88b. .d8888. .d8888.      d8888b. d88888b  .d88b.  db    db d888888b d8888b. d88888b .d8888. 
  *    d8P  Y8 88'  YP 88'  YP      88  `8D 88'     .8P  Y8. 88    88   `88'   88  `8D 88'     88'  YP 
  *    8P      `8bo.   `8bo.        88oobY' 88ooooo 88    88 88    88    88    88oobY' 88ooooo `8bo.   
  *    8b        `Y8b.   `Y8b.      88`8b   88~~~~~ 88    88 88    88    88    88`8b   88~~~~~   `Y8b. 
  *    Y8b  d8 db   8D db   8D      88 `88. 88.     `8P  d8' 88b  d88   .88.   88 `88. 88.     db   8D 
  *     `Y88P' `8888Y' `8888Y'      88   YD Y88888P  `Y88'Y8 ~Y8888P' Y888888P 88   YD Y88888P `8888Y' 
  *
  *     USED BY BANNER COMPONENTS
  */

import { initializeIcons } from '@uifabric/icons';
initializeIcons();

require('@mikezimm/fps-styles/dist/GrayPropPaneAccordions.css');
require('@mikezimm/fps-styles/dist/FPSPinMe.css');
require('@mikezimm/fps-styles/dist/FPSHeadings.css');
require('@mikezimm/fps-styles/dist/PropPanelHelp.css');
require('@mikezimm/fps-styles/dist/performance.css');


/***
*    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
*    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
*    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
*    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
*    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
*    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
*
*    USED IN PRESETTING PROPS
*/

import { PreConfiguredProps,  } from './CoreFPS/PreConfiguredSettings';

import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { getAllDefaultFPSFeatureGroups } from '@mikezimm/fps-library-v2/lib/banner/propPane/AllDefaultFPSGroups';

import { WebPartInfoGroup, } from '@mikezimm/fps-library-v2/lib/banner/propPane/WebPartInfoGroup';
import { exportIgnorePropsWP, importBlockPropsWP, WebPartAnalyticsChanges, WebPartPanelChanges,  } from './IPowerSearchWebPartProps';
import { gitRepoPowerSearch } from '@mikezimm/fps-library-v2/lib/components/atoms/Links/LinksRepos';
//  import { IFpsOldVsNewWebPartProps } from './IFpsOldVsNewWebPartProps';
import { runFPSSuperOnInit } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runSuperOnInit';
import { runFPSWebPartRender } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runWebPartRender';
import { onFPSPropPaneCHanged } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runOnPropChange';
import { FPSBaseClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/FPSBaseClass';
import { IThisFPSWebPartClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass';
import { WPSourcesGroup } from './PropPaneGroups/Sources';
import { WPSPOGroup } from './PropPaneGroups/SPO';
import { WPOnPremGroup } from './PropPaneGroups/OnPrem';
import { WPPartsGroup } from './PropPaneGroups/Parts';
import { WProjectsGroup } from './PropPaneGroups/Projects';
import { WPStandardsGroup } from './PropPaneGroups/Standards';
import { WPTestsGroup } from './PropPaneGroups/Tests';
import { WPChangesGroup } from './PropPaneGroups/Changes';
import { WPSourceXGroup } from './PropPaneGroups/Source1';
import { WPGeneralGroup } from './PropPaneGroups/General';


export default class PowerSearchWebPart extends FPSBaseClass<IPowerSearchWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  
  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    this._repoLink = gitRepoPowerSearch; //Set as any but will get created in FPSSuperOnOnit
    this._exportIgnorePropsWP = exportIgnorePropsWP;
    this._importBlockPropsWP = importBlockPropsWP;
    this._trickyApp = 'Power Search';
    this._trickyEmailsWP = []; // These are emails that get tricky functionality for this specific web part
    this._allowShowSearch = false;  //Set to true if you want 'Toggle Search option' in property pane
    this._allowSiteThemeChoice = true;  // Should be set true by default in fps-library-v2 1.0.78

    return super.onInit().then(async _ => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      runFPSSuperOnInit( this as any, PreConfiguredProps, SPPermission );

    });
  }

  /***
   *    d8888b. d88888b d8b   db d8888b. d88888b d8888b.       .o88b.  .d8b.  db      db      .d8888. 
   *    88  `8D 88'     888o  88 88  `8D 88'     88  `8D      d8P  Y8 d8' `8b 88      88      88'  YP 
   *    88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY'      8P      88ooo88 88      88      `8bo.   
   *    88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b        8b      88~~~88 88      88        `Y8b. 
   *    88 `88. 88.     88  V888 88  .8D 88.     88 `88.      Y8b  d8 88   88 88booo. 88booo. db   8D 
   *    88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD       `Y88P' YP   YP Y88888P Y88888P `8888Y' 
   *                  
   *           Source:   PivotTiles 1.5.2.6                                                                                
   */

  public render(): void {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bannerProps = runFPSWebPartRender( this as any, strings, WebPartAnalyticsChanges, WebPartPanelChanges, );

    const element: React.ReactElement<IPowerSearchProps> = React.createElement(
      PowerSearch,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,

        performance: this._performance, //Alternatively, use this if available (like ALVFM): _fetchInfo.performance,

        errMessage: '',
        bannerProps: bannerProps,

        highlightDetect: this.properties.highlightDetect,
        powerEnable: this.properties.powerEnable,
        showSourceLinks: this.properties.showSourceLinks, // Show all available source links
        autoPressAll: this.properties.autoPressAll,  // Auto-press all detected sources on redirect

        mainButtons: {
          spo: {
            enable: this.properties.spoEnable,
            powerEnable: this.properties.spoAdvanced,
            link: this.properties.spoLink,
          },
          onPrem: {
            enable: this.properties.onPremEnable,
            powerEnable: this.properties.onPremAdvanced,
            link: this.properties.onPremLink,
          },
          parts: {
            enable: this.properties.partsEnable,
            detect: this.properties.partsDetect,
            press: this.properties.partsPress,

            target: this.properties.partsTarget,
            link: this.properties.partsLink,
          },
          projects: {
            enable: this.properties.projectsEnable,
            detect: this.properties.projectsDetect,
            press:  this.properties.projectsPress,

            target: this.properties.projectsTarget,
            link: this.properties.projectsLink,
          },
          standards: {
            enable: this.properties.standardsEnable,
            detect: this.properties.standardsDetect,
            press:  this.properties.standardsPress,

            target: this.properties.standardsTarget,
            link: this.properties.standardsLink,
          },
          alc: {
            enable: this.properties.alcEnable,
          },
          tests: {
            enable: this.properties.testsEnable,
            detect: this.properties.testsDetect,
            press:  this.properties.testsPress,

            target: this.properties.testsTarget,
            link: this.properties.testsLink,
          },
          changes: {
            enable: this.properties.changesEnable,
            detect: this.properties.changesDetect,
            press:  this.properties.changesPress,

            target: this.properties.changesTarget,
            link: this.properties.changesLink,
          },
          source1: {
            label: this.properties.source1Label,
            regExp: this.properties.source1RegExp.split(`|||`),
            press: this.properties.source1Press,
            
            enable: this.properties.source1Enable,
            url: this.properties.source1Url,     // Source Url for iframe
            detect: this.properties.source1Detect,
            powerEnable: this.properties.source1Power, // Enable Advanced wizard
            powerRows: this.properties.source1PowerRows, // Possibly to define what PowerSearch rows would be visible
            KQLDocs: this.properties.source1KQLDocs, // Possibly enable/disable KQL Docs if it is usable

            target: this.properties.source1Target,
            link: this.properties.source1Link,

          },
          source2: {
            label: this.properties.source2Label,
            regExp: this.properties.source1RegExp.split(`|||`),
            press: this.properties.source2Press,

            enable: this.properties.source2Enable,
            url: this.properties.source2Url,     // Source Url for iframe
            detect: this.properties.source2Detect,  // Possibly regex string for auto-detect
            powerEnable: this.properties.source2Power, // Enable Advanced wizard
            powerRows: this.properties.source2PowerRows, // Possibly to define what PowerSearch rows would be visible
            KQLDocs: this.properties.source2KQLDocs, // Possibly ena

            target: this.properties.source2Target,
            link: this.properties.source2Link,
          },
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /***
 *    d8888b. d8888b.  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b       .o88b. db   db  .d8b.  d8b   db  d888b  d88888b 
 *    88  `8D 88  `8D .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'          d8P  Y8 88   88 d8' `8b 888o  88 88' Y8b 88'     
 *    88oodD' 88oobY' 88    88 88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo      8P      88ooo88 88ooo88 88V8o 88 88      88ooooo 
 *    88~~~   88`8b   88    88 88~~~        88~~~   88~~~88 88 V8o88 88~~~~~      8b      88~~~88 88~~~88 88 V8o88 88  ooo 88~~~~~ 
 *    88      88 `88. `8b  d8' 88           88      88   88 88  V888 88.          Y8b  d8 88   88 88   88 88  V888 88. ~8~ 88.     
 *    88      88   YD  `Y88P'  88           88      YP   YP VP   V8P Y88888P       `Y88P' YP   YP YP   YP VP   V8P  Y888P  Y88888P 
 *                                                 
 *                                                 
 */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void>{
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await onFPSPropPaneCHanged( this as any, propertyPath, oldValue, newValue );

    this.context.propertyPane.refresh();

    this.render();

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias
    const thisAsAny: IThisFPSWebPartClass = this as any;

    let groups: IPropertyPaneGroup[] = [ WebPartInfoGroup( this._repoLink, 'Power Search Webpart', PropertyPaneWebPartInformation ) ];
    const FPSGroups: IPropertyPaneGroup[] = getAllDefaultFPSFeatureGroups ( thisAsAny );
    const PowerSearchGroups = [
      WPGeneralGroup( this.properties, thisAsAny, ),
      WPSourcesGroup( this.properties, thisAsAny, ),
      WPSPOGroup( this.properties, thisAsAny, ),
      WPOnPremGroup( this.properties, thisAsAny, ),
      WPPartsGroup( this.properties, thisAsAny, ),
      WProjectsGroup( this.properties, thisAsAny, ),
      WPStandardsGroup( this.properties, thisAsAny, ),
      WPTestsGroup( this.properties, thisAsAny, ),
      WPChangesGroup( this.properties, thisAsAny, ),
      WPSourceXGroup( this.properties, 1, thisAsAny, ),
      WPSourceXGroup( this.properties, 2, thisAsAny, ),
    ]
    groups = [ ...groups, ...PowerSearchGroups ];

    return {
      pages: [
        {
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: groups,
        },
        {
          header: {
            description: `Other web part properties`
          },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: FPSGroups,
        }
      ]
    };
  }
}
