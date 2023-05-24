import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Layout} from '@ui-kitten/components';
import CustomHeader from '../components/Header';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '2',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '1 day ago',
    read: false,
  },
  {
    id: '3',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '3 days ago',
    read: true,
  },
  {
    id: '4',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '5 days ago',
    read: false,
  },
  {
    id: '5',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '5 days ago',
    read: false,
  },
  {
    id: '6',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '5 days ago',
    read: false,
  },
  {
    id: '7',
    title: 'New item added to the store',
    message: 'Check out our latest product',
    time: '5 days ago',
    read: false,
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const renderItem = ({item}: any) => (
    <Card
      style={styles.card}
      onPress={() => handleCardPress(item)}
      status={item.read ? 'basic' : 'primary'}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text category="h6">{item.title}</Text>
          <Text category="s1">{item.message}</Text>
          <Text category="c2">{item.time}</Text>
        </View>
      </View>
    </Card>
  );

  const handleCardPress = (item: any) => {
    if (!item.read) {
      const updatedNotifications = notifications.map(notification =>
        notification.id === item.id
          ? {...notification, read: true}
          : notification,
      );
      setNotifications(updatedNotifications);
    }
  };

  return (
    <Layout style={styles.container} level="1">
      <CustomHeader title="Notifications" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
