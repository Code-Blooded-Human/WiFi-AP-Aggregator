// src/screens/Home.js

import React from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import {Button} from 'react-native-paper'

function Home(props) {
  return (
    <View style={styles.container}>
    <View style={styles.imgContainter} >
      <Image style= {{flex:1 , width: undefined, height: undefined}}    
       source={require('../assets/img/router.png')}
        />
    </View>
    <Text style={styles.title}>WiFi access point location tracker</Text>
    <View>
    <Button mode="contained" style={styles.btn} contentStyle={styles.btnContent} onPress={()=>{props.navigation.navigate('ScanAP')}}>
        <Text>Scan WiFi Access Points</Text>
    </Button>
    <Button mode="contained" style={styles.btn} contentStyle={styles.btnContent} onPress={()=>{props.navigation.navigate('ShowAP')}}>
        <Text>Show WiFi Aceess Points</Text>
    </Button>
    <Button mode="contained" style={styles.btn} contentStyle={styles.btnContent} onPress={()=>{props.navigation.navigate('FindLocation')}}>
        <Text>Find My location using WiFi</Text>
    </Button>
    <Button mode="contained" style={styles.btn} contentStyle={styles.btnContent} onPress={()=>{props.navigation.navigate('SelectNearbyAP')}}>
    <Text>Coverage Area</Text>
</Button>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  img:{
      resizeMode:'contain',
      margin:0,
      padding:0,
  },
  imgContainter:{
      marginTop:50,
    width:200,
      height:200,
  },
  title:
  {
      fontSize:20,
      paddingTop:20,
      paddingBottom:20,
  },
  btn:
  {
    backgroundColor:"#232931",
    width:300,
    marginTop:20,
  },
  btnContent:
  {
      height:60
  }

})

export default Home