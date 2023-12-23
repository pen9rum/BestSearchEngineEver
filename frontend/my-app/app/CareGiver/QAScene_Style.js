import React from 'react';
import {  StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    QAarea: {
        paddingVertical: 10,
        //flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    Qitem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    Aitem:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    AtextInput:{
        height: '90%'
    },
    recordButton:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textInput: {
        width: '70%',
        height: 40,
    },
    textItem: {
        fontSize: 16,
        marginVertical: 5,
    },
    list: {
        flex: 1,
        flexDirection: 'column',
    },
    textArea:{
      height: 150,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1, // 確保它在其他內容之上
    },

});

export default styles;
