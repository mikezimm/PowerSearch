
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
  show: boolean;
  refreshId: string;
  content: string | JSX.Element;
  styleProps?: IFadePanelStyleProps;
  fadeSlider?: boolean; // Could be used to be able to raise and lower fade
  fadeSliderLoc?: IFadeSliderPos; // Could be used to indicate where to put fadeSlider
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _hideBack( ): void; // Callback when panel is closed via this component
}

export type IShowBack = 0 | 1 | 2;  // 2 is visible, 1 is fading away animation, 0 is faded away

const _backStyle = [
  undefined,
  'hidePane',
  'showPane',
];

const FadePanel: React.FC<IFadePanelProps> = ( props ) => {

  const { content, show, refreshId } = props;
  // const [ showPane, setShowPane ] = useState<boolean>( props.show );
  const [ showBack, setShowBack ] = useState<IShowBack>( show === true ? 2 : 0 );

  const hidePanel = ( ) : void => {

    setShowBack( 1 );

    // Delay creds to:  https://stackoverflow.com/a/42090488
    setTimeout(function(){
      props._hideBack();  // Required to close #30
      setShowBack( 0 );
      console.log('newBack:',  0  );
    }.bind(this), 1000);
  }

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( show === false && showBack === 2 ) {
      hidePanel();
      return () => {
        // this now gets called when the component unmounts
      };
    } else if ( show === true && showBack !== 2 ) {
      setShowBack( 2 );
      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ show, refreshId ] );

  const showClass: string = show === true && showBack === 2 ? 'showPane' : 'hidePane';
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