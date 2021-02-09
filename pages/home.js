import axios from 'axios';
import React, {useEffect, useState, } from 'react';
import { Dimensions, StyleSheet, Button, ScrollView, Text, View } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper';
import { isArray, isEmpty } from 'lodash'
import { useIsFocused } from "@react-navigation/native";
import MovieList from '../components/home/movie-list'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  scrollview: {
    position: 'relative',
    backgroundColor: 'black',
    flex: 1,
  }
})

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchMovies()
  }, [isFocused]);

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = () => {
    if (hasNext) {
      setLoading(true)
      axios.get(`https://uzstrnzup5.execute-api.ap-east-1.amazonaws.com/prod/movies?page=${page}`).then(({ data }) => {
        if (isArray(data) && !isEmpty(data)) {
          setMovies([...movies, ...data])
          setPage(page + 1)
          setLoading(false)
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
        setHasNext(false)
      })
    }
  }

  const toPlayer = movie => {
    setMovies([])
    setPage(1)
    navigation.navigate('Player', { movie })
  }

  return (
    <ScrollView style={styles.scrollview}>
      {
        !loading && (
          <MovieList movies={movies} toPlayer={toPlayer} fetchMovies={fetchMovies} />
        )
      }
      {
        loading && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>
            <Text style={{ color: 'white' }}>
              loading
            </Text>
            {/* <ActivityIndicator size="large" /> */}
          </View>
        )
      }
    </ScrollView>
  );
};

export default HomeScreen

