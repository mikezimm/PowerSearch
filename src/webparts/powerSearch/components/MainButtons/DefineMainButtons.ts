import { IBaseSPWPProps, IPowerSearchProps, IPrimarySourceWPProps, ISourceXWPProps } from "../IPowerSearchProps";
import { IIFrameTarget, IMainButtonObject, MainALCButton, MainChangesButton, MainOnPremButton, MainPartsButton, MainProjectsButton, MainSource1Button, MainSource2Button, MainSPOButton, MainStandardsButton, MainTestsButton } from "./Available";

export function defineMainButtons( props: IPowerSearchProps ): IMainButtonObject[] {
  const { mainButtons } = props;
  const buttons: IMainButtonObject[] = [];

  if ( mainButtons.spo.enable === true ) {
    const ThisButton = updateSPSource( props, MainSPOButton, mainButtons.spo );
    buttons.push( ThisButton );

  }
  if ( mainButtons.onPrem.enable === true ) {
    const ThisButton = updateSPSource( props, MainOnPremButton, mainButtons.onPrem );
    buttons.push( ThisButton );

  }
  if ( mainButtons.parts.enable === true ) {
    const ThisButton = updateOtherSource( props, MainPartsButton , mainButtons.parts );
    buttons.push( ThisButton );

  }
  if ( mainButtons.projects.enable === true ) {
    const ThisButton = updateOtherSource( props, MainProjectsButton , mainButtons.projects );
    buttons.push( ThisButton );

  }
  if ( mainButtons.standards.enable === true ) {
    const ThisButton = updateOtherSource( props, MainStandardsButton , mainButtons.standards );
    buttons.push( ThisButton );

  }
  if ( mainButtons.alc.enable === true ) {
    buttons.push( MainALCButton );
  }
  if ( mainButtons.tests.enable === true ) {
    const ThisButton = updateOtherSource( props, MainTestsButton , mainButtons.tests );
    buttons.push( ThisButton );

  }
  if ( mainButtons.changes.enable === true ) {
    const ThisButton = updateOtherSource( props, MainChangesButton , mainButtons.changes );
    buttons.push( ThisButton );

  }
  if ( mainButtons.source1.enable === true ) {
    const ThisButton: IMainButtonObject = updateCustomSource( props, MainSource1Button, mainButtons.source1 );
    buttons.push( ThisButton );
  }
  if ( mainButtons.source2.enable === true ) {
    const ThisButton: IMainButtonObject = updateCustomSource( props, MainSource2Button, mainButtons.source2 );
    buttons.push( ThisButton );
  }

  return buttons;

}

export type IGitHubType = 'repositories' | 'issues' | 'code';

export function makeGitHubUrl( gitHubType: IGitHubType ): string {
  return `https://github.com/search?type=${gitHubType}&q={{textSearch}}`;
}

export function updateSPSource( props: IPowerSearchProps, origSource: IMainButtonObject, propsSource: IBaseSPWPProps ): IMainButtonObject {
  const { link, powerEnable, enable } = propsSource;

  if ( enable === true || enable === false ) origSource.disabled = enable !== true ? true : false;
  origSource.power = powerEnable === true && props.powerEnable === true ? true : false ;
  if ( link === true || link === false ) origSource.showFullLink = props.showSourceLinks === true ? link : false;

  return origSource;
}

export function updateOtherSource( props: IPowerSearchProps, origSource: IMainButtonObject, propsSource: IPrimarySourceWPProps ): IMainButtonObject {
  const { enable, press, link, target, detect } = propsSource;

  if ( enable === true || enable === false ) origSource.disabled = enable;
  if ( press === true || press === false ) origSource.press = press;
  if ( detect === true || detect === false ) origSource.detect = detect;
  if ( target ) origSource.target = target ? target as IIFrameTarget: 'search_iframe';
  if ( link === true || link === false ) origSource.showFullLink = props.showSourceLinks === true ? link : false;

  return origSource;
}

export function updateCustomSource( props: IPowerSearchProps, origSource: IMainButtonObject, propsSource: ISourceXWPProps ): IMainButtonObject {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { KQLDocs, powerEnable, enable, powerRows, url, press, label, regExp, link, target } = propsSource;

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
  
  if ( label ) { origSource.label = label; } else { origSource.label = propsSource.url;  }

  if ( enable === true || enable === false ) origSource.disabled = enable !== true ? true : false;


  if ( press === true || press === false ) origSource.press = press === true ? true : false;
  if ( powerEnable === true || powerEnable === false ) origSource.power = powerEnable === true ? true : false;

  if ( target ) origSource.target = target ? target as IIFrameTarget: 'search_iframe';
  if ( link === true || link === false ) origSource.showFullLink = props.showSourceLinks === true ? link : false;

  return origSource;
}