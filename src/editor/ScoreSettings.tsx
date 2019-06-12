import React from 'react';
import ScoreSetting from './ScoreSetting';
import IconPlus from '../icons/IconPlus';
import { AddScore } from '../App';
import { PluginScoreSetting } from '../lib/materialRaw';

type ScoreSettingsProps = {
  addScore: AddScore;
  removeScore: Function;
  scores: PluginScoreSetting[];
  storeLocalMaterial: Function;
  updateScore: Function;
}

export default function ScoreSettings(props: ScoreSettingsProps) {
  return (
    <>
      <div className="form-header">
        <p>Score Settings</p>
        <div>
          <IconPlus
            click={props.addScore}
            fill="#001f23"
            height="18px"
            width="18px"
          />
        </div>
      </div>
      {
        props.scores.map((score, index) => {
          return (
            <ScoreSetting
              index={index}
              score={score}
              storeLocalMaterial={props.storeLocalMaterial}
              removeScore={props.removeScore}
              updateScore={props.updateScore}
            />
          );
        })
      }
    </>
  )
}
