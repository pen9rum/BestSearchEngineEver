import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from "expo-router";

const Menu = () => {


  return (
    <View style={{
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: "flex-start",
      flexDirection: 'column',
      alignItems: 'flex-end',
      backgroundColor: '#001F3F',
    }}>
      <View style={styles.menu}>
        <Link href={{
          pathname: '/NBA/result',
          query: { type: 1 }
        }}>
          <Image
            source={require('../../assets/icons/close.png')}
            style={{ width: 17, height: 17, marginLeft: 20, tintColor: 'white' }}
          />
        </Link>
        <Link href={{
          pathname: '/NBA/result',
          query: { type: 1 }
        }}>
          <TouchableOpacity
            style={styles.playerBioGroup}
          >
            <Text style={styles.playerBioText}>Player Bio</Text>
          </TouchableOpacity></Link>
        <Link href={{
          pathname: '/NBA/newshome',
          query: { type: 1 }
        }}>
          <TouchableOpacity
            style={styles.playerNewsGroup}
          >
            <Text style={styles.playerNewsText}>Player News</Text>
          </TouchableOpacity></Link>
        <Link href={{
          pathname: '/NBA/others',
          query: { type: 1 }
        }}>
          <TouchableOpacity
            style={styles.othersGroup}>
            <Text style={styles.othersText}>Others</Text>
          </TouchableOpacity></Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    height: '100%',
    width: '70%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#1A4071',
    marginLeft: 0
  },
  container: {
    width: 296,
    height: 896,
    flexShrink: 0,
    backgroundColor: '#1A4071',

  },

  playerBioGroup: {
    width: 256,
    height: 62,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#B2494A',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 10,
  },
  playerBioText: {
    display: 'flex',
    width: 197,
    height: 37,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    textAlign: 'center',
    
  },
  playerNewsGroup: {
    width: 256,
    height: 62,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#B2494A',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 10,

  },
  playerNewsText: {
    display: 'flex',
    width: 197,
    height: 37,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    textAlign: 'center',
  },
  othersGroup: {
    width: 256,
    height: 62,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#B2494A',
    marginTop: 20,
    marginLeft: 10,

    alignItems: 'center'
  },
  othersText: {
    display: 'flex',
    width: 197,
    height: 37,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    textAlign: 'center',
  },
});

export default Menu;
