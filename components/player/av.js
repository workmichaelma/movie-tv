import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { Video } from "expo-av";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  video: {
    width,
    height: height - 30,
    position: "relative",
  },
});

const AV = ({ source, playing, setTimer }, ref) => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setMoviePosition(to) {
      if (videoRef !== null) {
        videoRef.current.setPositionAsync(to);
      }
    },
  }));

  useEffect(() => {
    if (videoRef !== null) {
      if (playing) {
        setLoading(false);
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [video, playing]);

  useEffect(() => {
    setError(false);
    setLoading(false);
  }, [source]);

  return (
    <View style={{ ...styles.video, flex: 1 }}>
      {!loading && error && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            無法播放，請使用其他片源或返回
          </Text>
        </View>
      )}
      {!error && (
        <Video
          ref={videoRef}
          source={{ uri: source, type: "m3u8" }}
          resizeMode="stretch"
          shouldPlay
          progressUpdateIntervalMillis={1000.0}
          onError={(e) => {
            setLoading(false);
            setError(true);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoad={() => {
            setLoading(false);
          }}
          onPlaybackStatusUpdate={(v) => {
            if (
              v.positionMillis &&
              v.playableDurationMillis &&
              v.durationMillis
            ) {
              setTimer({
                current: v.positionMillis,
                playable: v.playableDurationMillis,
                total: v.durationMillis,
              });
            }
          }}
          style={styles.video}
        />
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>載入中...</Text>
        </View>
      )}
    </View>
  );
};

export default forwardRef(AV);
