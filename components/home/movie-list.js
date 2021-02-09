import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, } from 'react-native';
import { map } from 'lodash'

import Movie from './movie'

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})

const MovieList = ({ movies, toPlayer }) => {
  const [focusing, setFocusing] = useState(0)
  return (
    <View style={styles.list}>
      {map(movies, (movie, index) => {
        return (
          <Movie movie={movie} index={index} setFocusing={setFocusing} focusing={focusing === index} key={index} toPlayer={toPlayer} />
        )
      })}
    </View>
  )
}

export default MovieList
