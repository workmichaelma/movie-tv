import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { map } from 'lodash'

import Movie from './movie'

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  loadmore: {
    width: 200,
    height: 300,
    margin: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  loadmore_focus: {
    borderWidth: 4,
    borderColor: 'white'
  }
})

const MovieList = ({ movies, focusing, setFocusing, toPlayer, fetchMovies }) => {
  return (
    <View style={styles.list}>
      {map(movies, (movie, index) => {
        return (
          <Movie movie={movie} index={index} setFocusing={setFocusing} focusing={focusing === index} key={`MovieCard_${index}`} toPlayer={toPlayer} />
        )
      })}
      <TouchableOpacity
        key="MovieCard_999999"
        touchableHandleActivePressIn
        style={{ ...styles.loadmore, ...(focusing === 999999 ? styles.loadmore_focus : {}) }}
        onFocus={() => {
          setFocusing(999999)
        }}
        onPress={(e) => {
          if (e.eventKeyAction === 0) {
            setFocusing(movies.length - 1)
            fetchMovies()
          } 
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>載入更多</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieList
