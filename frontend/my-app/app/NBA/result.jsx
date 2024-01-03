import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Result = () => {
  return (
    <View style={styles.result}>
      <View style={styles.header}>
      <Image source={require('../../assets/pic/player img.jpg')} style={styles.playerImg} />
        <Link
          href={{
            pathname: '/NBA/result',
            query: { type: 1 },
          }}
        >
          <Image source={require('../../assets/icons/x.png')} style={styles.close} />
        </Link>
        <Text style={styles.statisticsTitle}>Statistics</Text>
        <View style={styles.statisticShape}>
          <Text style={styles.statistic}>PPG: 25.5</Text>
          <Text style={styles.statistic}>RPG: 25.5</Text>
          <Text style={styles.statistic}>APG: 25.5</Text>
          <Text style={styles.statistic}>PIE: 25.5</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoBlock}>
          <Link
            href={{
              pathname: '/NBA/info',
              query: { type: 1 },
            }}
          >
            <Text style={styles.infoChoice}>Player Bio</Text>
            <Image source={require('../../assets/pic/Bio.png')} style={styles.BioPic} />
          </Link>
        </View>
        <View style={styles.infoBlock}>
          <Link
            href={{
              pathname: '/NBA/news',
              query: { type: 1 },
            }}
          >
            <Text style={styles.infoChoice}>Player News</Text>
            <Image source={require('../../assets/pic/News.png')} style={styles.NewsPic} />
          </Link>
        </View>
        <View style={styles.infoBlock}>
          <Link
            href={{
              pathname: '/NBA/others',
              query: { type: 1 },
            }}
          >
            <Text style={styles.infoChoice}>Others</Text>
            <Image source={require('../../assets/pic/Others.png')} style={styles.OthersPic} />
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#001F3F',
  },
  header: {
    width: '100%',
    height: 452,
    flexShrink: 0,
    padding: 20,
  },
  playerImg: {
    width: '100%',
    height: 323,
    flexShrink: 0,
    backgroundColor: 'lightgray',
  },
  close: {
    width: 34,
    height: 33,
    flexShrink: 0,
  },
  statisticsTitle: {
    width: 330,
    height: 34,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
    marginBottom: 10,
  },
  statisticShape: {
    width: '100%',
    height: 55.238,
    flexShrink: 0,
    backgroundColor: '#FFC72C',
    marginBottom: 10,
  },
  statistic: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  },
  info: {
    display: 'flex',
    width: 414,
    height: 540,
    paddingTop: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
    flexDirection: 'column'

  },
  infoBlock: {
    width: 414,
    height: 179,
    flexShrink: 0,
    flexDirection: 'column',
    
  },
  infoChoice: {
        color: '#FFF',
        fontFamily: 'Inknut Antiqua',
        fontSize: 50,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        flexDirection: 'column',
        justifyContent: 'center'
  },
    linearDec: {
    width: 414,
    height: 60,
    flexShrink: 0,
  },
  BioPic: {
  width: '100%',
  height: 414,
  transform: [{ rotate: '-90deg' }],
  flexShrink: 0,
  opacity: 0.95,
  background: 'url(frontend/my-app/assets/pic/Bio.png) lightgray 50% / cover no-repeat',
  },
  NewsPic:{
  width: '100%',
  height: 179,
  flexShrink: 0,
  background: 'url(frontend/my-app/assets/pic/News.png) lightgray 50% / cover no-repeat',
  },
  OthersPic:{
    width: '100%',
    height: 179,
    flexShrink: 0,
    background: 'url(frontend/my-app/assets/pic/Others.png) lightgray 50% / cover no-repeat',
    },
});

export default Result;