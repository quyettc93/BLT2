import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { BleManager } from "react-native-ble-plx";

const BluetoothScreen = () => {
  const [manager] = useState(new BleManager());
  const [device, setDevice] = useState(null);

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, [manager]);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log(error);
        return;
      }

      // Kiểm tra tên thiết bị Bluetooth (HC-05 thường có tên là 'HC-05')
      if (scannedDevice.name === "HC-05") {
        manager.stopDeviceScan();
        setDevice(scannedDevice);
        connectToDevice(scannedDevice);
      }
    });
  };

  const connectToDevice = async (device) => {
    try {
      await device.connect();
      await device.discoverAllServicesAndCharacteristics();
      Alert.alert("Kết nối thành công", `Đã kết nối với ${device.name}`);
    } catch (error) {
      console.log("Lỗi khi kết nối:", error);
    }
  };

  const sendData = async () => {
    if (device) {
      try {
        // Thay đổi UUID này theo board HC-05 của bạn
        const serviceUUID = "your-service-uuid";
        const characteristicUUID = "your-characteristic-uuid";

        await device.writeCharacteristicWithResponseForService(
          serviceUUID,
          characteristicUUID,
          "Hello HC-05"
        );
        Alert.alert("Dữ liệu đã gửi", "Gửi thành công dữ liệu tới HC-05");
      } catch (error) {
        console.log("Lỗi khi gửi dữ liệu:", error);
      }
    } else {
      Alert.alert("Chưa kết nối", "Không tìm thấy thiết bị HC-05");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Kết nối Bluetooth với HC-05</Text>
      <Button title="Scan & Connect" onPress={scanAndConnect} />
      <Button title="Gửi Dữ Liệu" onPress={sendData} disabled={!device} />
    </View>
  );
};

export default BluetoothScreen;
