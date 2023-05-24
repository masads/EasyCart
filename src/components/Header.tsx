import React from 'react';
import {Layout, Icon, Text, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {normalize} from '../styles/Style';
import {StyleSheet} from 'react-native';

const BackIcon = (props: any) => (
  <Icon {...props} style={styles.icon} name="arrow-back-outline" />
);

export default function CustomHeader({title}: any) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={handleBackPress} />
  );

  return (
    <Layout
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}>
      {renderBackAction()}
      <Text category="h5" style={{marginLeft: 16}}>
        {title}
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: normalize(28),
    height: normalize(28),
  },
});
