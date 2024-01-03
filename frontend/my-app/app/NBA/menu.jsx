import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from "expo-router";

const Menu = () => {
  

  return (
    <View style={styles.menu}>
      
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
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'inline-flex',
    height: 896,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 31, 63)',
    
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
    alignItems: 'center'
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
    alignItems: 'center'
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
    backgroundColor: 'rgba(231, 76, 60, 0.74)',
    marginTop: 20,
    
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
