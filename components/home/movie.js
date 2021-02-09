import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { map } from 'lodash'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';

const styles = StyleSheet.create({
  background: {
    width: 200,
    height: 300,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  imgFocusing: {
    borderWidth: 4,
    borderColor: 'white'
  },
  focusing: {
    width: 220,
    height: 330,
  }
})

const Movie = ({ movie, index, focusing, setFocusing, toPlayer }) => {
  const { date, poster, tags, title } = movie || {}
  return (
    <ImageBackground source={{ uri: poster }} style={{ ...styles.background, ...(focusing ? styles.focusing : {}) }} imageStyle={{ borderRadius: 15, ...(focusing ? styles.imgFocusing : {}) }}>
      <TouchableOpacity
        touchableHandleActivePressIn
        onFocus={() => {
          setFocusing(index)
        }}
        onPress={() => {
          toPlayer(movie)
        }}
      >
      {
        focusing && (
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: '#0000004d', width: 220, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 15 }}>
              <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
                {title}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                <Chip style={{ margin: 3 }} textStyle={{ fontSize: 10 }}>
                  {date}
                </Chip>
                {map(tags, (tag, i) => {
                  return (
                    <Chip style={{ margin: 3 }} textStyle={{ fontSize: 10 }} key={i}>
                      {tag}
                    </Chip>
                  )
                })}
              </View>
            </View>
          </View>
        )
      }
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default Movie
