import React from 'react';
import ScoreSetting from './ScoreSetting';
import { IconPlus } from '../icons/IconPlus';
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
  const {
    addScore,
    propValidation,
    removeScore,
    scores,
    saveTemporaryState,
    updateScore,
    validationHandler,
  } = props;
  return (
    <>
      <div className="form-header">
        <p>Score Settings</p>
        <div>
          <IconPlus
            className="icon-button-add"
            click={addScore}
            fill="#001f23"
            height="18px"
            title="Add Score"
            width="18px"
          />
        </div>
      </div>
      {
        scores.map((score, index) => (
          <ScoreSetting
            index={index}
            key={score.name}
            propValidation={propValidation}
            removeScore={removeScore}
            saveTemporaryState={saveTemporaryState}
            score={score}
            updateScore={updateScore}
            validationHandler={validationHandler}
          />
        ))
      }
    </>
  );
}
