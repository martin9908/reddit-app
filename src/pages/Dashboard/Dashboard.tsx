import React, {FC} from 'react';
import {FlatList, Text, View} from 'react-native';
import _ from 'lodash';
import styles from './styles';
import {DashboardProps} from './types';

const Dashboard: FC<DashboardProps> = ({listing}) => {
  return (
    <>
      {listing !== null && (
        <FlatList
          testID="itemList"
          data={listing}
          renderItem={({item}) => {
            const text = _.get(item, 'data.selftext', null);

            return (
              <View style={styles.container}>
                <Text style={styles.item}>{text}</Text>
              </View>
            );
          }}
        />
      )}
      {listing === null && <Text testID="Empty">No Items to Show</Text>}
    </>
  );
};

export default Dashboard;
