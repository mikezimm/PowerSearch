import * as React from 'react';
import styles from '../PowerPanel.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ISearchTip, ISearchTipKey } from './ISearchTip';

export const SearchTips: ISearchTip[] = [
  { keys: [ 'author', '*' ],
    tip: `Searching multiple values on a single property (like author), is like using 'OR'`, 
    heading: `#using-multiple-property-restrictions-within-a-kql-query`
  },
  { keys: [ 'author', '*' ],
    tip: `Searching multiple values on a different properties (like author and filetype), is like using 'AND'`, 
    heading: `#using-multiple-property-restrictions-within-a-kql-query`
  },
  { keys: [ '*' ],
    tip: <span>To EXCLUDE something from results, you can use either <b>{`${'NOT'}`}</b> or <b>{`${'-'}`}</b></span>,
    heading: `#inclusion-and-exclusion-operators`
  },
  { keys: [ '*' ],
    tip: <span>To REQUIRE something from results, you can use either <b>{`${'AND'}`}</b> or <b>{`${'+'}`}</b></span>,
    heading: `#inclusion-and-exclusion-operators`
  },
  { keys: [ '*' ],
    tip: <span>You can filter by time using special words like <b>{`${'LastModifiedTime="this month"'}`}</b> or <b>{`${'LastModifiedTime="last year"'}`}</b></span>,
    heading: `#relevant-date-intervals-supported-by-kql`
  },
  { keys: [ '*' ],
    tip: <span>You can filter specific dates using ISO 8601-compatible format in UTC time: <b>{`${'YYYY-MM-DD'}`}</b></span>,
    heading: `#date-or-time-values-for-properties`
  },
  { keys: [ '*' ],
    tip: <span>You can use wild-card for partial word search: <b>{`${'author:Shakesp*'}`}</b> will find all items that were created by someone with a name starting with <b>{`${'Shakesp'}`}</b></span>,
    heading: `#property-values-in-the-full-text-index`
  },
  { keys: [ '*' ],
    tip: <span>You can search phrases by surrounding the text wtih double quotes: <b>{`${'"Find this entire phrase"'}`}</b></span>,
    heading: `#property-values-in-the-full-text-index`
  },
];

export const KQLDocLink: string = `https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference`;
export const KQLDocLinkInt: string = `/sites/SolutionTesting/ALVSearch/SitePages/KQL-Docs.aspx`;

export function getRandomTipElement( key: ISearchTipKey ) : JSX.Element {
  const possible: ISearchTip[] = [];
  SearchTips.map( tip => {
    if (tip.keys.indexOf( key ) > -1 ) possible.push ( tip );
  });
  const item = possible[Math.floor(Math.random()*possible.length)];

  return <div className={ styles.searchTip }>
    <div>{ item.tip }</div>
    <div className={ styles.links } onClick={ () => { window.open(`${KQLDocLink}${item.heading}`, '_blank' ) } }>{ `Docs` }</div>
  </div>
}


