/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {get} from './src/api/index';
import _ from 'lodash';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listing, setListing] = useState([]);

  useEffect(() => {
    if (listing.length === 0) {
      get().then(response => {
        const listingData = _.get(response.data.data, 'children', null);

        setListing(listingData);
      });
    }

    console.log(listing);
  }, [listing]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={listing}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.item}>{item.data.selftext}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    width: '100%',
  },
  item: {
    padding: 10,
  },
});
