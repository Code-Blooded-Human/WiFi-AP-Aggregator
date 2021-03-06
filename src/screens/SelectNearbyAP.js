
import React from 'react'
import { StyleSheet, View, Text, ScrollView} from 'react-native'
import {List, Button} from 'react-native-paper'
import WifiManager from "react-native-wifi-reborn";

function SelectNearbyAP(props) {
  /*
    props.routes.params.preciseUserLocation : {latitude, longitude}
  */
  const [listAP, setListAP] = React.useState([]);
  const [isScanComplete,setIsScanComplete] = React.useState(false);
  const [userLocation,setUserLocation] = React.useState({lat:undefined,long:undefined});
  const listWifi = async ()=>
  {
    const list = await WifiManager.reScanAndLoadWifiList();
    setListAP(list);
    setIsScanComplete(true);
  }
  
  const createJsonObj = (ap) =>
  {
    var ret = {ssid:ap.SSID, mac:ap.BSSID, lat:userLocation.lat,long:userLocation.long,rssi:ap.level, security:ap.capabilities, freq:ap.frequency};
    return ret;
  }
  const strengthIcon = (rssi,security)=>{
    rssi = -1*rssi;
    var ret = undefined;
    if(rssi>0 & rssi <25)
    {
      ret = 'wifi-strength-4';
    }
    if(rssi>=25 & rssi <50)
    {
      ret = 'wifi-strength-3' ;
    }
    if(rssi>=50 & rssi <75)
    {
      ret = 'wifi-strength-2';
    }
    if(ret == undefined)
    {
      ret = 'wifi-strength-1'
    }
    if(security != "[ESS][SEC80][SECD00]")
    {
      ret = `${ret}-lock`
    }
    return(ret);
  }
  
  const showOnMap = (mac)=>
  {
    props.navigation.navigate('ViewAPMap',{mac:mac})
  }

  React.useEffect(()=>{
    listWifi();
    
  },[]);

  if(isScanComplete){
    return(
      <View style={{flex:1}}>
      <ScrollView>
      <List.Section title="Nearby Access Point list">
      {
        listAP.map((item,key) => (
          <List.Accordion
            key={key}
            title={item.SSID}
            left={props => <List.Icon {...props} icon={strengthIcon(item.level, item.capabilities)} />}>
            <List.Item title={`Frequency: ${(item.frequency/1000)} MHz`} />
            <List.Item title={`Signal Strength: ${item.level}`} />
            <List.Item title={`Security: ${item.capabilities}`} />
            <List.Item title={`BSSID: ${item.BSSID}`} />
            <List.Item title="" right={props =><Button onPress={()=>{showOnMap(item.BSSID)}} mode="contained"> View all locations on map</Button>}></List.Item>
          </List.Accordion>
        )
        )
      }
      </List.Section>
      </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanning for WiFi AP nearby!</Text>
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
  btnContent:{
    height:50
  }
})

export default SelectNearbyAP