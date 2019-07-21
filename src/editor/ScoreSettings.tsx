import React from 'react';
import ScoreSetting from './ScoreSetting';
import IconPlus from '../icons/IconPlus';
import { PluginScoreSetting } from '../material/materialPlugin';

// Score Methods
export type AddScore = () => void;
export type RemoveScore = (index: number) => void;
export type UpdateScore =
  <K extends keyof PluginScoreSetting>(index: number,
    prop: K, value: PluginScoreSetting[K]) => void;

type ScoreSettingsProps = {
  addScore: AddScore;
  propValidation?: {[key: string]: boolean | null};
  removeScore: RemoveScore;
  scores: PluginScoreSetting[];
  saveTemporaryState: () => void;
  updateScore: UpdateScore;
  validationHandler: (id: string, isValid: boolean | null) => void;
}

export default function ScoreSettings(props: ScoreSettingsProps) {
  return (
    <>
      <div className="form-header">
        <p>Score Settings</p>
        <div>
          <IconPlus
            className="icon-button-add"
            click={props.addScore}
            fill="#001f23"
            height="18px"
            title="Add Score"
            width="18px"
          />
        </div>
      </div>
      {
        props.scores.map((score, index) => {
          return (
            <ScoreSetting
              index={index}
              propValidation={props.propValidation}
              score={score}
              saveTemporaryState={props.saveTemporaryState}
              removeScore={props.removeScore}
              updateScore={props.updateScore}
              validationHandler={props.validationHandler}
            />
          );
        })
      }
    </>
  )
}