export const KQLDocsHeadings: ISearchTip[] = [
  { keys: [ '*' ],
    tip: `Elements of a KQL query`,
    detail: `Consists of free text-keywords and property restrictions`,
    heading: `#elements-of-a-kql-query`
  },
  { keys: [ 'keywords', '*' ],
    tip: `Constructing free-text queries using KQL`,
    detail: ``,
    heading: `#constructing-free-text-queries-using-kql`
  },
  { keys: [ 'keywords', '*' ],
    tip: `Using words in the free-text KQL query`,
    detail: ``,
    heading: `#using-words-in-the-free-text-kql-query`
  },
  { keys: [ 'keywords', '*' ],
    tip: `Using phrases in the free-text KQL query`,
    detail: ``,
    heading: `#using-phrases-in-the-free-text-kql-query`
  },
  { keys: [ 'author', '*' ],
    tip: `Property restriction queries in KQL`,
    detail: ``,
    heading: `#property-restriction-queries-in-kql`
  },
  { keys: [ 'filetype', 'filename', '*' ],
    tip: `Specifying property restrictions`,
    detail: ``,
    heading: `#specifying-property-restrictions`
  },
  { keys: [ '*' ],
    tip: `Specifying property names for property restrictions`,
    detail: ``,
    heading: `#specifying-property-names-for-property-restrictions`
  },
  { keys: [ '*' ],
    tip: `Property operators that are supported in property restrictions`,
    detail: ``,
    heading: `#property-operators-that-are-supported-in-property-restrictions`
  },
  { keys: [ 'author', '*' ],
    tip: `Text property values`,
    detail: ``,
    heading: `#text-property-values`
  },
  { keys: [ '*' ],
    tip: `Numerical values for properties`,
    detail: ``,
    heading: `#numerical-values-for-properties`
  },
  { keys: [ 'time', 'date1', '*' ],
    tip: `Date or time values for properties`,
    detail: ``,
    heading: `#date-or-time-values-for-properties`
  },
  { keys: [ 'time', 'date1', '*' ],
    tip: `Relevant date intervals supported by KQL`,
    detail: ``,
    heading: `#relevant-date-intervals-supported-by-kql`
  },
  { keys: [ 'filetype', 'author', '*' ],
    tip: `Using multiple property restrictions within a KQL query`,
    detail: ``,
    heading: `#using-multiple-property-restrictions-within-a-kql-query`
  },
  { keys: [ 'author', '*' ],
    tip: `Grouping property restrictions within a KQL query`,
    detail: ``,
    heading: `#grouping-property-restrictions-within-a-kql-query`
  },
  { keys: [ '*' ],
    tip: `KQL operators for complex queries`,
    detail: ``,
    heading: `#kql-operators-for-complex-queries`
  },
  { keys: [ '*' ],
    tip: `Boolean operators`,
    detail: ``,
    heading: `#boolean-operators`
  },
  { keys: [ '*' ],
    tip: `NEAR operator`,
    detail: ``,
    heading: `#near-operator`
  },
  { keys: [ '*' ],
    tip: `ONEAR operator`,
    detail: ``,
    heading: `#onear-operator`
  },
  { keys: [ '*' ],
    tip: `Synonym operators`,
    detail: ``,
    heading: `#synonym-operators`
  },
  { keys: [ '*' ],
    tip: `Wildcard operator`,
    detail: ``,
    heading: `#wildcard-operator`
  },
  { keys: [ '*' ],
    tip: `Inclusion and exclusion operators`,
    detail: ``,
    heading: `#inclusion-and-exclusion-operators`
  },
  { keys: [ '*' ],
    tip: `Dynamic ranking operator`,
    detail: ``,
    heading: `#dynamic-ranking-operator`
  },
  { keys: [ '*' ],
    tip: `Parenthesis`,
    detail: ``,
    heading: `#parenthesis`
  },
  { keys: [ 'filetype', 'filename', 'keywords', '*' ],
    tip: `Autoliv Examples`,
    detail: ``,
    heading: `#autoliv-examples`,
},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDocsHeadings( docs: boolean, key: ISearchTipKey, setIframe: any, active: number, resetKey: any ) : JSX.Element {

  const rows: JSX.Element[] = [];
  KQLDocsHeadings.map( ( heading, index ) => {
    if ( docs === true && key === null || heading.keys.indexOf( key ) > -1 || index === active ) {
      rows.push(
        <div className={ `${styles.typesTipsLabel} ${active === index ? styles.active : ''}` } 
          >
          <Icon onClick={ () => setIframe( '', -1 )} iconName={ active === index ? "Hide2" : '' } />
          <span onClick={ () => setIframe( heading.heading, index )} title={ heading.detail }>{ heading.tip }</span></div>
      )
    }
  });

  const keyText = key ? <span>Filtering for <span className={ styles.keyText }>{key}</span></span> : 'Click for help';
  const clearIcon = <Icon iconName={ key ? 'ClearFilter' : 'Search' } onClick={ () => resetKey() } />;
  const result = <div className={ styles.headingTips } >
    <div className={ styles.headingsHeading }>{ keyText} { clearIcon }</div>
    { rows }
  </div>
  return result;
}