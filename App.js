import React, {useRef} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import locations from './model/locations';
import Locations from './model/locations';

import CloudyIcon from './assets/animated/cloudy-day-1.svg';
import SunIcon from './assets/animated/day.svg';
import MoonIcon from './assets/animated/weather_sunset.svg';
import RainIcon from './assets/animated/rainy-4.svg';
import NightIcon from './assets/animated/thunder.svg';
import SearchIcon from './assets/animated/search.svg';
import MenuIcon from './assets/animated/menu.svg';

import {getStatusBarHeight} from 'react-native-status-bar-height';

const weatherIcon = weatherType => {
  if (weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Cloudy') {
    return <CloudyIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Night') {
    return <NightIcon width={34} height={34} fill="#fff" />;
  }
};

const App = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const scrollx = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollx,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}>
        {Locations.map((location, index) => {
          if (location.weatherType === 'Sunny') {
            bgImg = require('./assets/images/sunnybg.jpg');
          } else if (location.weatherType === 'Night') {
            bgImg = require('./assets/images/nightbg.jpg');
          } else if (location.weatherType === 'Cloudy') {
            bgImg = require('./assets/images/cloudsbg.jpg');
          } else if (location.weatherType === 'Rainy') {
            bgImg = require('./assets/images/rainybg.jpg');
          } else if (location.weatherType === 'Day') {
            bgImg = require('./assets/images/daybg.jpg');
          } else if (location.weatherType === 'Snow') {
            bgImg = require('./assets/images/snowbg.jpg');
          }

          return (
            <View
              style={{width: windowWidth, height: windowHeight}}
              key={index}>
              <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.time}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temperature}>
                        {location.temperature}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {weatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgba(255, 255, 255, 0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}></View>
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infotext}>Wind</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {location.wind}
                      </Text>
                      <Text style={styles.infotext}>Km/h</Text>
                      <View style={styles.infobar}>
                        <View
                          style={{
                            width: location.wind / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infotext}>Rain</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infotext}>%</Text>
                      <View style={styles.infobar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infotext}>Humidity</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {location.humidity}
                      </Text>
                      <Text style={styles.infotext}>%</Text>
                      <View style={styles.infobar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.appheader}>
        <TouchableOpacity onPress={() => {}}>
          <SearchIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MenuIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.indicatorWrapper}>
        {locations.map((location, index) => {
          const width = scrollx.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={index} style={[styles.normalDot, {width}]} />
          );
        })}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temperature: {
    color: '#fff',
    fontFamily: 'Lato-light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 34,
    marginLeft: 10,
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  animated: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  bold: {
    position: 'absolute',
    top: 160,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infotext: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infobar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  appheader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});

// rd.git S/Q
// git init
// git add .
// git commit -m "app ui design"
// git remote add origin https://github.com/saka-8/weather_mobile_app.git
// git push -u origin master
