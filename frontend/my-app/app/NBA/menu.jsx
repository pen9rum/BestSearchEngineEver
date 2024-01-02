import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();

  const handlePlayerBioClick = () => {
    navigation.navigate('info'); 
  };

  const handlePlayerNewsClick = () => {
    navigation.navigate('news'); 
  };

  const handleOthersClick = () => {
    navigation.navigate('others'); 
  };

  return (
    <View style={styles.menu}>
      <View style={styles.container}>
        <Text style={styles.searchTitle}>Search</Text>
        <TouchableOpacity style={styles.searchFrame}>
          <Image
            source={require('../../assets/pic/search (1).png')}
            style={{ width: 24, height: 24, flexShrink: 0 }}
          />
        </TouchableOpacity>
        </View>
      <TouchableOpacity
        style={styles.playerBioGroup}
        onPress={handlePlayerBioClick}>
        <Text style={styles.playerBioText}>Player Bio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.playerNewsGroup}
        onPress={handlePlayerNewsClick}>
        <Text style={styles.playerNewsText}>Player News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.othersGroup}
        onPress={handleOthersClick}>
        <Text style={styles.othersText}>Others</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'inline-flex',
    height: 896,
    paddingRight: 118,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    backgroundColor: '#0E2240',
  },
  container: {
    width: 296,
    height: 896,
    flexShrink: 0,
    backgroundColor: '#1A4071',
  },
  searchTitle: {
    width: 213,
    height: 45,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
  },
  searchFrame: {
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  playerBioGroup: {
    width: 256,
    height: 62,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#B2494A',
    marginTop: 20,
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
