import React from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { get, map, reduce } from "lodash";

import Row from "./moviesRow";

const MoviesLayer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MovieList = ({ movies = [], focusing, setFocusing, toPlayer }) => {
  const rows = reduce(
    movies.slice(0, 30),
    (rows, curr, index) => {
      const rowIndex = Math.floor(index / 10);
      const movie = {
        ...curr,
        index,
      };
      if (rows[rowIndex]) {
        rows[rowIndex].push(movie);
      } else {
        rows[rowIndex] = [movie];
      }
      return rows;
    },
    []
  );
  return (
    <MoviesLayer>
      {map(rows, (row, index) => {
        return (
          <Row
            movies={row}
            focusing={focusing}
            setFocusing={setFocusing}
            toPlayer={toPlayer}
            key={`movies-row__${index}`}
          />
        );
      })}
    </MoviesLayer>
  );
};

export default MovieList;
