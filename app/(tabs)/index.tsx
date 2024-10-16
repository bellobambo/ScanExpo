import { Image, StyleSheet, SafeAreaView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#E9DFF8", dark: "#1D3D47" }} // Light purple theme
        headerImage={
          <Image
            source={require("@/assets/images/scanning.png")}
            style={styles.heroImage}
          />
        }
      >
        {/* Hero Section */}
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.heroText}>
            Welcome!
          </ThemedText>
          <ThemedText type="subtitle" style={styles.heroSubtitle}>
            Simplifying Data Input
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  heroImage: {
    height: 250,
    width: "100%",
    resizeMode: "cover",
  },
  heroSection: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
  },
  heroText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "teal",
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "teal",
  },
});
