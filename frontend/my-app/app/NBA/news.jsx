import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NewsFromSearchEngine = () => {
  return (
    <View style={styles.container}>
      {/* Head Section */}
      <View style={styles.head}>
        {/*add link here*/}
        <Image
          source={require('frontend/my-app/assets/icons/x.png')}
          style={styles.closeIcon}
        />
        <Text style={styles.yahooNewsText}>Yahoo News</Text>
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        <Text style={styles.latestNewsText}>Latest News</Text>

        {/* News Blocks */}
        <View style={styles.newsBlock}>
          <Image
            source={require('frontend/my-app/assets/pic/News.png')}
            style={styles.newsPhoto}
          />
          <Text style={styles.dateText}>2024-01-10</Text>
          <Text style={styles.detailsText}>Details about the news...</Text>
          <Text style={styles.newsTitleText}>News Title</Text>
        </View>
        {/* More News Blocks can be added here */}
      </View>

      {/* Background Picture */}
      <Image
        source={require('<path-to-background-image>')}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        display: 'flex',
        width: 414,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 48,
        backgroundColor: '#001F3F',
  },
  head: {
    width: 414,
    height: 144,
    background: 'rgba(255, 199, 44, 0.90)',
  },
  closeIcon: {
    width: 34,
    height: 33,
    flexShrink: 0,
    // Add additional styles as needed
  },
  yahooNewsText: {
    width: 340,
    height: 50,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  info: {
    width: 413,
    height: 1002,
    // Add additional styles as needed
  },
  latestNewsText: {
    width: 210,
    height: 31,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  newsBlock: {
    display: 'inline-flex',
    padding: '15px 2px 27px 16px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    background: 'rgba(0, 31, 63, 0.50)',
  },
  newsPhoto: {
    width: 143,
    height: 129,
    flexShrink: 0,
    borderRadius: 10,
    background: 'url(frontend/my-app/assets/pic/yahooNews.png) lightgray 50% / cover no-repeat',
  },
  dateText: {
    display: 'flex',
    width: 95,
    height: 26,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexShrink: 0,
    color: '#7D7D7D',
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  detailsText: {
    width: 197,
    height: 46,
    flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  },
  newsTitleText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
  },
  backgroundImage: {
    width: 1002,
    height: 413,
    transform: 'rotate(-90deg)',
    flexShrink: 0,
    opacity: 0.8,
    background: 'url(frontend/my-app/assets/pic/News.png) lightgray 50% / cover no-repeat',
  },
});

export default NewsFromSearchEngine;
