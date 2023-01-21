
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

// Require ('@mikezimm/fps-styles/dist/fadeCarouselStyles.css');
require ('./FadePanel.css');

//Use this to add more console.logs for this component
// const consolePrefix: string = 'fpsconsole: FadePanelComponent';

export interface IFadePanelWPProps {
  constainerStyles?: string; // {{ width: '650px', height: '450px' }}
  constainerClass?: string; // css class name from parent web part
}

export interface IFadePanelStyleProps {
  constainerStyles?: React.CSSProperties; // {{ width: '650px', height: '450px' }}
  constainerClass?: string; // css class name from parent web part
}

export type  IFadeSliderPos = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'none';

export interface IFadePanelProps {
  showPanel: boolean;
  content: string | JSX.Element;
  styleProps?: IFadePanelStyleProps;
  fadeSlider?: boolean; // Could be used to be able to raise and lower fade
  fadeSliderLoc?: IFadeSliderPos; // Could be used to indicate where to put fadeSlider

}

export type IShowBack = 0 | 1 | 2;  // 2 is visible, 1 is fading away animation, 0 is faded away

const _backStyle = [
  undefined,
  'hidePane',
  'showPane',
];

const FadePanel: React.FC<IFadePanelProps> = ( props ) => {

  const { content, showPanel } = props;
  // const [ showPane, setShowPane ] = useState<boolean>( props.showPanel );
  const [ showBack, setShowBack ] = useState<IShowBack>( showPanel === true ? 2 : 0 );

  const hidePanel = ( ) : void => {

    setShowBack( 1 );

    // Delay creds to:  https://stackoverflow.com/a/42090488
    setTimeout(function(){
      setShowBack( 0 );
      console.log('newBack:',  0  );
    }.bind(this), 1000);
  }

  const showClass: string = showPanel === true && showBack === 2 ? 'showPane' : 'hidePane';
  const indexClass: string = showBack !==0 ? 'maxZindex' : 'minZindex';

  const constainerClass = props.styleProps ? props.styleProps.constainerClass : '';
  const constainerStyles = props.styleProps ? props.styleProps.constainerStyles : null;

  const panel = <div className={ `fpsFadePanel ${showClass} ${indexClass} ${_backStyle[ showBack ]} ${constainerClass}` } style={ constainerStyles }>
    <div>
      <Icon className={ 'fadePaneCloseIcon' } iconName='ChromeClose' onClick={ () => hidePanel( ) }/>
      { content }
    </div>
  </div>;

  return ( panel );

}

export default FadePanel;