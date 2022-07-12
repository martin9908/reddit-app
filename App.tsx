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
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {get} from './src/api/index';
import storage from './src/storage/index';
import _ from 'lodash';
import Dashboard from './src/pages/Dashboard';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listing, setListing] = useState<Array<Object> | null>([]);
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
    if (listing?.length === 0) {
      get().then(response => {
        const listingData = _.get(response.data.data, 'children', null);

        storage.save({
          key: 'listing',
          data: listingData,
        });

        setListing(listingData);
      });
    } else {
      setListing(null);
    }
  }, [listing]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Dashboard listing={listing} />
    </SafeAreaView>
  );
};

export default App;
