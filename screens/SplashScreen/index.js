import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import styles from './style';

const SplashScreen = props => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      props.navigation.navigate('userProfileScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/splashImage.jpeg')}
        style={{
          width: '250%',
          height: '250%',
          resizeMode: 'contain',
          margin: 30,
        }}
      />
      <ActivityIndicator
        animating={animating}
        color="white"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;
