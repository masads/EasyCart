import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Layout} from '@ui-kitten/components';
import CustomHeader from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {getNotifications, getProducts, readNotification} from '../store/actions/UserActions';
import {RefreshControl} from 'react-native-gesture-handler';

function getTimeAgo(dateString: any) {
  const [date, time] = dateString.split(', ');
  const [month, day, year] = date.split('/');
  const [hour, minute, second, period] = time.split(/:|\s/);

  let parsedHour = parseInt(hour);
  if (period === 'PM') {
    parsedHour += 12;
  }
  const dateObject: any = new Date(
    year,
    month - 1,
    day,
    parsedHour,
    minute,
    second,
  );
  console.log(dateObject);
  const now: any = new Date();
  const elapsed = now - dateObject;

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  }
}

export default function Notification({navigation}) {
  const {notifications} = useSelector((state: RootState) => state.userSlice);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const renderItem = ({item}: any) => (
    <Card
      style={styles.card}
      onPress={() => handleCardPress(item)}
      status={item.read ? 'basic' : 'primary'}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text category="h6">{item.title}</Text>
          <Text category="s1">{item.description}</Text>
          <Text category="c2">{getTimeAgo(item.time)}</Text>
        </View>
      </View>
    </Card>
  );
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  const handleCardPress = (item: any) => {
    if (!item.read) {
      dispatch(readNotification(item.title));
    }
    dispatch(getProducts({productId: item.data.id, navigation}));
  };
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getNotifications());
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <Layout style={styles.container} level="1">
      <CustomHeader title="Notifications" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.description}
        refreshControl={
          <RefreshControl
            colors={['#3366FF']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 0,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#7366FF',
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#808080',
  },
  unread: {
    backgroundColor: '#E8F0FE',
    borderColor: '#7366FF',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
});
