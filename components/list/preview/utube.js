import React from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";

import Btn from "../../btn";
import styled from "styled-components/native";

const Wrapper = styled(Btn)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Player = styled.View`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NullText = styled.Text`
  color: #9e9e9e;
`;

const Utube = ({ videoId, setFocusing, focusing }) => {
  console.log({ videoId });
  return (
    <Wrapper
      onFocus={() => {
        setFocusing({});
      }}
    >
      <Player focusable={false}>
        {videoId ? (
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            mediaPlaybackRequiresUserAction={true}
            style={{ width: 400, height: 300 }}
            source={{
              uri: `https://movie.tiiny.site?videoId=${videoId}`,
            }}
          />
        ) : videoId === null ? (
          <NullText>沒有預告片</NullText>
        ) : (
          <ActivityIndicator color="#c4c4c4" />
        )}
      </Player>
    </Wrapper>
  );
};

export default Utube;
