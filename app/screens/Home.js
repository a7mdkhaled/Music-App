/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  AppRegistry, Alert, View, Text, ScrollView, Button, StatusBar,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';

import { Header } from '../components/header';
import { AlbumArt } from '../components/albumArt';
import { Container } from '../components/container';
import { TrackDetails } from '../components/trackDetails';

import { Controls } from '../components/controls';

const tracks = [
  {
    id: '1',
    url: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
    title: 'MOU IS A BITCH',
    artist: 'AHMED KHALED',
    artwork:
      'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
  },

  {
    id: '2',
    url: require('../song/Numb.mp3'),
    title: 'MOU IS Adouble BITCH',
    artist: 'AHMED KHALED',
    artwork:
      'http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg',
  },
  {
    id: '3',
    url: require('../song/Numb.mp3'),
    title: 'MOU IS A triple BITCH',
    artist: 'AHMED KHALED',
    artwork: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: 'Ahmed',
      title: 'Khaled',
      paused: true,
      shuffleOn: false,
      repeatOn: false,

      img: this.props.navigation.state.params.img,

      // // lyrics
      lyrics: null,
      isVisible: false,
    };
  }

  /* componentDidMount() {
    const url = 'https://api.audd.io/?url=https://audd.tech/example1.mp3&return=lyrics';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(responseJson => JSON.parse(responseJson._bodyInit))
      .then((res) => {
        console.log(res.result);

        this.setState({
          artist: res.result.artist,
          title: res.result.title,
          lyrics: res.result.lyrics.lyrics,
        });
      })
      .catch(error => Alert.alert('Error : ', error));
  } */

  componentDidMount() {
    // this.props.navigation.state.params.data.map(item=>{
    //   {id: item.id,
    //     url: item.previewURL,
    //     title: item.name,
    //     artist: item.artistName,
    //     artwork: `http://direct.napster.com/imageserver/v2/albums/${item.albumId}/images/500x500.jpg`,}
    //   })
    const trackListArr = [];

    this.props.navigation.state.params.data.forEach((item) => {
      trackListArr.push({
        id: item.id,
        url: item.previewURL,
        title: item.name,
        artist: item.artistName,
        artwork: `http://direct.napster.com/imageserver/v2/albums/${
          item.albumId
        }/images/500x500.jpg`,
        duration: 30,
      });
    });

    const index = trackListArr.findIndex(x => x.id === this.props.navigation.state.params.id);

    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.add([trackListArr[index], ...trackListArr]).then(() => {});
    });

    // console.log(trackListArr);

    this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      const track = await TrackPlayer.getTrack(data.nextTrack);

      this.setState({
        title: track.title,
        url: track.artwork,
        artist: track.artist,
        img: track.artwork,
        id: track.id,
      });
    });
  }

  componentWillUnmount() {
    // Removes the event handler
    this.onTrackChange.remove();
   
  }

  playMusic = () => {
    TrackPlayer.play();
    this.setState({ paused: false });
  };

  pauseMusic = () => {
    TrackPlayer.pause();
    this.setState({ paused: true });
  };

  handleForward = () => {
    TrackPlayer.skipToNext();
  };

  handleBack = () => {
    TrackPlayer.skipToPrevious();
  };

  handleDuration = () => {
    TrackPlayer.getDuration();
  };

  handlePressBack = () => {
    this.props.navigation.goBack(null);
  };

  handleShuffle = () => {
    const shuffle = require('shuffle-array');
    shuffle([tracks]);
    this.setState({ shuffleOn: !this.state.shuffleOn });
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  handleLyrics = () => {
    this.setState({ isVisible: !this.state.isVisible });
    if (this.state.lyrics === null) {
      const url = `https://api.lyrics.ovh/v1/${
        this.props.navigation.state.params.item.artistName
      }/${this.props.navigation.state.params.item.name}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(responseJson => JSON.parse(responseJson._bodyInit))
        .then((res) => {
          // console.log(res);

          //  Alert.alert('sdsd');
          this.setState({
            lyrics: res.lyrics,
          });
        })
        .catch(error => Alert.alert('Error : ', error));
    }
  };

  render() {
    const { item, data } = this.props.navigation.state.params;
    // console.log(this.props.navigation.state.params.item);
    // console.log(this.props.navigation.state.params.data);
    return (
      <Container>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <Header onPress={this.handlePressBack} message="Playing From Charts" />
        <AlbumArt artwork={this.state.img} />
        <TrackDetails
          title={this.state.title}
          onPress={this.handleLyrics}
          artist={this.state.artist}
        />
        <Controls
          repeatOn={this.state.repeatOn}
          onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
          shuffleOn={this.state.shuffleOn}
          onBack={this.handleBack}
          onForward={this.handleForward}
          onPressPlay={this.playMusic}
          onPressShuffle={this.handleShuffle}
          paused={this.state.paused}
          onPressPause={this.pauseMusic}
        />
        <Modal
          swipeDirection="down"
          animationIn="slideInLeft"
          animationInTiming={1000}
          onSwipe={() => this.setState({ isVisible: true })}
          scrollOffsetMax={400 - 300}
          onBackdropPress={() => this.setState({ isVisible: true })}
          onBackButtonPress={() => {
            this.setState({ isVisible: true });
          }}
          style={{
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(#fff)',
            height: 200,
          }}
          isVisible={this.state.isVisible}
        >
          <View
            style={{
              display: 'flex',
              alignContent: 'center',
              height: 300,
              flex: 1,
            }}
          >
            <ScrollView>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: 'black',
                  paddingBottom: 10,
                  fontWeight: '500',
                  fontFamily: 'Iowan Old Style',
                }}
              >
                {this.state.lyrics === null ? 'No Lyrics Found' : this.state.lyrics}
              </Text>
              <Button title="Close" color="#841584" onPress={this.closeModal} />
            </ScrollView>
          </View>
        </Modal>
      </Container>
    );
  }
}
AppRegistry.registerComponent('ReactMusic', () => App);
TrackPlayer.registerEventHandler(require('../player-handler'));
