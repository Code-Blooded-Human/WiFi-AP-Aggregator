
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Button} from 'react-native-paper'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Slider from '@react-native-community/slider';


function ShowAP(props) {
  const [userLocation, setUserLocation] = React.useState({latitude:undefined,longitude:undefined,latitudeDelta:undefined,longitudeDelta:undefined});
  const [isUserLocationSet, setIsUserLocationSet] = React.useState(false);
  const [listAP, setListAP] = React.useState(undefined);
  const [sliderValue,setSliderValue] = React.useState(50);
  const setCurrentLocation = (locationData)=>
  {
    var lat = locationData.coords.latitude;
    var long = locationData.coords.longitude;
    console.log(locationData);
    setUserLocation({latitude:lat,longitude:long, latitudeDelta:0.0002, longitudeDelta:0.0002});
    
    setIsUserLocationSet(true);
    // props.navigation.navigate('ScanAP');
    fetchData(lat, long, 50);
  }
  const setData = (data)=>{
    var list = [];
    for(i in data)
    {
      list.push({latlong:{latitude:data[i]["avgLat"], longitude:data[i]["avgLong"]}, SSID:data[i]["ssid"]});
    }
    setListAP(list);
    console.log(list);
  }
  const fetchData = (lat, long, dist) =>{
    fetch('https://wirelessproject.000webhostapp.com/abhi/closebyDev.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({lat:lat,long:long,dist:dist})
  }).then(response => {return response.json()}).then(response => {setData(response)}).catch(err => {
    console.log(err);
  });

  
  }


  React.useEffect(()=>{
    Geolocation.getCurrentPosition((locationData) => {setCurrentLocation(locationData)});

  },[]);



  if(!isUserLocationSet || listAP == undefined)
  {
    return(
      <View>
      <Text> Loading.. </Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>

     <View style={{flex:1, height:"100%",width:"100%"}}>
     <MapView
     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
     style={styles.map}
     initialRegion={userLocation} >
     {listAP.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.latlong}
        title={marker.SSID}
        description="No description"
      />
    ))}
    </MapView>
    </View>
    <View style={styles.bottomSlider}>
      <Button mode="contained" onPress={()=>{fetchData(userLocation.latitude,userLocation.longitude,sliderValue);}}style={{marginBottom:10}}>{sliderValue} Meters</Button>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={50}
        maximumValue={3000}
        step={50}
        maximumTrackTintColor="#232931"
        minimumTrackTintColor="#4ecca3"
        thumbImage={require('../../assets/img/zoom.png')}
        onValueChange = {(value)=>{setSliderValue(value)}}
        
      />
     </View>
   
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
  },
  bottomSlider:
  {
    position:'absolute',
    bottom:20
  }
  
})

export default ShowAP