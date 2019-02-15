import React, { Component } from 'react';

import { View, Text, Slider } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function pad(n, width, z = 0) {
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = position => [pad(Math.floor(position / 60), 2), pad(position % 60, 2)];

const SeekBar = ({
  duration, currentPosition, onSeek, onSlidingStart,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(duration - currentPosition);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>{`${elapsed[0]}:${elapsed[1]}`}</Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40 }]}>
          {duration > 1 && `-${remaining[0]}:${remaining[1]}`}
        </Text>
      </View>

      <Slider
        maximumValue={Math.max(duration, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        style={styles.slider}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        thumbTintColor="white"
      />
    </View>
  );
};

SeekBar.propTypes = {
  duration: PropTypes.number,
};
export default SeekBar;
