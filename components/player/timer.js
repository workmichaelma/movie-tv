import React from 'react'
import prettyMs from 'pretty-ms';
import { Text } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { isInteger } from 'lodash';

const toMs = ms => {
  try {
    return prettyMs(ms, {colonNotation: true, secondsDecimalDigits: 0})
  } catch (err) {
    return '--'
  }
}

const Timer = ({ timer }) => {
  const { current, playable, total } = timer
  const progress = isInteger(current) && isInteger(total) ? current / total : 0
  return (
    <>
      <Text style={{ color: '#eeeeee' }}>
        {toMs(current)}
      </Text>
      <ProgressBar
        progress={parseFloat(progress.toFixed(2))}
        color="#dddddd"
        style={{ width: 100, height: 5, marginLeft: 10, marginRight: 10 }}
      />
      <Text style={{ color: '#eeeeee' }}>
        {toMs(total)}
      </Text>
      <Text style={{ color: '#eeeeee', fontSize: 10 }}>
        {`  |  已載入${toMs(playable)}`}
      </Text>
    </>
  )
}

export default Timer
