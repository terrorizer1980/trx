import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import TronWeb from 'tronweb'

const h: number = window.innerHeight

// We include tronWeb as a global variable of window
declare global {
  interface Window {
    tronWeb: {
      defaultAddress: any,
      fullnodeVersion: any,
      ready: any
    };
  }
}


export default function App() {

  // const [tw, setTw] = useState(null)
  // const [defaultAddress, setDefaultAddress] = useState(null)
  const [base58, setBase58] = useState(null)
  const [hex, setHex] = useState('')
  const [fullnodeVersion, setFullNodeVersion] = useState(null)
  const [firstHex, setFirstHex] = useState('')
  const [lastHex, setLastHex] = useState('')

  async function gettronweb() {

    const response = await window.tronWeb
    const trxaddress = await response['defaultAddress']
    const fnv = await response['fullnodeVersion']
    setHex(trxaddress.hex)
    setBase58(trxaddress.base58)
    setFullNodeVersion(fnv)
    setFirstHex(typeof hex == 'boolean' ? '👨‍🔧' : hex)
    setLastHex(hex)

    if (response.hasOwnProperty('defaultAddress')) {
      console.log(trxaddress.hex)
    }

    if (window.tronWeb) {
      // console.log(fnv)
      // console.log(response)
      return
    }
    // const add = await response.defaultAddress

    // setBase58(await add.base58)
    // setHex(await add.hex)
  }

  useEffect(() => {
    document.title = `test link`
    if (window.tronWeb && window.tronWeb.ready) {
      gettronweb()
    } else {
      console.log(hex)
      // return
    }

  })

  const first = typeof hex
  const last = typeof base58


  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <View style={styles.buttonView}>
          <Button title={`${firstHex} ... ${lastHex}`} onPress={() => console.log(base58)} />
        </View>
        <View style={styles.buttonView}>
          <Button title={`${base58}`} onPress={() => console.log(hex)} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>{hex !== null || false ? `tronlink connected v${fullnodeVersion} ✔️` : 'not connected 🧰'}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    backgroundColor: '#222',
    height: 100,
    flexDirection: 'row'
    // justifyContent: 'space-between',
    // alignItems: 'center',

  },
  text: {
    fontSize: 16
  },
  body: {
    flex: 1,
    padding: 10

  },
  buttonView: {
    justifyContent: 'space-around',
    marginLeft: 10,
    // flexDirection: "row"
  }
});
