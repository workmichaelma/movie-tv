import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { get, isArray, isEmpty, isObject, map } from 'lodash'
import axios from 'axios';
import { Button, IconButton } from 'react-native-paper'

import AV from '../components/player/av'
import Timer from '../components/player/timer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  controlBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {

  }
})

const PlayerScreen = ({ navigation, route }) => {
  const [sources, setSources] = useState([])
  const [currentSource, setCurrentSource] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [timer, setTimer] = useState(null)
  const videoRef = useRef();
  const { source, title, poster } = get(route, 'params.movie', {})

  const fetchSources = async source => {
    setLoading(true)
    axios.get(`https://uzstrnzup5.execute-api.ap-east-1.amazonaws.com/prod/movie?source=${source}`).then(({ data }) => {
      if (!isEmpty(data) && isArray(data)) {
        setSources(data)
        setLoading(false)
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchSources(source)    
  }, [source])

  useEffect(() => {
    if (!isEmpty(sources)) {
      setCurrentSource(sources[0])
      setPlaying(true)
    }
  }, [sources])

  return (
    <View style={styles.container}>
      <AV source={currentSource} poster={poster} playing={playing} setTimer={setTimer} ref={videoRef}/>
      <View style={styles.controlRow}>
        <View style={styles.controlBtns}>
          <IconButton icon={playing ? 'pause' : 'play'} color="white" onPress={(e) => {
            if (e.eventKeyAction === 0) {
              setPlaying(!playing)
            }
          }}
            key="PlayPauseButtn" />
          <IconButton icon={'rewind'} color="white" onPress={(e) => {
            if (e.eventKeyAction === 0) {
              const { current } = timer
              let to = current - 15000
              if (to < 0) {
                to = 0
              }
              videoRef.current.setMoviePosition(to)
            }
          }} />
          {
            isObject(timer) && <Timer timer={timer} />
          }
          <IconButton icon={'fast-forward'} color="white" onPress={(e) => {
            if (e.eventKeyAction === 0) {
              const { current, total } = timer
              const to = current + 30000
              if (to < total) {
                videoRef.current.setMoviePosition(to)
              }
            }
          }} />
        </View>
        <Text style={{ color: '#8b8b8b', fontSize: 12 }}>
          現在播放: {title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {
            map(sources, (s, i) => {
              return (
                <Button
                  mode="outlined"
                  key={i}
                  color={currentSource === s ? 'white' : '#8b8b8b'}
                  style={{ borderColor: currentSource === s ? '#2f2f2f' : 'transparent', marginRight: 10 }}
                  onPress={(e) => {
                    if (e.eventKeyAction === 0) {
                      setCurrentSource(s)
                    }
                  }}
                >
                  片源 {i+1}
                </Button>
              )
            })
          }
          <Button mode="outlined" icon="arrow-right" color="#8b8b8b" style={{ marginRight: 10, height: 35 }} contentStyle={{ flexDirection: 'row-reverse' }} onPress={(e) => {
            if (e.eventKeyAction === 0) {
              navigation.navigate('Home')
            }
          }}>
            離開
          </Button>
        </View>
      </View>
    </View>
  )
};

export default PlayerScreen
