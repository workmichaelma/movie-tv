import React from "react";
import { ScrollView } from "react-native";
import Movie from "./movie";

import { get, map } from "lodash";

const MovieList = ({ movies, focusing, setFocusing, toPlayer }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {map(movies, (movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            focusing={
              get(focusing, "type") === "movie" &&
              get(focusing, "index") === index
            }
            setFocusing={setFocusing}
            toPlayer={toPlayer}
            key={`movie__${index}`}
          ></Movie>
        );
      })}
    </ScrollView>
  );
};

export default MovieList;
