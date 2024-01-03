import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Tabs } from "expo-router";
import { Image } from 'react-native';

const Result = () => {

  return (
    <View style={styles.result}>
      <View style={styles.header}>
        <View style={styles.headArea}>
          <Link href={{
            pathname: '',
            query: { type: 1 }
          }}>
            <Image
              source={require('../../assets/icons/close.png')}
              style={{ width: 17, height: 17, marginRight: '10%', tintColor: 'white' }}
            />
          </Link>
          <Image
            source={require('../../assets/icons/menu.png')}
            style={{ width: 25, height: 20, marginLeft: '10%', tintColor: '#001F3F' }}
          />
        </View>
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
          <Link href={{
            pathname: '/NBA/info',
            query: { type: 1 }
          }}>
            <Image
              source={require('../../assets/pic/Bio.png')}
              style={styles.BioPic}
            />
            <Text style={styles.infoChoice}>Player Bio</Text>
            <View>
              {/*
              <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
        />*/}
            </View>

          </Link>
        </View>
        <View style={styles.infoBlock}>
          <Link href={{
            pathname: '/NBA/news',
            query: { type: 1 }
          }}>
            <Image
              source={require('../../assets/pic/News.png')}
              style={styles.NewsPic}
            />
            <Text style={styles.infoChoice}>Player News</Text>
            <View>
              {/*
              <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
        />*/}
            </View>
          </Link>
        </View>
        <View style={styles.infoBlock}>
          <Link href={{
            pathname: '/NBA/others',
            query: { type: 1 }
          }}>
            <Image
              source={require('../../assets/pic/Others.png')}
              style={styles.OthersPic}
            />
            <Text style={styles.infoChoice}>Others</Text>
            <View>
              {/*
              <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
        />*/}
            </View>
          </Link>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    display: 'flex',
    width: 414,
    height: 992,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 48,
    backgroundColor: '#001F3F',
  },
  header: {
    width: 414,
    height: 452,
    flexShrink: 0,
    padding: 20,
  },
  playerImg: {
    width: 414,
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
    width: 343,
    height: 55.238,
    flexShrink: 0,
    borderRadius: 100,
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  infoBlock: {
    width: 414,
    height: 179,
    flexShrink: 0,
  },
  infoChoice: {
    color: '#FFF',
    fontFamily: 'Inknut Antiqua',
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  linearDec: {
    width: 414,
    height: 60,
    flexShrink: 0,
  },
  BioPic: {
    width: 179,
    height: 414,
    // transform: [{ rotate: '-90deg' }],
    flexShrink: 0,
    opacity: 0.95,
  },
  NewsPic: {
    width: 414,
    height: 179,
    flexShrink: 0,
  },
  OthersPic: {
    width: 414,
    height: 179,
    flexShrink: 0,
  },
});

export default Result;