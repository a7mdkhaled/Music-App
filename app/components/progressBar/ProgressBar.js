import TrackPlayer from 'react-native-track-player';

class MyPlayerBar extends TrackPlayer.ProgressComponent {
  render() {
    return (
      <View>
        <Text>{formatTime(this.state.position)}</Text>
      </View>
    );
  }
}
