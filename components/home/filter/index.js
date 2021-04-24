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
  orderBy: {
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
  const { orderBy, pickByCountry } = filter;
  return (
    <View style={styles.list}>
      <View style={styles.orderBy}>
        <FilterBtn
          {...{
            onPress: () => {
              if (orderBy !== "view") {
                setFilter({
                  ...filter,
                  orderBy: "view",
                });
              }
            },
            focusing,
            setFocusing,
            highlighted: orderBy === "view",
            _key: "sortBy_view",
            text: "熱門",
          }}
        />
        <FilterBtn
          {...{
            onPress: () => {
              if (orderBy !== "date") {
                setFilter({
                  ...filter,
                  orderBy: "date",
                });
              }
            },
            focusing,
            setFocusing,
            highlighted: orderBy === "date",
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
                  if (pickByCountry !== text) {
                    setFilter({
                      ...filter,
                      pickByCountry: text,
                    });
                  }
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
