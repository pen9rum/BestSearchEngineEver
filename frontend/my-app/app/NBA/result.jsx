import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Link } from "expo-router";
import { Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchGoogle, searchStats } from "../utils";


const Result = () => {
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playerStats, setPlayerStats] = useState();


  useEffect(() => {
    const fetchData = async () => {
      const storedPlayerName = await AsyncStorage.getItem('playerName');

      const hasPlayerName = await AsyncStorage.getItem('hasSearchPlayerName');

      setPlayerName(storedPlayerName);

      console.log("has playerName = " + hasPlayerName)
      console.log("storePlayerName = " + storedPlayerName)
      if (storedPlayerName === hasPlayerName) {
        const playerStats = await AsyncStorage.getItem('PlayerStats');
        setPlayerStats(JSON.parse(playerStats));
        return;
      }
      await AsyncStorage.setItem('hasSearchPlayerName', storedPlayerName);

      setIsLoading(true);
      const googleSearchData = await searchGoogle(storedPlayerName);
      // const googleSearchData = 
      //   {
      //     "news": [
      //         {
      //             "title": "Leads off bench in loss",
      //             "content": "Alexander-Walker logged eight points (3-3 FG, 2-2 3Pt), one rebound, three assists and one steal in 19 minutes during Tuesday's 129-106 loss to the Thunder.",
      //             "date": "12/27/2023, 3:59 PM"
      //         },
      //         {
      //             "title": "Coming off bench",
      //             "content": "Alexander-Walker will come off the bench Thursday versus the Mavericks.",
      //             "date": "12/15/2023, 1:06 AM"
      //         },
      //         {
      //             "title": "All-around performance in win",
      //             "content": "Alexander-Walker logged a season-high 20 points (8-16 FG, 4-8 3Pt), seven assists, five rebounds, five steals and two blocks over 36 minutes in Thursday's 101-90 victory over the Jazz.",
      //             "date": "12/01/2023, 10:35 PM"
      //         },
      //         {
      //             "title": "Solid performance in start",
      //             "content": "Alexander-Walker contributed seven points (3-6 FG, 1-4 3Pt), six rebounds, four assists and one block across 29 minutes during Wednesday's 112-99 victory over the 76ers.",
      //             "date": "11/23/2023, 6:17 PM"
      //         },
      //         {
      //             "title": "Gets starting nod",
      //             "content": "Alexander-Walker is in the starting lineup for Wednesday's game versus the 76ers.",
      //             "date": "11/23/2023, 12:36 AM"
      //         }
      //     ],
      //     "playerInfo": [
      //         {
      //             "score": "30000.0",
      //             "title": "WIKI Nickeil Alexander-Walker",
      //             "url": "https://en.wikipedia.org/wiki/Nickeil Alexander-Walker"
      //         },
      //         {
      //             "score": "734.0",
      //             "title": "Nickeil Alexander-Walker - Minnesota Timberwolves Shooting Guard",
      //             "url": "https://www.espn.com/nba/player/_/id/4278039/nickeil-alexander-walker"
      //         },
      //         {
      //             "score": "237.5",
      //             "title": "Nickeil Alexander-Walker - Basketball-Reference.com",
      //             "url": "https://www.basketball-reference.com/players/a/alexani01.html"
      //         },
      //         {
      //             "score": "123.5",
      //             "title": "Nickeil Alexander-Walker - Wikipedia",
      //             "url": "https://en.wikipedia.org/wiki/Nickeil_Alexander-Walker"
      //         }
      //     ],
      //     "others": [
      //         {
      //             "score": "30000.0",
      //             "title": "WIKI Nickeil Alexander-Walker",
      //             "url": "https://en.wikipedia.org/wiki/Nickeil Alexander-Walker"
      //         }
      //     ]
      // }

      await AsyncStorage.setItem('NewsData', JSON.stringify(googleSearchData.news));
      await AsyncStorage.setItem('PlayerInfoData', JSON.stringify(googleSearchData.playerInfo));
      await AsyncStorage.setItem('OthersData', JSON.stringify(googleSearchData.others));

      console.log(googleSearchData)


      const stats = await searchStats();
//       const stats = { 
//     "imageUrl": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629638.png",
//     "prg": "6.3",
//     "pie": "5.9",
//     "rpg": "1.7",
//     "apg": "2.4"
//  }
await AsyncStorage.setItem('PlayerStats', JSON.stringify(stats));
      console.log(stats);
      setPlayerStats(stats);

      setIsLoading(false);
    };
    fetchData();
  }, []);


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

        {isLoading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'start' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {!isLoading &&
          <ImageBackground
            source={{ uri: playerStats?.imageUrl || require("../../assets/pic/player.jpg") }}
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
              {playerName}
            </Text>

          </ImageBackground>
        }

        {!isLoading &&
          <View>
            <Text style={styles.statisticsTitle}>Statistics</Text>
          </View>
        }

        {!isLoading &&
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
              <Text style={styles.statistic}>{playerStats?.prg || 27.6}</Text>
            </View>
            <View style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
              <Text style={styles.statistic}>RPG</Text>
              <Text style={styles.statistic}>{playerStats?.rpg || 4.4}</Text>
            </View>
            <View style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
              <Text style={styles.statistic}>APG</Text>
              <Text style={styles.statistic}>{playerStats?.apg || 4.6}</Text>
            </View>
            <View style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
              <Text style={styles.statistic}>PIE</Text>
              <Text style={styles.statistic}>{playerStats?.pie || 14.5}</Text>
            </View>
          </View>
        }

        {!isLoading &&
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
        }
      </View>



    </ImageBackground >
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
