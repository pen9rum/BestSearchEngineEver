import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Link, Tabs } from "expo-router";
import { Image } from 'react-native';

const Result = () => {

  return (
    <ImageBackground
      style={{
        flex: 1
      }}>
      <View style={{
        width: '100%',
        minHeight: 900,
        flex: 2,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: '#001F3F',
      }}>

        <ImageBackground
          source={require("../../assets/pic/stephenCurry.png")}
          resizeMode="cover"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'flex-start',
            alignItems: 'flex-start',
            width: 500,
            height: 250
          }}>
          <Link href={{
            pathname: '',
            query: { type: 1 }
          }}>
            <Image
              source={require('../../assets/icons/close.png')}
              style={{ width: 17, height: 17, marginLeft: 20, tintColor: 'black', marginTop: 10 }}
            />
          </Link>
          <Text style={{
            fontSize: 40,
            fontWeight: 'bold',
            display: 'flex',
            color: 'black',
            marginLeft: 20
          }}>
            Stephen{'\n'}Curry
          </Text>

        </ImageBackground>
        <View>
          <Text style={styles.statisticsTitle}>Statistics</Text>
        </View>
        <View style={{
          width: 420,
          height: 55,
          backgroundColor: '#FFC72C',
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderRadius: 50,

        }}>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
            <Text style={styles.statistic}>PPG</Text>
            <Text style={styles.statistic}>25.5</Text>
          </View>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
            <Text style={styles.statistic}>RPG</Text>
            <Text style={styles.statistic}>25.5</Text>
          </View>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
            <Text style={styles.statistic}>APG</Text>
            <Text style={styles.statistic}>25.5</Text>
          </View>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
            <Text style={styles.statistic}>PIE</Text>
            <Text style={styles.statistic}>25.5</Text>
          </View>
        </View>

        <View style={{
          display: 'flex',
          width: 500,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Link
            href={{
              pathname: '/NBA/info',
              query: { type: 1 },
            }}
          >
            <ImageBackground
              source={require("../../assets/pic/Bio.png")}
              resizeMode="cover" style={styles.infoBlock}>
              <Text style={styles.infoChoice}>Player Bio</Text>
            </ImageBackground>
          </Link>

          <Link
            href={{
              pathname: '/NBA/news',
              query: { type: 1 },
            }}
          >
            <ImageBackground
              source={require("../../assets/pic/News.png")}
              resizeMode="cover" style={styles.infoBlock}>
              <Text style={styles.infoChoice}>Player News</Text>
            </ImageBackground>
          </Link>

          <Link
            href={{
              pathname: '/NBA/others',
              query: { type: 1 },
            }}
          >
            <ImageBackground
              source={require("../../assets/pic/Others.png")}
              resizeMode="cover" style={styles.infoBlock}>
              <Text style={styles.infoChoice}>Others</Text>
            </ImageBackground>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headArea: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 400,
    height: 34,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
    marginTop: 10,
  },
  statistic: {
    color: 'black',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  infoBlock: {
    width: 500,
    height: 179,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoChoice: {
    color: '#FFF',
    fontFamily: 'Inknut Antiqua',
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    textAlign: 'center',
    justifyContent: 'center'
  },
});

export default Result;