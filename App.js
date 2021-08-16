/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  StyleSheet,
  StatusBar,
  Alert,
  AppRegistry,
  Linking,
} from 'react-native';

import { BleManager } from 'react-native-ble-plx';
export const manager = new BleManager();
import base64 from 'react-native-base64'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import Loading from './components/Loading'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Info from './components/Info'
import Power from './components/Power'
import Connect from './components/Connect'
import Setup from './components/Setup'
import SetupWifi from './components/SetupWifi'
import SetupColor from './components/SetupColor'
import SetupServers from './components/SetupServers'
import End from './components/End'
import Docs from './components/Docs'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

const app_version = "1";
var interval_id = 0;
var devices_var = [];
var devices_id = []

const App: () => Node = () => {

  const [step, setStep] = useState("loading");
  const [devices, setDevices] = useState([])
  const [device, setDevice] = useState(false)
  const [connected, setConnected] = useState(false)
  const [show_connect_button, setshowConnectButton] = useState(false);
  const [color, setColor] = useState("#333333");
  const [ssid, setSsid] = useState("N/A");
  const [password, setPassword] = useState("");
  const [ota, setOta] = useState("N/A");
  const [broker, setBroker] = useState("N/A");
  const [topic, setTopic] = useState("ledlink");
  const [firmware_version, setFirmwareVersion] = useState("N/A");

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (Object.keys(remoteMessage.data).includes("type")){
        if (remoteMessage.data.type == "toast") {
          Toast.show({
            text1: remoteMessage.notification.title,
            text2: remoteMessage.notification.body,
            position: "bottom",
            bottomOffset: 100,
            autoHide: false,
            type: remoteMessage.data.severity,
            onPress: () => {
              if (remoteMessage.data.proccess === "download") {
                Linking.openURL(remoteMessage.data.url)
              }
            }
          });
        }
      }    
    });

    return unsubscribe;
  }, []);

  useEffect(async () => {
    connectFromMemory()
  }, []);

  const scan = () => {
    setStep("connect");
    interval_id = setInterval(() => {
      setDevices(devices_var);
    }, 500);
    
    manager.startDeviceScan(null, {allowDuplicates: false}, (error, device) => { 
      if (!!device) {    
        if (!!device.name) {
          if (!devices_id.includes(device.id)) {
            devices_id.push(device.id);
            devices_var.push(device);
          }
          
        }
      }
    });
  }

  const connectAndRead = async (connect_to) => {
    manager.stopDeviceScan();
    clearInterval(interval_id)
    setDevice(connect_to);
    setStep("loading");
    await AsyncStorage.setItem('device', connect_to.id)
    await AsyncStorage.setItem('auto_connect', "true")
    manager.connectToDevice(connect_to.id, {timeout: 5000})
    .then(
      connected_device => {
        setConnected(true);
        setDevice(connected_device);
        Toast.show({
          text1: "Bluetooth",
          text2: "Conexión establecida",
          position: "bottom",
          bottomOffset: 100,
          autoHide: true,
          visibilityTime: 1000,
          type: "success",
        });
        manager.discoverAllServicesAndCharacteristicsForDevice(connected_device.id)
        .then(
          services => {
            // Name
            manager.readCharacteristicForDevice(connected_device.id, "180A", "2A28")
            .then(
              characteristic => {setFirmwareVersion(base64.decode(characteristic.value))}
            )
            // Color
            manager.readCharacteristicForDevice(connected_device.id, "e63589ad-5603-49c8-b82d-b608c65d8d9c", "737bfbc4-3d44-44a0-bad0-3314a5714180")
            .then(
              characteristic => {setColor(base64.decode(characteristic.value)), setStep("home");}
            )
            // SSID
            manager.readCharacteristicForDevice(connected_device.id, "e63589ad-5603-49c8-b82d-b608c65d8d9c", "36fb19d4-f1e4-4892-b35b-68e364773f7b")
            .then(
              characteristic => {setSsid(base64.decode(characteristic.value))}
            )
            // OTA
            manager.readCharacteristicForDevice(connected_device.id, "e63589ad-5603-49c8-b82d-b608c65d8d9c", "d6c28322-259e-43c0-9db2-4c12f60de876")
            .then(
              characteristic => {setOta(base64.decode(characteristic.value))}
            )
            // Broker
            manager.readCharacteristicForDevice(connected_device.id, "e63589ad-5603-49c8-b82d-b608c65d8d9c", "02e9cf6d-5f8c-41b6-bdbe-089178521b63")
            .then(
              characteristic => {setBroker(base64.decode(characteristic.value));}
            )
            // Close conection
            manager.onDeviceDisconnected(connected_device.id, () => {
              setConnected(false);
              setColor("#333333");
              setStep("loading")
              Toast.show({
                text1: "Bluetooth",
                text2: "Se ha perdido la conexión con tu LED link.",
                position: "bottom",
                bottomOffset: 100,
                autoHide: true,
                visibilityTime: 3000,
                type: "error",
              });
              setTimeout(() => {
                setshowConnectButton(true);
              }, 5000)
            }) 
          }
        )
      }
    )
    .catch(
      (error) => {
        setshowConnectButton(true);
      }
    );
    
    
    
  }

  const connectFromMemory = async () => {
    setshowConnectButton(false);
    const auto_connect = await AsyncStorage.getItem('auto_connect')
    if(auto_connect !== null) {
      if(auto_connect === "true") {
        const id = await AsyncStorage.getItem('device')
        connectAndRead({id: id})
      } else {
        setStep("welcome");
      }
    } else {
      setStep("welcome");
    }
  }

  const sendWiFi = () => {
    manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
    .then(
      services => {
        manager.writeCharacteristicWithResponseForDevice(
          device.id,
          "e63589ad-5603-49c8-b82d-b608c65d8d9c",
          "36fb19d4-f1e4-4892-b35b-68e364773f7b",
          base64.encode(ssid)
          )
        .then((c) => {})
        manager.writeCharacteristicWithResponseForDevice(
          device.id,
          "e63589ad-5603-49c8-b82d-b608c65d8d9c",
          "caaaa902-4259-4e34-9c92-f24105608a53",
          base64.encode(password)
          )
        .then((c) => {
          Toast.show({
            text1: "WiFi",
            text2: "Se ha actualizado las credenciales WiFi.",
            position: "bottom",
            bottomOffset: 100,
          });
          setStep("setup");
        })
      }
    )
  }

  const sendColor = () => {
    manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
    .then(
      services => {
        manager.writeCharacteristicWithResponseForDevice(
          device.id,
          "e63589ad-5603-49c8-b82d-b608c65d8d9c",
          "737bfbc4-3d44-44a0-bad0-3314a5714180",
          base64.encode(color)
          )
        .then((c) => {
          Toast.show({
            text1: "Color",
            text2: "Se ha actualizado el color.",
            position: "bottom",
            bottomOffset: 100,
          });
          setStep("setup");
        })
      }
    )
  }

  const sendServer = () => {
    manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
      .then(
        services => {
          manager.writeCharacteristicWithResponseForDevice(
            device.id,
            "e63589ad-5603-49c8-b82d-b608c65d8d9c",
            "d6c28322-259e-43c0-9db2-4c12f60de876",
            base64.encode(ota)
            )
          .then((c) => {})
          manager.writeCharacteristicWithResponseForDevice(
            device.id,
            "e63589ad-5603-49c8-b82d-b608c65d8d9c",
            "02e9cf6d-5f8c-41b6-bdbe-089178521b63",
            base64.encode(broker)
            )
          .then((c) => {})
          manager.writeCharacteristicWithResponseForDevice(
            device.id,
            "e63589ad-5603-49c8-b82d-b608c65d8d9c",
            "3eee7dd7-94ce-4206-a163-dc8cb75d2751",
            base64.encode(topic)
            )
          .then((c) => {
            Toast.show({
              text1: "Servidores",
              text2: "Se ha actualizado la información de servidores.",
              position: "bottom",
              bottomOffset: 100,
            });
            setStep("setup");
          })
        }
      );
  }

  const sendReboot = () => {
    manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
      .then(
        services => {
          manager.writeCharacteristicWithoutResponseForDevice(
            device.id,
            "d9b655f5-0c49-491e-a4a0-c836826b30cf",
            "5ade4357-0226-4e39-b95d-b129f3f45be1",
            base64.encode("reboot")
            )
          .then((c) => {
            manager.cancelDeviceConnection(device.id);
          })
        }
      )
  }

  const sendUpdateFirmware = () => {
    manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
      .then(
        services => {
          manager.writeCharacteristicWithoutResponseForDevice(
            device.id,
            "d9b655f5-0c49-491e-a4a0-c836826b30cf",
            "5ade4357-0226-4e39-b95d-b129f3f45be1",
            base64.encode("update")
            )
          .then((c) => {
            Toast.show({
              text1: "Actualizando",
              text2: "Espera por favor.",
              position: "bottom",
              bottomOffset: 100,
              autoHide: 4000,
            });
            manager.cancelDeviceConnection(device.id);
          })
        }
      )
  }

  const renderPage = () => {
    if (step === "loading")
      return <Loading
                show_connect_button={show_connect_button}
                setStep={setStep}
                connectFromMemory={connectFromMemory}
              />
    else if (step === "welcome")
      return <Welcome setStep={setStep}/>
    else if (step === "home")
      return <Home
                device={device}
                color={color}
                connected={connected}
                step={step}
                setStep={setStep}
              />
    else if (step === "info")
      return <Info 
                device={device}
                color={color}
                firmware_version={firmware_version}
                app_version={app_version}
                ota={ota}
                updateFirmware={sendUpdateFirmware}
                step={step}
                setStep={setStep}
              />
    else if (step === "docs")
      return <Docs 
                step={step}
                setStep={setStep
              }/>
    else if (step === "power")
      return <Power setStep={scan}/>
    else if (step === "connect")
      return <Connect
                devices_list={devices}
                connectAndRead={connectAndRead}
              />
    else if (step === "setup")
      return <Setup
                step={step}
                setStep={setStep}
                />
    else if (step === "setupWifi")
      return <SetupWifi
                ssid={ssid}
                password={password} 
                setSsid={setSsid}
                setPassword={setPassword}
                setStep={setStep}
                sendWiFi={sendWiFi}
              />
    else if (step === "setupColor")
      return <SetupColor
                color={color}
                setColor={setColor}
                setStep={setStep}
                sendColor={sendColor}
              />
    else if (step === "setupServers")
      return <SetupServers
                ota={ota}
                broker={broker}
                topic={topic}
                setOta={setOta}
                setBroker={setBroker}
                setTopic={setTopic}
                setStep={setStep}
                sendServer={sendServer}
              />
    else if (step === "end")
      return <End sendReboot={sendReboot}/>
  }

  return (
    <>
      <StatusBar
        animated={false}
        backgroundColor={color}
        barStyle="default"
      />
      {renderPage()}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
