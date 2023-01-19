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

export function getFileNameTable( className: string ) : JSX.Element {

  const result = 
  <div className={ `${styles.typesTips} ${className}` }>{
    Object.keys( CommonFileTypes ).map ( key => {
      return (
        <div key={ key }>
          <div className={ styles.typesTipsLabel }>{ key }</div>
          <div>
            { CommonFileTypes[ key ].map ( ( fileType: string ) => {
              return <div key={ fileType} >{ fileType }</div>
            })
            }
          </div>
        </div>
      )
    })
  } </div>
  return result;
}