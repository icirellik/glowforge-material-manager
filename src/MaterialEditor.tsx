import React from 'react';
import BitmapEngrave from './tools/BitmapEngrave';
import Cut from './tools/Cut';
import MaterialButtonBar from './MaterialButtonBar';
import Score from './tools/Score';
import VectorEngrave from './tools/VectorEngrave';
import {
  storeTempMaterial,
} from './lib/chromeWrappers';
import {
  IconPlus,
} from './Icons';
import {
  asFloat,
} from './lib/utils';
import './MaterialEditor.css';
import {
  AddBitmapEngrave,
  AddMaterial,
  AddScore,
  AddVectorEngrave,
  EditMaterial,
  ModeCancel,
  UpdateBitmapEngrave,
  UpdateCut,
  UpdateMaterial,
  UpdateScore,
  UpdateVectorEngrave,
  EditorMode,
} from './App';
import { RawMaterial } from './lib/material';

interface MaterialEditorProps {
  action: EditorMode;
  addBitmapEngrave: AddBitmapEngrave;
  addMaterial: AddMaterial;
  addScore: AddScore;
  addVectorEngrave: AddVectorEngrave;
  cancelMaterial: ModeCancel;
  editMaterial: EditMaterial;
  material: RawMaterial;
  updateBitmapEngrave: UpdateBitmapEngrave;
  updateCut: UpdateCut;
  updateMaterial: UpdateMaterial;
  updateScore: UpdateScore;
  updateVectorEngrave: UpdateVectorEngrave;
}

class MaterialEditor extends React.Component<MaterialEditorProps> {

  storeLocalMaterial() {
    if (this.props.action === 'ADD') {
      storeTempMaterial(this.props.material);
    }
  }

  render() {
    const {
      action,
      material,
    } = this.props;

    if (action !== 'ADD' && action !== 'EDIT') {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            disabled={action === 'EDIT'}
            type="text"
            value={material.thickName}
            onChange={(event) => {
              this.props.updateMaterial('thickName', event.target.value);
            }}
            onBlur={() => this.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Material Name</label>
          <input
            disabled={action === 'EDIT'}
            type="text"
            value={material.name}
            onChange={(event) => {
              this.props.updateMaterial('name', event.target.value);
            }}
            onBlur={() => this.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="number"
            value={material.thickness}
            onChange={(event) => {
              this.props.updateMaterial('thickness', asFloat(event.target.value));
            }}
            onBlur={() => this.storeLocalMaterial()}
          />
        </div>
        <div className="MaterialEditor-section">
          <p>Cut Settings</p>
        </div>
        <Cut
          cut={material.cut}
          storeLocalMaterial={this.storeLocalMaterial.bind(this)}
          updateCut={this.props.updateCut}
        />
        <div className="MaterialEditor-section">
          <p>Score Settings</p>
        </div>
        {
          material.scores.map((score, index) => {
            return (
              <Score
                id={index}
                score={score}
                storeLocalMaterial={this.storeLocalMaterial.bind(this)}
                updateScore={this.props.updateScore}
              />
            );
          })
        }
        <div className="MaterialEditor-buttonBar">
          <IconPlus click={this.props.addScore} />
        </div>
        <div className="MaterialEditor-section">
          <p>Vector Engrave Settings</p>
        </div>
        {
          material.vectors.map((vector, index) => {
            return (
              <VectorEngrave
                id={index}
                storeLocalMaterial={this.storeLocalMaterial.bind(this)}
                updateVectorEngrave={this.props.updateVectorEngrave}
                vector={vector}
              />
            );
          })
        }
        <div className="MaterialEditor-buttonBar">
          <IconPlus click={this.props.addVectorEngrave} />
        </div>
        <div className="MaterialEditor-section">
          <p>Bitmap Engrave Settings</p>
        </div>
        {
          material.bitmaps.map((bitmap, index) => {
            return (
              <BitmapEngrave
                bitmap={bitmap}
                id={index}
                storeLocalMaterial={this.storeLocalMaterial.bind(this)}
                updateBitmapEngrave={this.props.updateBitmapEngrave}
              />
            );
          })
        }
        <div className="MaterialEditor-buttonBar">
          <IconPlus click={this.props.addBitmapEngrave} />
        </div>
        <MaterialButtonBar
          editorMode={this.props.action}
          addMaterial={this.props.addMaterial}
          cancelMaterial={this.props.cancelMaterial}
          editMaterial={this.props.editMaterial}
          title={`${this.props.material.thickName} ${this.props.material.name}`}
        />
      </React.Fragment>
    );
  }
}

export default MaterialEditor;
