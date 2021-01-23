import React from 'react';
import { PluginMaterial } from '../material/materialPlugin';
import { sha1 } from '../lib/crypto';
import { qrcodeAsDataUri, qrcodeAsSvg } from '../lib/qrCode';
import { toTinyMaterial } from '../material/material';
import './MaterialViewer.css';

interface QrCodeViewerProps {
  material: PluginMaterial;
}

interface QrCodeViewerState {
  title: string;
  materialIdImageUri: string;
  materialIdSvgData: string;
  materialImageUri: string;
  materialSvgData: string;
}

export default class QrCodeViewer extends React.Component<QrCodeViewerProps, QrCodeViewerState> {
  constructor(props: QrCodeViewerProps) {
    super(props);

    this.state = {
      title: '',
      materialIdImageUri: '',
      materialIdSvgData: '',
      materialImageUri: '',
      materialSvgData: '',
    };
  }

  shouldComponentUpdate(nextProps: QrCodeViewerProps, nextState: QrCodeViewerState) {
    const { thickName, name } = nextProps.material;
    const nextTitle = `${thickName} ${name}`;
    if (nextTitle === this.state.title) {
      return false;
    }
    return true;
  }

  async componentDidMount() {
    const { thickName, name } = this.props.material;
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
      title,
      materialIdImageUri,
      materialIdSvgData,
      materialImageUri,
      materialSvgData,
    });
  }

  async componentDidUpdate() {
    const { thickName, name } = this.props.material;
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
      title,
      materialIdImageUri,
      materialIdSvgData,
      materialImageUri,
      materialSvgData,
    });
  }

  render() {
    const { thickName, name } = this.props.material;
    const title = `${thickName} ${name}`;
    return (
      <>
        <div className="viewer__headerRow">
          <p>Scannable QR Code</p>
        </div>
        <img
          style={{
            border: '1px solid #000',
            width: 'fit-content',
          }}
          src={this.state.materialIdImageUri}
          alt="qrcode"
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          marginTop: '20px',
        }}
        >
          <a
            download={`${title}.svg`}
            href={`data:image/svg+xml;base64,${window.btoa(this.state.materialIdSvgData!)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Material Id
          </a>
          <a
            download={`${title}.svg`}
            href={`data:image/svg+xml;base64,${window.btoa(this.state.materialSvgData!)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Material Id + Settings
          </a>
        </div>
      </>
    );
  }
}
