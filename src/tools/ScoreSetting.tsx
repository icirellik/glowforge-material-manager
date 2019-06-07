import React from 'react';
import {
  asFloat,
  asInteger,
  precisionRound,
} from '../lib/utils';
import {
  toDisplayCutSpeed,
  toDisplayPower,
  toRealCutSpeed,
  toRealPower,
} from '../lib/glowforgeUnits';
import { PluginScoreSetting } from '../lib/materialRaw';
import IconMinus from '../icons/IconMinus';

interface ScoreSettingProps {
  index: number;
  removeScore: Function;
  score: PluginScoreSetting;
  storeLocalMaterial: Function;
  updateScore: Function;
}

export default class ScoreSetting extends React.Component<ScoreSettingProps> {
  constructor(props: ScoreSettingProps) {
    super(props);
    if (props.score.power === 100) {
      this.setState({
        maxPower: true,
      });
    }
  }

  state = {
    maxPower: false,
  }

  render() {
    const { index: id, score } = this.props;
    return (
      <>
        <div style={{display: 'flex', marginBottom: '8px'}}>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            height: '18px',
            marginRight: '4px',
          }}>
            {`Score ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeScore(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <div className="form-field" style={(id !== 0) ? { marginTop: '20px' } : undefined}>
          <label>Name *</label>
          <input
            type="text"
            value={score.name}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              name: event.target.value,
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Speed *</label>
          <input
            type="number"
            value={toDisplayCutSpeed(score.speed)}
            min="100"
            max="500"
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              speed: toRealCutSpeed(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <div className="form-field-right">
            <label>Power *</label>
            <label className="label">Max Power</label>
            <input
              type="checkbox"
              value={this.state.maxPower? 1 : 0}
              onChange={() => {
                const nextMaxPower = !this.state.maxPower;
                this.props.updateScore(id, {
                  ...score,
                  power: (nextMaxPower) ? 100 : 99,
                });
                this.setState({
                  maxPower: nextMaxPower,
                });
              }}
              onBlur={() => this.props.storeLocalMaterial()}
            />
          </div>
          <input
            type="number"
            disabled={this.state.maxPower}
            value={toDisplayPower(score.power)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              power: toRealPower(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Passes</label>
          <input
            type="number"
            value={score.passes}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              passes: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={score.focalOffset ? score.focalOffset : undefined}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
      </>
    );
  }
}
