import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TouchableOpacityTV from "../btn";
const styles = StyleSheet.create({
  container: {
    width: 400,
    borderColor: "transparent",
    borderTopColor: "white",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  button: {
    width: 100,
    height: 50,
    borderBottomColor: "#eeeeee",
  },
  button_focus: {
    borderBottomColor: "#f1ff62",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  text_focus: {
    color: "#f1ff62",
  },
});

const Pager = ({ page, setFocusing, focusing, fetchPage }) => {
  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacityTV
        touchableHandleActivePressIn
        style={{
          ...styles.button,
          ...(focusing === "prePage" ? styles.button_focus : {}),
        }}
        onFocus={() => {
          setFocusing("prePage");
        }}
        onPress={() => fetchPage(page === 1 ? 1 : page - 1)}
      >
        <Text
          style={{
            ...styles.text,
            ...(focusing === "prePage" ? styles.text_focus : {}),
          }}
        >
          上一頁
        </Text>
      </TouchableOpacityTV>
      <View>
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          {page}
        </Text>
      </View>
      <TouchableOpacityTV
        touchableHandleActivePressIn
        style={{
          ...styles.button,
          ...(focusing === "nextPage" ? styles.button_focus : {}),
        }}
        onFocus={() => {
          setFocusing("nextPage");
        }}
        onPress={() => fetchPage(page + 1)}
      >
        <Text
          style={{
            ...styles.text,
            ...(focusing === "nextPage" ? styles.text_focus : {}),
          }}
        >
          下一頁
        </Text>
      </TouchableOpacityTV>
    </View>
  );
};

export default Pager;
