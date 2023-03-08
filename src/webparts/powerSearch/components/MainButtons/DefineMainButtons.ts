import { IPowerSearchProps, ISourceXWPProps } from "../IPowerSearchProps";
import { IMainButtonObject, MainALCButton, MainChangesButton, MainOnPremButton, MainPartsButton, MainProjectsButton, MainSource1Button, MainSource2Button, MainSPOButton, MainStandardsButton, MainTestsButton } from "./Available";

export function defineMainButtons( props: IPowerSearchProps ): IMainButtonObject[] {
  const { mainButtons } = props;
  const buttons: IMainButtonObject[] = [];

  if ( mainButtons.spo.enable === true ) {
    MainSPOButton.power = props.powerEnable;
    buttons.push( MainSPOButton );
  }
  if ( mainButtons.onPrem.enable === true ) {
    MainOnPremButton.power = props.powerEnable;
    buttons.push( MainOnPremButton );
  }
  if ( mainButtons.parts.enable === true ) {
    MainPartsButton.detect = mainButtons.parts.detect;
    MainPartsButton.press = mainButtons.parts.press;
    buttons.push( MainPartsButton );
  }
  if ( mainButtons.projects.enable === true ) {
    MainProjectsButton.detect = mainButtons.projects.detect;
    MainProjectsButton.press = mainButtons.projects.press;
    buttons.push( MainProjectsButton );
  }
  if ( mainButtons.standards.enable === true ) {
    MainStandardsButton.detect = mainButtons.standards.detect;
    MainStandardsButton.press = mainButtons.standards.press;
    buttons.push( MainStandardsButton );
  }
  if ( mainButtons.alc.enable === true ) {
    buttons.push( MainALCButton );
  }
  if ( mainButtons.tests.enable === true ) {
    MainTestsButton.detect = mainButtons.standards.detect;
    MainTestsButton.press = mainButtons.standards.press;
    buttons.push( MainTestsButton );
  }
  if ( mainButtons.changes.enable === true ) {
    MainChangesButton.detect = mainButtons.changes.detect;
    MainChangesButton.press = mainButtons.changes.press;
    buttons.push( MainChangesButton );
  }
  if ( mainButtons.source1.enable === true ) {
    const source1Button: IMainButtonObject = updateCustomSource( MainSource1Button, mainButtons.source1 );
    buttons.push( source1Button );
  }
  if ( mainButtons.source2.enable === true ) {
    const source2Button: IMainButtonObject = updateCustomSource( MainSource2Button, mainButtons.source2 );
    buttons.push( source2Button );
  }

  return buttons;

}

export type IGitHubType = 'repositories' | 'issues' | 'code';

export function makeGitHubUrl( gitHubType: IGitHubType ): string {
  return `https://github.com/search?type=${gitHubType}&q={{textSearch}}`;
}

export function updateCustomSource( origSource: IMainButtonObject, propsSource: ISourceXWPProps ): IMainButtonObject {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { KQLDocs, powerEnable, detect, enable, powerRows, url, press, label, regExp } = propsSource;

  if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'google' ) {
    if ( url ) origSource.iframeUrl = `https://www.google.com/search?q={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'bing' ) {
    if ( url ) origSource.iframeUrl = `https://www.bing.com/search?q={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'bingmaps' ) {
    if ( url ) origSource.iframeUrl = `https://www.bing.com/maps/search?q={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'bingimages' ) {
    if ( url ) origSource.iframeUrl = `https://www.bing.com/images/search?q={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'bingvideos' ) {
    if ( url ) origSource.iframeUrl = `https://www.bing.com/videos/search?q={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'youtube' ) {
    if ( url ) origSource.iframeUrl = `https://www.youtube.com/results?search_query={{textSearch}}`;

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'githubrepos' ) {
    if ( url ) origSource.iframeUrl = makeGitHubUrl('repositories');

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'githubissues' ) {
    if ( url ) origSource.iframeUrl = makeGitHubUrl('issues');

  } else if ( propsSource.url && propsSource.url.toLocaleLowerCase() === 'githubcode' ) {
    if ( url ) origSource.iframeUrl = makeGitHubUrl('code');

  } else {
    if ( url ) origSource.iframeUrl = url;
  }

  if ( enable ) origSource.disabled = enable !== true ? true : false;
  if ( label ) origSource.label = label ? label : 'Source';
  if ( press ) origSource.press = press === true ? true : false;
  if ( powerEnable ) origSource.power = powerEnable === true ? true : false;

  return origSource;
}