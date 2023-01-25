import { IPowerSearchProps } from "../IPowerSearchProps";
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
    buttons.push( MainPartsButton );
  }
  if ( mainButtons.projects.enable === true ) {
    MainProjectsButton.detect = mainButtons.projects.detect;
    buttons.push( MainProjectsButton );
  }
  if ( mainButtons.standards.enable === true ) {
    MainStandardsButton.detect = mainButtons.standards.detect;
    buttons.push( MainStandardsButton );
  }
  if ( mainButtons.alc.enable === true ) {
    buttons.push( MainALCButton );
  }
  if ( mainButtons.tests.enable === true ) {
    buttons.push( MainTestsButton );
  }
  if ( mainButtons.changes.enable === true ) {
    buttons.push( MainChangesButton );
  }
  if ( mainButtons.source1.enable === true ) {
    buttons.push( MainSource1Button );
  }
  if ( mainButtons.source2.enable === true ) {
    buttons.push( MainSource2Button );
  }

  return buttons;

}