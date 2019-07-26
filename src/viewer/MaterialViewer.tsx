import React from 'react';
import { PluginMaterial } from '../material/materialPlugin';
import { RemoveMaterial } from '../App';
import MaterialBitmapEngravesViewer from './MaterialBitmapEngravesViewer';
import MaterialCutViewer from './MaterialCutViewer';
import MaterialScoresViewer from './MaterialScoresViewer';
import MaterialVectorEngravesViewer from './MaterialVectorEngravesViewer';
import QrCodeViewer from './QrCodeViewer';
import IconDeleteForever from '../icons/IconDeleteForever';
import IconToggleOff from '../icons/IconToggleOff';
import IconToggleOn from '../icons/IconToggleOn';
import './MaterialViewer.css';

export type MaterialViewerProps = {
  toggleCloundSync: any;
  material: PluginMaterial;
  removeMaterial: RemoveMaterial;
}

export default function MaterialViewer(props: MaterialViewerProps) {
  const {
    material,
  } = props;

  const title = `${material.thickName} ${material.name}`;
  const syncToggle = (material.sync) ?
    <IconToggleOn
      className="viewer__syncOn"
      click={() => { props.toggleCloundSync(material); }}
      title="Cloud Sync Enabled"
    /> :
    <IconToggleOff
      className="viewer__syncOff"
      click={() => { props.toggleCloundSync(material); }}
      title="Clound Sync Disabled"
    />;

  return (
    <div className="viewer__column">
      <div className="viewer__name">
        <span>{title}</span>{syncToggle}
      </div>

      <div className="viewer__headerRow">
        <p className="viewer__label">General Settings</p>
        <p className="viewer__value">Display</p>
        <p className="viewer__glowforge">Raw</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Thickness Name</p>
        <p className="viewer__value">{material.thickName}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Material Name</p>
        <p className="viewer__value">{material.name}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Thickness (mm)</p>
        <p className="viewer__value">{material.thickness}</p>
      </div>

      <MaterialCutViewer cut={material.cut} />
      <MaterialScoresViewer scores={material.scores} />
      <MaterialVectorEngravesViewer vectors={material.vectors} />
      <MaterialBitmapEngravesViewer bitmaps={material.bitmaps} />

      <QrCodeViewer material={material} />

      <div className="viewer__destructiveActions">
        <IconDeleteForever
          buttonClassName="materialButtons__delete"
          className="materialButtons__delete__icon"
          click={() => props.removeMaterial(title)}
          height="18px"
          text="Delete Permanently"
          title="Delete Permanently"
          width="18px"
        />
      </div>
    </div>
  );
}
