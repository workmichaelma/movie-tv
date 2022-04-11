import React, { useState, createRef, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components/native";
import Btn from "../../btn";

const Card = styled.ImageBackground`
  width: 100%;
  max-height: 100%;
  aspect-ratio: 0.6;
  resize-mode: cover;
  position: relative;
`;

const Wrapper = styled(Btn)`
  display: flex;
  align-items: center;
  position: relative;
`;

const ErrorLayer = styled.ImageBackground`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  ${(props) =>
    props.focusing
      ? `
    border: 3px;
    border-color: #1e8effe8;
    border-radius: 6px;
  `
      : ""}
`;

const FocusingLayer = styled.View`
  width: 100%;
  height: 100%;
  border: 3px;
  border-color: #1e8effe8;
  border-radius: 6px;
`;

const ErrorText = styled.Text`
  text-align: center;
  font-size: 10px;
  padding: 5px;
  color: #9e9e9e;
`;

const GoodIcon = styled(Avatar.Icon)`
  margin: 0;
  position: absolute;
  padding: 0;
  top: -5px;
  left: -5px;
  background-color: #202020;
`;

const Movie = ({ movie, index, focusing, setFocusing, toPlayer }) => {
  const { date, poster, tags, title, hot } = movie || {};
  const [imageError, setImageError] = useState(false);

  const ref = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (index === 0 && ref.current) {
        ref.current.setNativeProps({ hasTVPreferredFocus: true });
        ref.current.focus();
      }
    }, 100);
  }, []);

  return (
    <Wrapper
      touchableHandleActivePressIn
      onFocus={() => {
        setFocusing({
          type: "movie",
          index,
          movie,
        });
      }}
      ref={ref}
      onPress={() => {
        toPlayer(movie);
      }}
    >
      <Card
        source={{ uri: poster }}
        imageStyle={{
          borderRadius: 6,
        }}
        onError={() => {
          setImageError(true);
        }}
      >
        {imageError && title ? (
          <ErrorLayer focusing={focusing}>
            <ErrorText>{title}</ErrorText>
          </ErrorLayer>
        ) : null}
        {!imageError && focusing ? <FocusingLayer /> : null}
      </Card>
      {hot === 1 ? (
        <GoodIcon icon="thumb-up" size={16} color="#1e8effe8" disabled />
      ) : null}
    </Wrapper>
  );
};

export default Movie;
