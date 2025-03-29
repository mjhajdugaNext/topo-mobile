import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import colors from '@/src/shared/enums/colors';

interface RouteItem {
  id: string;
  name: string;
  grade: string;
  crag: string;
  type: string;
  length: string;
}

interface RoutesScreenProps {
  navigation: any;
}

export default function RoutesScreen({ navigation }: RoutesScreenProps): JSX.Element {
  // Mock data for climbing routes
  const routesData: RouteItem[] = [
    {
      id: '1',
      name: 'Moonlight Buttress',
      grade: '5.12+',
      crag: 'Zion National Park',
      type: 'Trad',
      length: '1,200 ft',
    },
    {
      id: '2',
      name: 'The Nose',
      grade: '5.14a',
      crag: 'El Capitan, Yosemite',
      type: 'Big Wall',
      length: '2,900 ft',
    },
    {
      id: '3',
      name: 'Biographie',
      grade: '9a+',
      crag: 'Céüse, France',
      type: 'Sport',
      length: '115 ft',
    },
    {
      id: '4',
      name: 'Dreamcatcher',
      grade: '5.14d',
      crag: 'Squamish, Canada',
      type: 'Sport',
      length: '70 ft',
    },
    {
      id: '5',
      name: 'Midnight Lightning',
      grade: 'V8',
      crag: 'Camp 4, Yosemite',
      type: 'Boulder',
      length: '15 ft',
    },
  ];

  const renderRouteItem = ({ item }: { item: RouteItem }) => (
    <Card style={styles.card} onPress={() => console.log(`Selected route: ${item.name}`)}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.name}</Title>
        <View style={styles.detailsRow}>
          <Chip style={styles.gradeChip}>{item.grade}</Chip>
          <Chip style={styles.typeChip}>{item.type}</Chip>
          <Text style={styles.lengthText}>{item.length}</Text>
        </View>
        <Paragraph style={styles.cragText}>{item.crag}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Climbing Routes</Text>
      </View>
      <FlatList
        data={routesData}
        renderItem={renderRouteItem}
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
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  gradeChip: {
    backgroundColor: colors.orange,
    marginRight: 8,
  },
  typeChip: {
    backgroundColor: colors.lightBlue,
    marginRight: 8,
  },
  lengthText: {
    color: colors.darkGrey,
  },
  cragText: {
    color: colors.darkGrey,
    fontStyle: 'italic',
  },
});
