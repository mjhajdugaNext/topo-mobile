import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import colors from '@/src/shared/enums/colors';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const [search, setSearch] = React.useState('');

  const onChangeSearch = (query: string): void => {
    setSearch(query);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search..."
            onChangeText={onChangeSearch}
            value={search}
            style={styles.searchBar}
            iconColor={colors.darkBlue}
            inputStyle={styles.searchBarInput}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Topo Mobile</Text>
          <Text style={styles.descriptionText}>
            Explore climbing routes, crags, and more
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    elevation: 0,
    borderRadius: 20,
  },
  searchBarInput: {
    color: colors.darkBlue,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  descriptionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
