import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Button } from 'react-native'
import { isArray, isEmpty } from 'lodash'

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([])
  const [loadinig, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
    console.log('yo')
  }, [])

  const fetchMovies = () => {
    console.log('hi')
    axios.get('https://uzstrnzup5.execute-api.ap-east-1.amazonaws.com/prod/movies').then(({ data }) => {
      console.log({data})
      if (isArray(data) && !isEmpty(data)) {
        console.log('good')
        setMovies(data)
      }
    })
  }

  console.log({movies})

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Play', { name: 'Jane' })
      }
    />
  );
};

export default HomeScreen
