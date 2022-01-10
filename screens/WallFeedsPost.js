import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput, Image } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { InputField, InputWrapper, AddImage, SubmitBtn, SubmitBtnText, StatusWrapper } from '../components/styles';

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

const WallFeedPostScreen = ({ navigation }) => {
  const [user] = useAuthState(auth);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [fab, setFab] = React.useState({ open: false });

  const onFabChange = ({ open }) => setFab({ open });

  const { open } = fab;

  const takePhotoFromCamera = () => {
    launchCamera(
      {
        maxWidth: 1200,
        maxHeight: 780,
      },
      (image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.uri : image.uri;
        setImage(imageUri);
      },
    );
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      {
        width: 1200,
        height: 780,
      },
      (image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.uri : image.uri;
        setImage(imageUri);
      },
    );
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    await addDoc(collection(db, 'posts'), {
      userId: user.uid,
      name: user.displayName,
      post: post,
      postImg: imageUrl,
      postTime: new Date(),
      likes: null,
      comments: null,
    });
    console.log('Post Added!');
    Alert.alert('Post published!', 'Your post has been published Successfully!');
    setPost(null);
    navigation.navigate('Landing');
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = ref(storage, `photos/${filename}`);
    const task = uploadBytes(storageRef, uploadUri);

    // Set transferred state
    task.then((taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

      setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
    });

    try {
      await task;

      const url = await getDownloadURL(storageRef);

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
      <View style={styles.container}>
        <View style={InputWrapper}>
          {image != null ? <Image source={{ uri: image }} /> : null}

          <TextInput
            style={InputField}
            placeholder="What's on your mind?"
            multiline
            numberOfLines={4}
            value={post}
            onChangeText={(content) => setPost(content)}
          />
          {uploading ? (
            <View style={StatusWrapper}>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <TouchableOpacity style={SubmitBtn} onPress={submitPost}>
              <Text style={SubmitBtnText}>Post</Text>
            </TouchableOpacity>
          )}
        </View>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'folder' : 'plus'}
              actions={[
                {
                  icon: 'camera-outline',
                  label: 'Take Photo',
                  onPress: () => takePhotoFromCamera(),
                  small: false,
                },
                {
                  icon: 'image',
                  label: 'Choose Photo',
                  onPress: () => choosePhotoFromLibrary(),
                  small: false,
                },
              ]}
              onStateChange={onFabChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
        <FAB style={styles.fab} small icon="arrow-left" onPress={() => navigation.navigate('Landing')} />
      </View>
  );
};

export default WallFeedPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
