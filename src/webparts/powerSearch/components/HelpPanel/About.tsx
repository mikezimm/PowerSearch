import { IHelpTable, } from '@mikezimm/fps-library-v2/lib/banner/components/SingleHelpPage/ISinglePageProps';
// import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';

import { createAboutRow } from '@mikezimm/fps-library-v2/lib/banner/components/Panel/createAboutRow';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';

export const panelVersionNumber = '2023-03-09 -  1.0.0.09'; //Added to show in panel

export function aboutTable( bannerProps: IWebpartBannerProps ) : { table: IHelpTable } {

    const table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    /**
     * Security update log
     *
     * converting all links and cdns to lower case so casing does miss a flag
     * standardizing all cdn links to start with /sites/ if on tenant
     * standardinzing all tag lings to start with /sites/ if on tenant
     * removing any extra // from both cdns and file links so you cant add extra slash in a url and slip by
     *
     * Does NOT find files without extensions (like images and also script files.)
     *
     * WARNING:  DO NOT add any CDNs to Global Warn or Approve unless you want it to apply to JS as well.
     */

    table.rows.push( createAboutRow('2023-03-09',"1.0.0.09","#7, #45, #55", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-03-09',"1.0.0.08","#20, #44, #48, #52, #53", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-03-07',"1.0.0.07","#30, #31, #33, #34, #37, #38, #39, #40, #41, #42", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-01-26',"1.0.0.06","#26, #27 - PowerPanel Query fixes", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    table.rows.push( createAboutRow('2023-01-25',"1.0.0.05","#5, #12, #13, #14, #15, #16, #17, #18, #19 - Sources", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('', "",                 "#2, #10, #11, #21, #22, #23, #24 - Auto detect source and others", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('', "",                 "", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-01-22',"1.0.0.04","Rename to PowerSearch, Refactor components", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-01-19',"1.0.0.02","Testing", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );
    table.rows.push( createAboutRow('2023-01-16',"1.0.0.01","Initial Build", bannerProps.showRepoLinks === true ? bannerProps.gitHubRepo : null ) );

    return { table: table };

}

