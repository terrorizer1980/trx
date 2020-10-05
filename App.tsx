import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import TronWeb from 'tronweb'

const h: number = window.innerHeight

// declare const window: any

declare global {
  interface Window {
    tronWeb: any;
  }
}


export default function App() {

  // const [tw, setTw] = useState(null)
  // const [defaultAddress, setDefaultAddress] = useState(null)
  const [base58, setBase58] = useState(null)
  const [hex, setHex] = useState(null)

  async function gettronweb() {

    if (window.tronWeb) {
      const response = await window.tronWeb
      const trxaddress = response['defaultAddress']
      setHex(trxaddress.base58)
      setBase58(trxaddress.base58)

      if (response.hasOwnProperty('defaultAddress')) {
        console.log(trxaddress.hex)
      }
    }
    // const add = await response.defaultAddress

    // setBase58(await add.base58)
    // setHex(await add.hex)
  }

  useEffect(() => {
    document.title = `test link`
    gettronweb()

  })


  return (
    <View style={styles.container}>
      <View style={styles.navbar}>

        <Button title={`${hex}`} onPress={() => console.log(base58)} />
        <Button title={`${base58}`} onPress={() => console.log(hex)} />
      </View>
      <View style={styles.body}>
        <Text>{window.tronWeb ? 'tronlink connected ✔️' : 'not connected 🧰'}</Text>
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
    justifyContent: 'center',
    alignItems: 'center'

  },
  body: {
    flex: 1,

  }
});
