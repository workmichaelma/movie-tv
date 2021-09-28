import React from "react";
import { View, Text } from "react-native";

import { get, map } from "lodash";

import Btn from "../../btn";

import styled from "styled-components/native";

const List = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Year = styled(Btn)`
  margin: 1%;
  background-color: ${(props) => props.background};
  border-radius: 5px;
  padding: 3px 10px;
  align-self: flex-start;
`;

const YearText = styled.Text`
  text-align: center;
  color: ${(props) => props.color};
  font-size: 11px;
`;

const Header = styled.View`
  width: 100%;
  background: #2d2d2d;
  border-bottom-width: 1px;
  border-color: #444444;
  padding: 1%;
`;

const HeaderText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #9e9e9e;
  text-align: center;
`;

const yrs = [
  "全部",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007-1970",
];

const Years = ({ year, setYear, focusing, setFocusing }) => {
  return (
    <List>
      <Header>
        <HeaderText>年份</HeaderText>
      </Header>
      {map(yrs, (yr, index) => {
        const isFocusing =
          get(focusing, "type") === "year" && get(focusing, "index") === yr;
        const isSelected = yr === year;
        return (
          <Year
            touchableHandleActivePressIn
            background={isSelected ? "#404040" : "transparent"}
            index={index}
            onFocus={() => {
              setFocusing({
                type: "year",
                index: yr,
              });
            }}
            onPress={() => {
              setYear(yr);
            }}
            key={`filter__years__${index}`}
          >
            <YearText
              color={
                isFocusing ? "#1e8effe8" : isSelected ? "#9e9e9e" : "#5a5959"
              }
            >
              {yr}
            </YearText>
          </Year>
        );
      })}
    </List>
  );
};

export default Years;
