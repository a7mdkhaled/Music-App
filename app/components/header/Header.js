import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({ message, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image
        style={styles.button}
        source={require('./img/baseline_keyboard_arrow_down_white_18dp.png')}
      />
    </TouchableOpacity>
    <Text style={styles.message}>{message.toUpperCase()}</Text>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.button} source={require('./img/baseline_queue_music_white_18dp.png')} />
    </TouchableOpacity>
  </View>
);

Header.propTypes = {
  message: PropTypes.string,
  onPress: PropTypes.func,
};
export default Header;
