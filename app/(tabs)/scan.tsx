import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { launchCameraAsync, MediaTypeOptions } from "expo-image-picker"; // Import image picker for camera functionality

export default function Scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<string | null>(null); // State to store captured image

  // Handle permission state
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    // Launch camera and capture image
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images as any, // Use MediaTypeOptions or any type here
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Store the captured image
      console.log("Captured Image URI:", imageUri); // Log the captured image URI

      // Navigate to Manual and pass the image, using any type for the parameters
      navigation.navigate("manual", { scannedData: imageUri } as any);
    }
  }

  function closeCamera() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.camera} onPress={takePicture}>
        <Text style={styles.cameraText}>Tap to Take Picture</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialIcons name="flip-camera-ios" size={40} color="white" />
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeCamera}>
          <MaterialIcons name="close" size={40} color="white" />
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Captured Image: {image}</Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setImage(null)}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cameraText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  scannedDataContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  scannedDataText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
