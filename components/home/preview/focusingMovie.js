import React from "react";
import { ScrollView, View, Text } from "react-native";
import styled from "styled-components/native";
import { get, map } from "lodash";

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const Card = styled.Image`
  flex: 1;
  aspect-ratio: 0.7;
  height: 70%;
  margin: 5px auto;
`;

const Tags = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TitleText = styled.Text`
  color: #9e9e9e;
  font-size: 11px;
  text-align: center;
  margin: 2px 0;
`;

const Tag = styled.View`
  background-color: #2d2d2d;
  padding: 3px 8px;
  align-self: flex-start;
  margin: 3px;
  border-radius: 3px;
`;

const TagText = styled.Text`
  font-size: 10px;
  color: #9e9e9e;
`;

const FocusingMovie = ({ movies, focusing }) => {
  const { type, index } = focusing || {};
  const movie = type === "movie" && movies[index];
  const { poster = "", tags = [], title = false, year = "" } = movie || {};
  return movie ? (
    <Wrapper>
      {poster ? <Card source={{ uri: poster }} /> : null}
      {title ? <TitleText>{title}</TitleText> : null}
      <Tags>
        {map([`${year}年`, ...tags], (tag, index) => {
          return tag ? (
            <Tag key={`tag__${index}`}>
              <TagText>{tag}</TagText>
            </Tag>
          ) : null;
        })}
      </Tags>
    </Wrapper>
  ) : null;
};

export default FocusingMovie;
