
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Button} from 'react-native-paper'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

function SetLocation(props) {
  const [userLocation, setUserLocation] = React.useState({latitude:undefined,longitude:undefined,latitudeDelta:undefined,longitudeDelta:undefined});
  const [isUserLocationSet, setIsUserLocationSet] = React.useState(false);
  const [preciseUserLocation,setPreciseUserLocation] = React.useState(undefined);
  const setCurrentLocation = (locationData)=>
  {
    lat = locationData.coords.latitude;
    long = locationData.coords.longitude;
    console.log(locationData);
    setUserLocation({latitude:lat,longitude:long, latitudeDelta:0.0002, longitudeDelta:0.0002});
    setPreciseUserLocation({latitude:lat,longitude:long})
    setIsUserLocationSet(true);
    // props.navigation.navigate('ScanAP');
  }
  
  const next = () =>
  {
    if(preciseUserLocation != undefined)
    {
      props.navigation.navigate('FindAP',{preciseUserLocation:preciseUserLocation})
    }
  }




  React.useEffect(()=>{
    Geolocation.getCurrentPosition((locationData) => {setCurrentLocation(locationData)});
  },[]);



  if(!isUserLocationSet)
  {
    return(
      <View>
      <Text> Loading.. </Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={userLocation}
      >
      <Marker draggable
        coordinate={userLocation}
        onDragEnd={(e) => setPreciseUserLocation(e.nativeEvent.coordinate) }
        title="Your location"
        description="Long press to move me to your precise location."
       />
      </MapView>
      <Button onPress={()=>{next()}} mode="contained" style={styles.btn} contentStyle={styles.btnContent}><Text style={styles.btnText}>Next</Text></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  map:
  {
    ...StyleSheet.absoluteFillObject,
  },
  btn:
  {
    position:'absolute',
    bottom:20,
    backgroundColor:"#071e3d"
  },
  btnContent:
  {
    padding:10,
    height:50,
    
  },
  btnText:{
    fontSize:30
  }
})

export default SetLocation