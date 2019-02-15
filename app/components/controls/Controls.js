import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Controls = ({
  paused = null,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image
        style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
        source={require('./img/baseline_shuffle_white_18dp.png')}
      />
    </TouchableOpacity>
    <View style={{ width: 40 }} />
    <TouchableOpacity onPress={onBack}>
      <Image source={require('./img/baseline_skip_previous_white_18dp.png')} />
    </TouchableOpacity>
    <View style={{ width: 20 }} />
    {!paused ? (
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('./img/baseline_pause_white_18dp.png')} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('./img/baseline_play_arrow_white_18dp.png')} />
        </View>
      </TouchableOpacity>
    )}

    <View style={{ width: 20 }} />
    <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
      <Image
        style={[forwardDisabled && { opacity: 0.3 }]}
        source={require('./img/baseline_skip_next_white_18dp.png')}
      />
    </TouchableOpacity>
    <View style={{ width: 40 }} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image
        style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('./img/baseline_repeat_white_18dp.png')}
      />
    </TouchableOpacity>
  </View>
);

Controls.propTypes = {
  paused: PropTypes.bool,
  shuffleOn: PropTypes.bool,
  repeatOn: PropTypes.bool,
  onPressPlay: PropTypes.func,
  onPressPause: PropTypes.func,
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  onPressShuffle: PropTypes.func,
  onPressRepeat: PropTypes.func,
  forwardDisabled: PropTypes.bool,
};

export default Controls;
