import React from 'react';
import PropTypes from 'prop-types';
import MaterialButtonBar from './MaterialButtonBar';
import { STATE_SELECTED } from './state';
import {
  toDisplayCutSpeed,
  toDisplayEngraveSpeed,
  toDisplayPower,
} from './lib/glowforgeUnits';

class MaterialViewer extends React.Component {
  render() {

    const {
      action,
      material,
    } = this.props;

    if (action !== STATE_SELECTED) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          {`Thickness Name ${material.thickName}`}
        </div>
        <div className="App-field">
          {`Material Name: ${material.name}`}
        </div>
        <div className="App-field">
          {`Thickness (mm) ${material.thickness}`}
        </div>

        <div className="App-field">
          <p>Cut Settings</p>
        </div>
        <div className="App-field">
          {`Speed ${toDisplayCutSpeed(material.cut.speed)} (${material.cut.speed})`}
        </div>
        <div className="App-field">
          {`Power ${toDisplayPower(material.cut.power)} (${material.cut.power})`}
        </div>
        <div className="App-field">
          {`Passes ${material.cut.passes}`}
        </div>
        <div className="App-field">
          {`Focal Offset ${material.cut.focalOffset}`}
        </div>

        <div className="App-field">
          <p>Score Settings</p>
        </div>
        {
          material.scores.map(score => {
            return (
              <React.Fragment>
                <div className="App-field">
                  {`Name ${score.name}`}
                </div>
                <div className="App-field">
                {`Speed ${toDisplayCutSpeed(score.speed)} (${score.speed})`}
                </div>
                <div className="App-field">
                  {`Power ${toDisplayPower(score.power)} (${score.power})`}
                </div>
                <div className="App-field">
                  {`Passes ${score.passes}`}
                </div>
                <div className="App-field" styles={{marginBottom: '10px'}}>
                  {`Focal Offset ${score.focalOffset}`}
                </div>
              </React.Fragment>
            );
          })
        }

        <div className="App-field">
          <p>Vector Engrave Settings</p>
        </div>
        {
          material.vectors.map(vector => {
            return (
              <React.Fragment>
                <div className="App-field">
                  {`Name ${vector.name}`}
                </div>
                <div className="App-field">
                  {`Speed ${toDisplayEngraveSpeed(vector.speed)} (${vector.speed})`}
                </div>
                <div className="App-field">
                {`Power ${toDisplayPower(vector.power)} (${vector.power})`}
                </div>
                <div className="App-field">
                  {`Passes ${vector.passes}`}
                </div>
                <div className="App-field">
                  {`Focal Offset ${vector.focalOffset}`}
                </div>
                <div className="App-field" styles={{marginBottom: '10px'}}>
                  {`Scan Gap ${vector.scanGap}`}
                </div>
              </React.Fragment>
            );
          })
        }

        <div className="App-field">
          <p>Bitmap Engrave Settings</p>
        </div>
        {
          material.bitmaps.map(bitmap => {
            return (
              <React.Fragment>
                <div className="App-field">
                  {`Name ${bitmap.name}`}
                </div>
                <div className="App-field">
                  {`Speed ${toDisplayEngraveSpeed(bitmap.speed)} (${bitmap.speed})`}
                </div>
                <div className="App-field">
                {`Power ${toDisplayPower(bitmap.power)} (${bitmap.power})`}
                </div>
                <div className="App-field">
                  {`Passes ${bitmap.passes}`}
                </div>
                <div className="App-field">
                  {`Focal Offset ${bitmap.focalOffset}`}
                </div>
                <div className="App-field" styles={{marginBottom: '10px'}}>
                  {`Scan Gap ${bitmap.scanGap}`}
                </div>
              </React.Fragment>
            );
          })
        }

        <MaterialButtonBar
          action={this.props.action}
          cancelMaterial={this.props.cancelMaterial}
        />
      </React.Fragment>
    );
  }
}

MaterialViewer.propTypes = {
  action: PropTypes.string.isRequired,
  cancelMaterial: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
}

export default MaterialViewer;
