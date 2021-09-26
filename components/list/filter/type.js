import React, { useState } from "react";
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

const Type = styled(Btn)`
  padding: 1%;
  margin: 1%;
  background-color: ${(props) => props.background};
  border-radius: 5px;
  flex: 1 1 20%;
  max-width: 30%;
`;

const TypeText = styled.Text`
  text-align: center;
  color: ${(props) => props.color};
  font-size: 13px;
`;

const Header = styled.View`
  width: 100%;
  background: #2d2d2d;
  border-bottom-width: 2px;
  border-color: #444444;
  padding: 2%;
`;

const HeaderText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #9e9e9e;
  text-align: center;
`;

const types = [
  "全部",
  "音樂片",
  "運動片",
  "西部片",
  "紀錄片",
  "科幻片",
  "犯罪片",
  "災難片",
  "歷史片",
  "戰爭片",
  "懸疑片",
  "愛情片",
  "家庭片",
  "奇幻片",
  "喜劇片",
  "動畫片",
  "動作片",
  "劇情片",
  "冒險片",
  "傳記片",
  "DC英雄電影",
  "漫威英雄電影",
  "熱門電影",
];

const Types = ({ type, setType, focusing, setFocusing }) => {
  return (
    <List>
      <Header>
        <HeaderText>類型</HeaderText>
      </Header>
      {map(types, (ty, index) => {
        const isFocusing =
          get(focusing, "type") === "type" && get(focusing, "index") === ty;
        const isSelected = ty === type;
        return (
          <Type
            touchableHandleActivePressIn
            background={isSelected ? "#404040" : "transparent"}
            index={index}
            onFocus={() => {
              setFocusing({
                type: "type",
                index: ty,
              });
            }}
            onPress={() => {
              setType(ty);
            }}
            key={`filter__type__${index}`}
          >
            <TypeText
              color={
                isFocusing ? "#1e8effe8" : isSelected ? "#9e9e9e" : "#5a5959"
              }
            >
              {ty}
            </TypeText>
          </Type>
        );
      })}
    </List>
  );
};

export default Types;
