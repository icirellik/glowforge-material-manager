import React from 'react';
import { PluginMaterial } from '../lib/materialRaw';
import { asFloat } from '../lib/utils';
import { EditorMode } from '../App';

type BaseSettingsProps = {
  action: EditorMode;
  material: PluginMaterial;
  storeLocalMaterial: React.FocusEventHandler<any>;
  updateMaterial: Function;
}

export default class MaterialSettings extends React.Component<BaseSettingsProps> {
  render() {
    return (
      <>
        <div className="form-header">
          <p>Material Settings</p>
        </div>
        <div className="form-field">
          <label>Thickness Name *</label>
          <input
            disabled={this.props.action === 'EDIT'}
            type="text"
            value={this.props.material.thickName}
            onChange={(event) => {
              this.props.updateMaterial('thickName', event.target.value);
            }}
            onBlur={this.props.storeLocalMaterial}
          />
        </div>
        <div className="form-field">
          <label>Material Name *</label>
          <input
            disabled={this.props.action === 'EDIT'}
            type="text"
            value={this.props.material.name}
            onChange={(event) => {
              this.props.updateMaterial('name', event.target.value);
            }}
            onBlur={this.props.storeLocalMaterial}
          />
        </div>
        <div className="form-field">
          <label>Thickness (mm) *</label>
          <input
            type="number"
            value={this.props.material.thickness}
            onChange={(event) => {
              this.props.updateMaterial('thickness', asFloat(event.target.value));
            }}
            onBlur={this.props.storeLocalMaterial}
          />
        </div>
      </>
    );
  }
}
