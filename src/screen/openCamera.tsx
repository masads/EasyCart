import React, {useState, useRef} from 'react';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import {StackParamList} from '../navigation/Admin';
import {useIsFocused} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View, Text, Pressable} from 'react-native';

type Props = NativeStackScreenProps<StackParamList, 'OpenCamera'>;

interface State {
  photo: TakePictureResponse | null;
}

const OpenCamera: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState<State>({photo: null});
  const isFocused = useIsFocused();
  const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {quality: 0.5, base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        setState({...state, photo: data});
        navigation.navigate({
          name: 'AddProduct',
          params: {image: data},
          merge: true,
        });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  if (!isFocused) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RNCamera style={styles.camera} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={takePicture} style={styles.button}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OpenCamera;
