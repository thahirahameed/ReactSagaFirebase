import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
//import * as ImagePicker from 'react-native-image-picker';
import {PersistanceHelper} from '../../helpers';
import {useDispatch} from 'react-redux';
import {userActions} from '../../features/user/userSlice';

const UserProfileScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const source = '';

  const dispatch = useDispatch();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadEmail = async () => {
    setEmail(await PersistanceHelper.getValue('email'));
    console.log(email);
  };
  const loadUserDetails = async () => {
    try {
      const userDetails = await PersistanceHelper.getObject('userDetails');
      if (userDetails !== null) {
        setName(userDetails.name);
        setAge(userDetails.age);
        setAddress(userDetails.address);
        setImage(userDetails.image);
        loadEmail();
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const handleImagePicker = () => {
    // ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
    //   if (!response.didCancel && !response.error) {
    //     setImage('../Images/image2');
    //   }
    // });
    // ImagePicker.launchImageLibrary(
    //   {mediaType: 'photo', includeBase64: false, maxHeight: 200, maxWidth: 200},
    //   response => {
    //     console.log('Response = ', response);
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else {
    //       setImage({uri: response});
    //       // source = {
    //       //   uri: 'data:image/jpeg;base64,' + response.data,
    //       //   isStatic: true,
    //       // };
    //     }
    //   },
    // );
  };

  const handleSave = async () => {
    try {
      const userDetails = {name, age, address, image};
      PersistanceHelper.setObject('userDetails', userDetails);
      alert('User details saved successfully!');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          dispatch(userActions.logout());
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 5,
          }}>
          logout
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.label}>{email}</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Button
        title="Pick Image"
        onPress={handleImagePicker}
        style={styles.button}
      />
      {image && <Image source={{uri: source}} style={styles.image} />}

      <Button
        title="Update Details"
        onPress={handleSave}
        style={styles.button}
      />
    </View>
  );
};

export default UserProfileScreen;
