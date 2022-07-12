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
import {useNetInfo} from '@react-native-community/netinfo';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {get} from './src/api/index';
import storage from './src/storage/index';
import _ from 'lodash';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listing, setListing] = useState([]);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (!netInfo.isConnected) {
      storage
        .load({
          key: 'listing',
        })
        .then(ret => {
          setListing(ret);
        });
    }
  }, [netInfo]);

  useEffect(() => {
    if (listing.length === 0) {
      get().then(response => {
        const listingData = _.get(response.data.data, 'children', null);

        storage.save({
          key: 'listing',
          data: listingData,
        });

        setListing(listingData);
      });
    }
  }, [listing]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={listing}
        renderItem={({item}) => {
          const {data} = item;
          const text = _.get(data, 'selftext', null);

          return (
            <View style={styles.container}>
              <Text style={styles.item}>{text}</Text>
            </View>
          );
        }}
      />
      {listing.length === 0 && <Text>No Items to Show</Text>}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
  },
  item: {
    padding: 10,
  },
});
