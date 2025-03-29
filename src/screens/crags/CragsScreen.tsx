import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';
import colors from '@/src/shared/enums/colors';

interface CragItem {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface CragsScreenProps {
  navigation: any;
}

export default function CragsScreen({ navigation }: CragsScreenProps): JSX.Element {
  // Mock data for crags
  const cragsData: CragItem[] = [
    {
      id: '1',
      name: 'Red Rock Canyon',
      location: 'Nevada, USA',
      description: 'Famous for its sandstone cliffs and diverse climbing routes.',
    },
    {
      id: '2',
      name: 'Fontainebleau',
      location: 'France',
      description: 'World-renowned bouldering destination with thousands of problems.',
    },
    {
      id: '3',
      name: 'Yosemite',
      location: 'California, USA',
      description: 'Iconic big wall climbing in the heart of Yosemite National Park.',
    },
    {
      id: '4',
      name: 'Kalymnos',
      location: 'Greece',
      description: 'Mediterranean sport climbing paradise with limestone cliffs.',
    },
    {
      id: '5',
      name: 'El Chorro',
      location: 'Spain',
      description: 'Famous for the Caminito del Rey and excellent limestone climbing.',
    },
  ];

  const renderCragItem = ({ item }: { item: CragItem }) => (
    <Card style={styles.card} onPress={() => console.log(`Selected crag: ${item.name}`)}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.name}</Title>
        <Paragraph style={styles.cardLocation}>{item.location}</Paragraph>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Climbing Crags</Text>
      </View>
      <FlatList
        data={cragsData}
        renderItem={renderCragItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 8,
  },
  cardTitle: {
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  cardLocation: {
    color: colors.darkGrey,
    marginBottom: 8,
  },
});
