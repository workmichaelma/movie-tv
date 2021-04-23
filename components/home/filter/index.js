import React from "react";
import { StyleSheet, View } from "react-native";
import { map } from "lodash";

import FilterBtn from "./filterBtn";

const width = 400;

const styles = StyleSheet.create({
  list: {
    justifyContent: "center",
    width,
  },
  sortBy: {
    width,
    borderBottomWidth: 2,
    borderColor: "white",
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 20,
  },
  pickByCountry: {
    width,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: "space-between",
  },
});

const Filter = ({ country, filter, setFilter, focusing, setFocusing }) => {
  const { sortBy, pickByCountry } = filter;
  return (
    <View style={styles.list}>
      <View style={styles.sortBy}>
        <FilterBtn
          {...{
            onPress: () => {
              setFilter({
                ...filter,
                sortBy: "view",
              });
            },
            focusing,
            setFocusing,
            highlighted: sortBy === "view",
            _key: "sortBy_view",
            text: "熱門",
          }}
        />
        <FilterBtn
          {...{
            onPress: () => {
              setFilter({
                ...filter,
                sortBy: "date",
              });
            },
            focusing,
            setFocusing,
            highlighted: sortBy === "date",
            _key: "sortBy_date",
            text: "最新",
          }}
        />
      </View>
      <View style={styles.pickByCountry}>
        {map(country, (text, _key) => {
          return (
            <FilterBtn
              key={`filterBtn__${_key}`}
              {...{
                onPress: () => {
                  setFilter({
                    ...filter,
                    pickByCountry: text,
                  });
                },
                focusing,
                setFocusing,
                highlighted: pickByCountry === text,
                _key,
                text,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Filter;
