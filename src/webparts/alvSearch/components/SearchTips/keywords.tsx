import * as React from 'react';
import styles from '../AlvSearch.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CommonFileTypes: any = {
  Excel: [ 'xlsx', 'xlsm', 'xls' ],
  Word: [ 'docx', 'doc' ],
  PowerPoint:  [ 'pptx', 'ppt' ],
  Text: [ 'txt', 'csv' ],
  Code: [ 'html', 'js', 'css', 'ts' ],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getKeywordsTable( className: string, setIframe: any ) : JSX.Element {

  const result = 
  <div className={ `${styles.typesTips} ${className}` }>
      <div className={ styles.typesTipsLabel }>wildcard: *</div>
      <ul style={{ listStyleType: 'none' }}>
        <li>{`"passenger air*"`} will find items with phrase: passenger airbag</li>
      </ul>
    </div>
  return result;
}