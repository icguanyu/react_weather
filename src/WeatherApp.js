import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { ReactComponent as CloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RedoIcon } from "./images/refresh.svg";

const WeatherApp = () => {
  console.log("最外面");

  useEffect(() => {
    console.log("useEffect");
    fetchCurrentWeather();
  }, []);

  const key = "CWB-932ABFF7-A813-4E1A-A6F5-15C1B82F99BC";
  const [currentWeather, setCurrentWeather] = useState({
    observationTime: "2019-10-02 22:10:00",
    locationName: "臺北市",
    description: "多雲時晴",
    temperature: 27.5,
    windSpeed: 0.3,
    humid: 0.88,
  });
  const fetchCurrentWeather = () => {
    fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${key}&locationName=臺北`)
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
          if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        }, {});

        setCurrentWeather({
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          description: "多雲時晴",
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        });
      });
  };
  return (
    <Container theme="dark">
      {console.log("render")}
      <WeatherCard>
        <Location>{currentWeather.locationName}</Location>
        <Desc>
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currentWeather.observationTime))}{" "}
          {currentWeather.description}
        </Desc>
        <CurrentWeather>
          <Temperature>
            {Math.round(currentWeather.temperature)} <Celsius>°C</Celsius>
          </Temperature>
          <Cloudy />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {currentWeather.windSpeed} m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {(currentWeather.humid * 100).toFixed(1)} %
        </Rain>
        <Redo onClick={fetchCurrentWeather}>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(new Date())}
          <RedoIcon />
        </Redo>
      </WeatherCard>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => (props.theme === "dark" ? "#333333" : "#ededed")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 10px 15px;
`;
const Location = styled.div`
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 5px;
`;
const Desc = styled.div`
  padding: 5px 0;
`;
const CurrentWeather = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Temperature = styled.div`
  color: #757575;
  font-size: 80px;
  font-weight: 300;
  display: flex;
`;
const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;
// 將原本就存在的組件添加樣式。
const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
`;
const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

export default WeatherApp;
