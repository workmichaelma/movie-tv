import React, { useEffect, useState, useRef } from "react";
import { get, isArray, isEmpty, isObject, map } from "lodash";
import axios from "axios";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

import AV from "../components/player/av";
import Timer from "../components/player/timer";

const Wrapper = styled.View`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const BotBar = styled.View`
  overflow: hidden;
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlayerStatusWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Title = styled.Text`
  color: #717171;
  font-size: 11px;
`;

const SourcesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PlayerScreen = ({ navigation, route }) => {
  const [sources, setSources] = useState([]);
  const [currentSource, setCurrentSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(null);
  const videoRef = useRef();
  const { source, title, poster } = get(route, "params.movie", {});

  const fetchSources = async (source) => {
    setLoading(true);
    axios
      .get(
        `https://uzstrnzup5.execute-api.ap-east-1.amazonaws.com/prod/movie?source=${source}`
      )
      .then(({ data }) => {
        if (!isEmpty(data) && isArray(data)) {
          setSources(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSources(source);
  }, [source]);

  useEffect(() => {
    if (!isEmpty(sources)) {
      setCurrentSource(sources[0]);
      setPlaying(true);
    }
  }, [sources]);

  return (
    <Wrapper>
      <AV
        source={currentSource}
        poster={poster}
        playing={playing}
        setTimer={setTimer}
        ref={videoRef}
      />
      <BotBar>
        <PlayerStatusWrapper>
          <IconButton
            size={15}
            icon={playing ? "pause" : "play"}
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                setPlaying(!playing);
              }
            }}
            key="PlayPauseButtn"
          />
          <IconButton
            size={15}
            icon="rewind-10"
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                const { current, total } = timer;
                const to = current - 60000;
                if (to < total) {
                  videoRef.current.setMoviePosition(to);
                }
              }
            }}
          />
          <IconButton
            size={15}
            icon={"rewind"}
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                const { current } = timer;
                let to = current - 600000;
                if (to < 0) {
                  to = 0;
                }
                videoRef.current.setMoviePosition(to);
              }
            }}
          />
          {isObject(timer) && <Timer timer={timer} />}
          <IconButton
            size={15}
            icon={"fast-forward"}
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                const { current, total } = timer;
                const to = current + 60000;
                if (to < total) {
                  videoRef.current.setMoviePosition(to);
                }
              }
            }}
          />
          <IconButton
            size={15}
            icon={"fast-forward-10"}
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                const { current, total } = timer;
                const to = current + 600000;
                if (to < total) {
                  videoRef.current.setMoviePosition(to);
                }
              }
            }}
          />
        </PlayerStatusWrapper>
        <Title>現在播放: {title}</Title>
        <SourcesWrapper>
          {map(sources, (s, i) => {
            return (
              <IconButton
                key={i}
                size={15}
                icon={`numeric-${i + 1}-box-outline`}
                color={currentSource === s ? "#1e8effe8" : "#5f5f5f"}
                style={{
                  marginRight: 10,
                }}
                onPress={(e) => {
                  if (e.eventKeyAction === 0) {
                    setCurrentSource(s);
                  }
                }}
              />
            );
          })}
          <IconButton
            size={15}
            icon="close"
            color="#717171"
            onPress={(e) => {
              if (e.eventKeyAction === 0) {
                navigation.navigate("List");
              }
            }}
          />
        </SourcesWrapper>
      </BotBar>
    </Wrapper>
  );
};

export default PlayerScreen;
