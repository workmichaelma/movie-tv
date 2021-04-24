import React from "react";
import { StyleSheet, View } from "react-native";
import { map } from "lodash";

import Movie from "./movie";

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  loadmore: {
    width: 200,
    height: 300,
    margin: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  loadmore_focus: {
    borderWidth: 4,
    borderColor: "white",
  },
});

const MovieList = ({ movies, focusing, setFocusing, toPlayer }) => {
  return (
    <View style={styles.list}>
      {map(movies, (movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            setFocusing={setFocusing}
            focusing={focusing === index}
            key={`MovieCard_${index}`}
            toPlayer={toPlayer}
          />
        );
      })}
    </View>
  );
};

export default MovieList;
