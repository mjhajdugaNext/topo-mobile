import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, List } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import colors from '@/src/shared/enums/colors';

interface AboutScreenProps {
  navigation: any;
}

export default function AboutScreen({ navigation }: AboutScreenProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About Topo Mobile</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.appInfoSection}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Topo Mobile</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Your ultimate companion for finding and tracking climbing routes and crags around the world.
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <List.Item
            title="Climbing Route Database"
            description="Access thousands of climbing routes with detailed information"
            left={props => <List.Icon {...props} icon="map-marker" color={colors.orange} />}
          />
          <List.Item
            title="Crag Information"
            description="Find detailed information about climbing locations worldwide"
            left={props => <List.Icon {...props} icon="mountain" color={colors.orange} />}
          />
          <List.Item
            title="Route Tracking"
            description="Log your climbs and track your progress"
            left={props => <List.Icon {...props} icon="chart-line" color={colors.orange} />}
          />
          <List.Item
            title="Offline Access"
            description="Download routes and crags for offline use"
            left={props => <List.Icon {...props} icon="download" color={colors.orange} />}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Button
            mode="contained"
            icon="email"
            onPress={() => Linking.openURL('mailto:support@topomobile.com')}
            style={styles.contactButton}
            labelStyle={styles.buttonLabel}
          >
            Email Support
          </Button>
          <Button
            mode="contained"
            icon="web"
            onPress={() => Linking.openURL('https://topomobile.com')}
            style={styles.contactButton}
            labelStyle={styles.buttonLabel}
          >
            Visit Website
          </Button>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialIcons}>
            <FontAwesome name="facebook-square" size={40} color={colors.darkBlue} style={styles.socialIcon} />
            <FontAwesome name="instagram" size={40} color={colors.darkBlue} style={styles.socialIcon} />
            <FontAwesome name="twitter-square" size={40} color={colors.darkBlue} style={styles.socialIcon} />
            <FontAwesome name="youtube-square" size={40} color={colors.darkBlue} style={styles.socialIcon} />
          </View>
        </View>

        <View style={styles.creditsSection}>
          <Text style={styles.creditsText}>© 2025 Topo Mobile. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleWhite,
  },
  header: {
    padding: 16,
    backgroundColor: colors.darkBlue,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  appInfoSection: {
    alignItems: 'center',
    padding: 24,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    color: colors.darkGrey,
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkGrey,
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 16,
  },
  featuresSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  contactSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  contactButton: {
    marginBottom: 12,
    backgroundColor: colors.darkBlue,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  },
  socialSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  socialIcon: {
    marginHorizontal: 12,
  },
  creditsSection: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  creditsText: {
    color: colors.darkGrey,
    fontSize: 14,
  },
});