const mmm = [
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/jmapKR4QIAFe4im2bG9SlUWUsC1-185x278.jpg",
  "source": "lx-2048",
  "title": "LX 2048",
  "date": "2020",
  "tags": [
  "劇情片",
  "科幻片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Kidnap.jpg",
  "source": "kidnap",
  "title": "綁架",
  "date": "2017",
  "tags": [
  "劇情片",
  "動作片",
  "新發舊電影",
  "驚悚片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2020/06/sputnik.jpg",
  "source": "the-sputnik",
  "title": "外星異種/寄生異形",
  "date": "2020",
  "tags": [
  "劇情片",
  "恐怖片",
  "熱門電影",
  "科幻片",
  "驚悚片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/01/Run-Hide-Fight.jpg",
  "source": "run-hide-fight",
  "title": "校園大逃殺/殺戮校園大逃奔",
  "date": "2020",
  "tags": [
  "動作片",
  "恐怖片",
  "熱門電影",
  "犯罪片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/aWQuIWcRQ89wbaVExk8T7ielrDq-185x278.jpg",
  "source": "stigmatized-properties",
  "title": "兇宅怪談/入住兇宅請敲門",
  "date": "2020",
  "tags": [
  "劇情片",
  "恐怖片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2020/07/A-Nice-Girl-Like-You.jpg",
  "source": "a-nice-girl-like-you",
  "title": "像你這樣的好女孩",
  "date": "2020",
  "tags": [
  "喜劇片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/ik5hG3HJWIjmS2HChi9DLvpQrHB-185x278.jpg",
  "source": "cocoon",
  "title": "青春簡單愛",
  "date": "2020",
  "tags": [
  "劇情片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Yarn.jpg",
  "source": "ito",
  "title": "線2020",
  "date": "2020",
  "tags": [
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/4PrWnaWdcZoTC9Xxyr0UZYS3ppw-185x278.jpg",
  "source": "creating-the-queens-gambit",
  "title": "後翼棄兵：制作特輯",
  "date": "2021",
  "tags": [
  "短片",
  "紀錄片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2020/12/the-rescue.jpg",
  "source": "the-rescue",
  "title": "緊急救援",
  "date": "2020",
  "tags": [
  "動作片",
  "災難片",
  "熱門電影"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Dream-of-Eternity.jpg",
  "source": "the-yin-yang-master",
  "title": "晴雅集/陰陽師",
  "date": "2021",
  "tags": [
  "奇幻片",
  "愛情片",
  "熱門電影"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Sister-in-laws-Taste-2.jpg",
  "source": "sister-in-laws-taste-2",
  "title": "小姑子的味道2",
  "date": "2021",
  "tags": [
  "情色片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/01/RIA.jpg",
  "source": "r-i-a",
  "title": "致命嬌妻",
  "date": "2021",
  "tags": [
  "冒險片",
  "科幻片",
  "驚悚片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Space-Sweepers.jpg",
  "source": "space-sweepers",
  "title": "勝利號",
  "date": "2021",
  "tags": [
  "冒險片",
  "劇情片",
  "動作片",
  "熱門電影",
  "科幻片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Little-Big-Women.jpg",
  "source": "little-big-women",
  "title": "孤味",
  "date": "2020",
  "tags": [
  "劇情片",
  "家庭片",
  "愛情片",
  "熱門電影"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2020/10/All-My-Life.jpg",
  "source": "all-my-life",
  "title": "我的一生",
  "date": "2020",
  "tags": [
  "劇情片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/b7BllsQkD6nTkAdtd28UVCmKqVi-185x278.jpg",
  "source": "bliss2021",
  "title": "極樂2021",
  "date": "2021",
  "tags": [
  "劇情片",
  "愛情片",
  "科幻片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/kQaIP1OtVD57y9YNsVPCyCrOvIf-185x278.jpg",
  "source": "retuirn-of-special-forces",
  "title": "特種兵歸來4替身疑雲",
  "date": "2021",
  "tags": [
  "冒險片",
  "動作片",
  "犯罪片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Useful-Married-Woman.jpg",
  "source": "useful-married-woman",
  "title": "偷吃的已婚女人",
  "date": "2020",
  "tags": [
  "情色片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Love-Weddings-Other-Disasters.jpg",
  "source": "love-weddings-other-disasters",
  "title": "愛情瞎攪禍",
  "date": "2021",
  "tags": [
  "喜劇片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/a7bW3uKOMPBnmHs8gnlpfhTD8YQ-185x278.jpg",
  "source": "2-hearts",
  "title": "2顆心",
  "date": "2020",
  "tags": [
  "劇情片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/sGbDFapR6XNPk6k4RHi2Bj3oNO6-185x278.jpg",
  "source": "35089874",
  "title": "余生，请多指教",
  "date": "2021",
  "tags": [
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/vd8IC1wx0RL3mHliUYnMNsK9GlM-185x278.jpg",
  "source": "blue-painful-and-brittle",
  "title": "青澀的傷痛與脆弱",
  "date": "2020",
  "tags": [
  "冒險片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/p4JqrkixkJAghQGXR4ZnDz9KdGl-185x278.jpg",
  "source": "hidden-attack-of-the-dead",
  "title": "監幽",
  "date": "2020",
  "tags": [
  "恐怖片",
  "情色片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/iRuyXANJJ7AMrFOdmzGrk3jEifr-185x278.jpg",
  "source": "persian-lessons",
  "title": "波斯語課",
  "date": "2020",
  "tags": [
  "劇情片",
  "戰爭片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/1lyCyq15iDxdeEHvmlqpdDBchh-185x278.jpg",
  "source": "real-fighter",
  "title": "神鬼對決",
  "date": "2020",
  "tags": [
  "動作片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/uQjxpEYktu36ZiWKfn0t0FySmXl-185x278.jpg",
  "source": "saint-maud",
  "title": "暗黑聖女/聖人莫德",
  "date": "2020",
  "tags": [
  "劇情片",
  "恐怖片",
  "懸疑片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/The-Last-Frontier.jpg",
  "source": "the-last-frontier",
  "title": "最後的前線",
  "date": "2020",
  "tags": [
  "劇情片",
  "動作片",
  "戰爭片",
  "歷史片",
  "熱門電影"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/41qVwAz4ZCc8g7YQETQih8fpB8q-185x278.jpg",
  "source": "looks-that-kill",
  "title": "凝視獵物",
  "date": "2020",
  "tags": [
  "劇情片",
  "喜劇片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/wFaO4uc8po7uNCTSdvbqduMTyuu-185x278.jpg",
  "source": "rent-a-pal",
  "title": "租來的朋友/租個朋友",
  "date": "2020",
  "tags": [
  "恐怖片",
  "驚悚片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/podzoGfamoxObotrMMoH2WIc8nj-185x278.jpg",
  "source": "superintelligence",
  "title": "超級智能",
  "date": "2020",
  "tags": [
  "喜劇片",
  "愛情片",
  "科幻片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/sqhi0JBuXp9cMPUZvnMHgchpuva-185x278.jpg",
  "source": "my-elder-brother",
  "title": "我的嫂子",
  "date": "2020",
  "tags": [
  "情色片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/3hMsRuphxdoJOCkS6czUGro4u7s-185x278.jpg",
  "source": "big-red-envelope",
  "title": "大紅包",
  "date": "2021",
  "tags": [
  "喜劇片",
  "愛情片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/Brothers-by-Blood.jpg",
  "source": "brothers-by-blood",
  "title": "血緣兄弟",
  "date": "2021",
  "tags": [
  "劇情片",
  "動作片",
  "犯罪片"
  ]
  },
  {
  "poster": "https://www.movieffm.net/wp-content/uploads/2021/02/1612164701.jpg",
  "source": "34937643",
  "title": "明城攻略之鎮河妖",
  "date": "2021",
  "tags": [
  "動作片",
  "古裝",
  "奇幻片"
  ]
  }
  ]
