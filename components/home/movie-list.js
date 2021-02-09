import React, {useEffect, useState} from 'react';
import axios from 'axios';
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

const MovieList = ({ movies, toPlayer, fetchMovies }) => {
  const [focusing, setFocusing] = useState(0)
  return (
    <View style={styles.list}>
      {map(movies, (movie, index) => {
        return (
          <Movie movie={movie} index={index} setFocusing={setFocusing} focusing={focusing === index} key={index} toPlayer={toPlayer} />
        )
      })}
      <TouchableOpacity touchableHandleActivePressIn onPress={fetchMovies} style={{ ...styles.loadmore, ...(focusing === 999999 ? styles.loadmore_focus : {})}} onFocus={() => {
        setFocusing(999999)
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>載入更多</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieList
