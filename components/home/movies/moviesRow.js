import React from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { get, map } from "lodash";

import Movie from "./movie";

const Card = styled.View`
  flex: 0 0 10%;
  height: 100%;
  margin: 5px;
  flex-shrink: 1;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  height: 33%;
`;

const MovieRow = ({ movies, focusing, setFocusing, toPlayer }) => {
  return (
    <Row>
      {map(movies, (movie) => {
        const { index } = movie || {};
        return (
          <Card key={`movie__${index}`}>
            <Movie
              movie={movie}
              index={index}
              focusing={
                get(focusing, "type") === "movie" &&
                get(focusing, "index") === index
              }
              setFocusing={setFocusing}
              toPlayer={toPlayer}
            ></Movie>
          </Card>
        );
      })}
    </Row>
  );
};

export default MovieRow;
