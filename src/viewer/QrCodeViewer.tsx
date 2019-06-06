import React from 'react';
import { PluginMaterial } from '../lib/materialRaw';
import { sha1 } from '../lib/utils';
import { qrcodeAsDataUri, qrcodeAsSvg } from '../lib/qrCode';
import { toTinyMaterial } from '../lib/material';

export interface QrCodeViewerProps {
  material: PluginMaterial;
}

export interface QrCodeViewerState {
  materialIdImageUri: string;
  materialIdSvgData: string;
  materialImageUri: string;
  materialSvgData: string;
}

export default class QrCodeViewer extends React.Component<QrCodeViewerProps, QrCodeViewerState> {
  constructor(props: QrCodeViewerProps) {
    super(props);

    this.state = {
      materialIdImageUri: '',
      materialIdSvgData: '',
      materialImageUri: '',
      materialSvgData: '',
    };
  }

  async componentDidUpdate() {
    const  { thickName, name } = this.props.material;
    const title = `${thickName} ${name}`;
    const hash = await sha1(title);
    const id = hash.substring(0, 7);

    const materialId = `Custom:${id}`;
    const materialData = JSON.stringify(toTinyMaterial(this.props.material));

    const materialIdImageUri = await qrcodeAsDataUri(materialId);
    const materialIdSvgData = await qrcodeAsSvg(materialId);
    const materialImageUri = await qrcodeAsDataUri(`${materialId}|${materialData}`);
    const materialSvgData = await qrcodeAsSvg(`${materialId}|${materialData}`);

    this.setState({
      materialIdImageUri,
      materialIdSvgData,
      materialImageUri,
      materialSvgData,
    });
  }

  render() {
    const  { thickName, name } = this.props.material;
    const title = `${thickName} ${name}`;
    return (
      <>
        <div className="App-flexSectionHeader">
          <p>Scannable QR Code</p>
        </div>
        <img style={{
          border: '1px solid #000',
          width: 'fit-content',
        }} src={this.state.materialIdImageUri} alt="qrcode" />
        <div className="App-flexSectionHeader">
          <p>Download SVG</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
        }}>
          <a
            download={`${title}.svg`}
            href={`data:image/svg+xml;base64,${window.btoa(this.state.materialIdSvgData!)}`}
            target="_blank"
            rel="noopener noreferrer"
          >Material Id</a>
          <a
            download={`${title}.svg`}
            href={`data:image/svg+xml;base64,${window.btoa(this.state.materialSvgData!)}`}
            target="_blank"
            rel="noopener noreferrer"
          >Material Id + Settings</a>
        </div>
      </>
    );
  };
}
