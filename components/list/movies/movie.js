import React, { useState, createRef, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components/native";
import Btn from "../../btn";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  background: {
    width: wp("9%"),
    height: hp("23%"),
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("1%"),
    marginTop: hp("3.5%"),
    borderRadius: 15,
  },
  imgError: {
    backgroundColor: "#2d2d2d",
  },
  focusing: {
    width: wp("10%"),
    height: hp("25%"),
    marginTop: hp("2.5%"),
  },
});

const Wrapper = styled(Btn)`
  display: flex;
  align-items: center;
  position: relative;
`;

const ErrorLayer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.Text`
  text-align: center;
  font-size: 12px;
  padding: 1%;
  color: #9e9e9e;
`;

const GoodIcon = styled(Avatar.Icon)`
  margin: 0;
  position: absolute;
  padding: 0;
  top: ${(props) => (props.focusing ? "5px" : "10px")};
  left: ${(props) => (props.focusing ? "3px" : "2px")};
  background-color: #262626;
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
      <ImageBackground
        source={{ uri: poster }}
        style={{ ...styles.background, ...(focusing ? styles.focusing : {}) }}
        imageStyle={{
          borderRadius: 15,
          ...(imageError ? styles.imgError : {}),
        }}
        onError={() => {
          setImageError(true);
        }}
      >
        {imageError && (
          <ErrorLayer>
            <ErrorText>{title}</ErrorText>
          </ErrorLayer>
        )}
      </ImageBackground>
      {hot === 1 && (
        <GoodIcon
          icon="thumb-up"
          size={20}
          color="#1e8effe8"
          disabled
          focusing={focusing}
        />
      )}
    </Wrapper>
  );
};

export default Movie;
