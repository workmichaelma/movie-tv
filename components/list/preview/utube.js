import React, { useState, useCallback, useMemo } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Btn from "../../btn";
import styled from "styled-components/native";

const Header = styled.Text`
  font-size: 20px;
  color: white;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1%;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 70%;
  background: red;
  display: flex;
  align-items: center;
`;

const Player = styled.View`
  width: 100%;
  flex: 1 0 auto;
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Utube = ({ url, setFocusing, focusing }) => {
  const [playing, setPlaying] = useState(false);

  // const isFocusing = useMemo(() => {
  //   return focusing.type === "preview";
  // });

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      // Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const INJECTEDJAVASCRIPT = `
    document.querySelectorAll('a').forEach(e => { e.remove() });
    document.querySelectorAll('button').forEach(e => { e.remove() });
  `;
  return (
    <Wrapper>
      <Header>預告片</Header>
      <Player focusable={false}>
        <YoutubePlayer
          focusable={false}
          height={300}
          width={400}
          play={playing}
          disablekb={true}
          controls={0}
          videoId={"l9TgBRMP64o"}
          onChangeState={onStateChange}
          initialPlayerParams={{
            controls: false,
            preventFullScreen: true,
          }}
          webViewProps={{
            injectJavaScript:
              "document.querySelectorAll('button').forEach(e => { e.remove() });",
            allowsFullscreenVideo: false,
          }}
        />
        {/* <WebView
          style={{ width: wp("40%"), height: hp("40%") }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          javaScriptEnabled={true}
          source={{
            uri: "https://www.youtube.com/embed/l9TgBRMP64o?controls=0&disablekb=1&modestbranding=1&enablejsapi=1&fs=1&iv_load_policy=3&rel=0",
          }}
        /> */}
      </Player>
      {/* <Btn
        onPress={togglePlaying}
        onFocus={() => {
          setFocusing({
            type: "preview",
          });
        }}
        stlye={{ background: isFocusing ? "yellow" : "orange" }}
      >
        <Text>{playing ? "pause" : "play"}</Text>
      </Btn> */}
    </Wrapper>
  );
};

export default Utube;
