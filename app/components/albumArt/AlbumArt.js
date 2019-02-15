import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const AlbumArt = ({ artwork }) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image source={{ uri: artwork }} style={styles.image} />
    </TouchableOpacity>
  </View>
);

AlbumArt.propTypes = {
  artwork: PropTypes.string,
};
export default AlbumArt;
