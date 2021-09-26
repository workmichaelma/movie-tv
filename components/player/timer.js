import React from "react";
import prettyMs from "pretty-ms";
import { ProgressBar } from "react-native-paper";
import { isInteger } from "lodash";
import styled from "styled-components/native";

const toMs = (ms) => {
  try {
    return prettyMs(ms, { colonNotation: true, secondsDecimalDigits: 0 });
  } catch (err) {
    return "--";
  }
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Time = styled.Text`
  font-size: 10px;
  color: #717171;
`;

const Timer = ({ timer }) => {
  const { current, playable, total } = timer;
  const progress = isInteger(current) && isInteger(total) ? current / total : 0;
  return (
    <>
      <Time>{toMs(current)}</Time>
      <ProgressBar
        progress={parseFloat(progress.toFixed(2))}
        color="#dddddd"
        style={{ width: 80, height: 5, marginLeft: 10, marginRight: 10 }}
      />
      <Time>{toMs(total)}</Time>
      <Time>{`  |  已載入${toMs(playable)}`}</Time>
    </>
  );
};

export default Timer;
