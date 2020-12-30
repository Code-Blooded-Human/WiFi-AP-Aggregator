
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Button} from 'react-native-paper'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import Slider from '@react-native-community/slider';




function createPoint(lat,long)
{
  return {x:lat, y:long}
}



function convexHull(points) {
    points.sort(comparison);
    var L = [];
    for (var i = 0; i < points.length; i++) {
        while (L.length >= 2 && cross(L[L.length - 2], L[L.length - 1], points[i]) <= 0) {
            L.pop();
        }
        L.push(points[i]);
    }
    var U = [];
    for (var i = points.length - 1; i >= 0; i--) {
        while (U.length >= 2 && cross(U[U.length - 2], U[U.length - 1], points[i]) <= 0) {
            U.pop();
        }
        U.push(points[i]);
    }
    L.pop();
    U.pop();
    return L.concat(U);
}
 
function comparison(a, b) {
    return a.x == b.x ? a.y - b.y : a.x - b.x;
}
 
function cross(a, b, o) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

















function ViewAPMap(props) {
  const [userLocation, setUserLocation] = React.useState({latitude:undefined,longitude:undefined,latitudeDelta:undefined,longitudeDelta:undefined});
  const [isUserLocationSet, setIsUserLocationSet] = React.useState(false);
  const [listAP, setListAP] = React.useState(undefined);
  const [polygonCoordinates, setPolygonCoordinates] = React.useState([]);
  const [sliderValue,setSliderValue] = React.useState(50);
  const setCurrentLocation = (locationData)=>
  {
    var lat = locationData.coords.latitude;
    var long = locationData.coords.longitude;
    console.log(locationData);
    setUserLocation({latitude:lat,longitude:long, latitudeDelta:0.0002, longitudeDelta:0.0002});
    setIsUserLocationSet(true);
    fetchData();
  }
  const setData = (data)=>{
      console.log(data);
    var list = [];
    var poly =[];
    for(i in data)
    {
      list.push({latlong:{latitude:parseFloat(data[i]["lattitude"]), longitude:parseFloat(data[i]["longitude"])}});
      poly.push({latitude:parseFloat(data[i]["lattitude"]), longitude:parseFloat(data[i]["longitude"])});
    }
    setListAP(list);
    setPolygonCoordinates(poly);
    polyCord(list);
    console.log(list);
  }
  const fetchData = () =>{
    fetch('https://wirelessproject.000webhostapp.com/abhi/getLocation.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({mac:props.route.params.mac})
  }).then(response => {return response.json()}).then(response => {setData(response)}).catch(err => {
    console.log(err);
  });

  
  }



  const polyCord = (list)=>
  {
    var cord = [];
    var hull;
    for(i in list)
    {
      cord.push({x:list[i].latlong.latitude,y:list[i].latlong.longitude});
    }
    hull = convexHull(cord);
    var finalList = []
    for(i in hull)
    {
      finalList.push({latitude:hull[i].x,longitude:hull[i].y});
    }
    console.log(finalList,"final");
    setPolygonCoordinates(finalList);
  }

  React.useEffect(()=>{
    Geolocation.getCurrentPosition((locationData) => {setCurrentLocation(locationData)});
    console.log(props.route.params.mac)
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
     <Polygon coordinates={polygonCoordinates} fillColor="rgba(255,99,71,0.5)" />
    </MapView>
    </View>
    <View style={styles.bottomSlider}>
      <Button mode="contained" onPress={()=>{fetchData();}}style={{marginBottom:10}}>{sliderValue} Meters</Button>
      
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

export default ViewAPMap