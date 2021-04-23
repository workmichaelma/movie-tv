import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TouchableOpacityTV from "../../btn";

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#eeeeee",
  },
  button_focus: {
    borderBottomColor: "#f1ff62",
  },
  button_highlighted: {
    backgroundColor: "#eeeeee",
  },
  button_focus_highlighted: {
    backgroundColor: "#f1ff62",
    borderBottomColor: "#f1ff62",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#bbbbbb",
  },
  text_focus: {
    color: "#f1ff62",
  },
  text_highlighted: {
    color: "black",
  },
  text_focus_highlighted: {
    color: "black",
  },
});

const FilterBtn = ({
  focusing,
  setFocusing,
  highlighted,
  onPress,
  _key,
  text,
}) => {
  return (
    <TouchableOpacityTV
      key={_key}
      touchableHandleActivePressIn
      style={{
        ...styles.button,
        ...(highlighted && focusing === _key
          ? styles.button_focus_highlighted
          : highlighted
          ? styles.button_highlighted
          : focusing === _key
          ? styles.button_focus
          : {}),
      }}
      onFocus={() => {
        setFocusing(_key);
      }}
      onPress={() => onPress()}
    >
      <Text
        style={{
          ...styles.text,
          ...(highlighted && focusing === _key
            ? styles.text_focus_highlighted
            : highlighted
            ? styles.text_highlighted
            : focusing === _key
            ? styles.text_focus
            : {}),
        }}
      >
        {text}
      </Text>
    </TouchableOpacityTV>
  );
};

export default FilterBtn;
