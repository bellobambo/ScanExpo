// Manual.js
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system"; // Import FileSystem to save JSON

const Manual = () => {
  const route = useRoute<any>();
  const [input, setInput] = useState("");

  // Generate PDF and save input data as JSON
  const generatePdf = async () => {
    const date = new Date();
    const formattedDate = date.toLocaleString();

    // HTML for PDF
    const html = `
      <html>
        <body>
          <h1>Input Data</h1>
          <p>Input: ${input}</p>
          <p>Date: ${formattedDate}</p>
        </body>
      </html>
    `;

    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);

    // Save input data as JSON
    const jsonData = {
      input: input,
      date: formattedDate,
    };

    const jsonString = JSON.stringify(jsonData);
    const fileUri = FileSystem.documentDirectory + "inputData.json";

    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    console.log("JSON data saved to:", fileUri);
  };

  useEffect(() => {
    // Check if scanned data is passed
    if (route.params?.scannedData) {
      setInput(route.params.scannedData); // Set scanned data to input
    }
  }, [route.params?.scannedData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Data Manually</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your input"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Generate PDF" onPress={generatePdf} color="#00796b" />
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#004d40",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#00796b",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#00796b",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Manual;
