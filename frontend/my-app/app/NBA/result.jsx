import React from 'react';
<<<<<<< HEAD
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
=======
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
>>>>>>> fc838085b88d5a56f201755452af5a5286352e89
        <Text style={styles.statisticsTitle}>Statistics</Text>
        <View style={styles.statisticShape}>
          <Text style={styles.statistic}>PPG: 25.5</Text>
          <Text style={styles.statistic}>RPG: 25.5</Text>
          <Text style={styles.statistic}>APG: 25.5</Text>
          <Text style={styles.statistic}>PIE: 25.5</Text>
        </View>
<<<<<<< HEAD

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

=======
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
>>>>>>> fc838085b88d5a56f201755452af5a5286352e89
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
<<<<<<< HEAD
    color: '#FFF',
    fontFamily: 'Inknut Antiqua',
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
=======
        color: '#FFF',
        fontFamily: 'Inknut Antiqua',
        fontSize: 50,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        flexDirection: 'column',
        justifyContent: 'center'
>>>>>>> fc838085b88d5a56f201755452af5a5286352e89
  },
  linearDec: {
    width: 414,
    height: 60,
    flexShrink: 0,
  },
  BioPic: {
<<<<<<< HEAD
    width: 179,
    height: 414,
    // transform: [{ rotate: '-90deg' }],
    flexShrink: 0,
    opacity: 0.95,
  },
  NewsPic: {
    width: 414,
=======
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
>>>>>>> fc838085b88d5a56f201755452af5a5286352e89
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