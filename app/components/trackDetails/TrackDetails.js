import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';
import styles from './styles';

/*
  /*  <Menu>
        <MenuTrigger text="Select action" />
        <MenuOptions>
          <MenuOption onSelect={() => alert('lyrics')} text="lyrics" />
          <MenuOption onSelect={() => alert('options')}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu> */

const AlbumTrack = ({ onPress, title, artist }) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image
        style={styles.button}
        source={require('./img/baseline_add_circle_outline_white_18dp.png')}
      />
    </TouchableOpacity>

    <View style={styles.detailsWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.moreButton}>
        <Image
          style={styles.moreButtonIcon}
          source={require('./img/baseline_receipt_white_18dp.png')}
        />
      </View>
    </TouchableOpacity>
  </View>
);
AlbumTrack.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
};
export default AlbumTrack;
