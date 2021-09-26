import React from "react";
import { View, Text, ImageBackground } from "react-native";
// import Utube from "./utube";

import styled from "styled-components/native";

const List = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Left = styled.View`
  width: 30%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1%;
  flex: 1 0 30%;
`;

const Date = styled.Text`
  font-size: 8px;
  margin-top: 5%;
  color: #9e9e9e;
`;

const Title = styled.Text`
  font-size: 11px;
  margin-top: 1%;
  margin-bottom: 5%;
  color: #9e9e9e;
  font-weight: bold;
`;

const Tags = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
`;

const Chip = styled.Text`
  border-radius: 10px;
  padding: 5px;
  background: #2d2d2d;
  color: #9e9e9e;
  font-size: 9px;
  margin-left: 3px;
  margin-bottom: 3px;
  margin-right: 3px;
`;

const Right = styled.View`
  width: 70%;
  height: 100%;
`;

const Preview = ({ preview, focusing, setFocusing }) => {
  return (
    preview &&
    preview !== null && (
      <List>
        <Left>
          {preview.poster && (
            <>
              <ImageBackground
                source={{ uri: preview.poster }}
                style={{ width: 150, height: 250, margin: "auto" }}
                imageStyle={{ borderRadius: 15 }}
              />
              <Date>{preview.date}</Date>
              <Title>{preview.title}</Title>

              {preview && preview.tags && (
                <Tags>
                  {preview.tags.map((tag, index) => {
                    return <Chip key={`preview__tag__${index}`}>{tag}</Chip>;
                  })}
                </Tags>
              )}
            </>
          )}
        </Left>
        <Right>{/* <Utube /> */}</Right>
      </List>
    )
  );
};

export default Preview;
