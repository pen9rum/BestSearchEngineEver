import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const Result = () => {
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
const handleCloseClick = () =>{
    navigation.navigate('search');
};

return (
    <View style={styles.result}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleCloseClick}>
      <Image
           source={require('../../assets/icons/x.png')}
           style={styles.close}
        />
        </TouchableOpacity>
      <Image
          source={{ uri: '../../assets/pic/image 1.jpg' }} 
          style={styles.playerImg}
        />
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
        <TouchableOpacity onPress={handlePlayerBioClick}>
            <Image
            source={require('../../assets/pic/Bio.png')}
            style={styles.BioPic}
            />
            <Text style={styles.infoChoice}>Player Bio</Text>
            <View>
                <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
                />
            </View>

        </TouchableOpacity>
        </View>
        <View style={styles.infoBlock}>
        <TouchableOpacity onPress={handlePlayerNewsClick}>
            <Image
            source={require('../../assets/pic/News.png')}
            style={styles.NewsPic}
            />
            <Text style={styles.infoChoice}>Player News</Text>
            <View>
                <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
                />
            </View>
        </TouchableOpacity>
        </View>
        <View style={styles.infoBlock}>
        <TouchableOpacity onPress={handleOthersClick}>
            <Image
            source={require('../../assets/pic/Others.png')}
            style={styles.OthersPic}
            />
            <Text style={styles.infoChoice}>Others</Text>
            <View>
                <LinearGradient
                colors={['#000', 'rgba(0, 0, 0, 0.00)']}
                style={styles.linearDec}
                />
            </View>
        </TouchableOpacity>
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
    display: flex,
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
  transform: [{ rotate: '-90deg' }],
  flexShrink: 0,
  opacity: 0.95,
  background: 'url(frontend/my-app/assets/pic/Bio.png) lightgray 50% / cover no-repeat',
  },
  NewsPic:{
  width: 414,
  height: 179,
  flexShrink: 0,
  background: 'url(frontend/my-app/assets/pic/News.png) lightgray 50% / cover no-repeat',
  },
  OthersPic:{
    width: 414,
    height: 179,
    flexShrink: 0,
    background: 'url(frontend/my-app/assets/pic/Others.png) lightgray 50% / cover no-repeat',
    },
});

export default Result;
