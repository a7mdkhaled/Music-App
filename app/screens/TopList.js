/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableHighlight, Alert, Image,
} from 'react-native';

// import { Header } from '../components/header';
// import { Container } from '../components/container';

const ListItems = ({ item, onPress, artwork }) => (
  <View>
    <TouchableHighlight onPress={onPress} underlayColor="#000">
      <View style={styles.rowContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: `http://direct.napster.com/imageserver/v2/albums/${artwork}/images/500x500.jpg`,
          }}
        />
        <View style={styles.rowTextContainer}>
          <Text style={styles.trackName}>{item.name}</Text>
          <Text style={styles.artistName}>{item.artistName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  </View>
);
class TopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const url = 'https://api.napster.com/v2.1/tracks/top?apikey=MjQ0MGM5YzAtZTM1NC00N2EyLWE1ZWUtNDYwOTBjODkwNWU2&range=week&limit=20';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(responseJson => JSON.parse(responseJson._bodyInit))
      .then((res) => {
        // console.log(res);

        this.setState({
          data: res.tracks,
          // track: res.name,
          // artist: res.artistName,
          // link: res.previewURL,
          // img: `http://direct.napster.com/imageserver/v2/albums/${res.albumId}/images/500x500.jpg`,
        });
      })
      .catch(error => Alert.alert('Error : ', error));
  }

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );

  handleTrackClick = (item) => {
    // eslint-disable-next-line react/prop-types
    this.props.navigation.navigate('Home', {
      item,
      data: this.state.data,
      id: item.id,
      img: `http://direct.napster.com/imageserver/v2/albums/${item.albumId}/images/500x500.jpg`,
    });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.message}>Top This Week</Text>
        </View>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItems
              item={item}
              artwork={item.albumId}
              onPress={() => this.handleTrackClick(item)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 8,
    backgroundColor: '#000',
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 150,
  },
  rowTextContainer: {
    flex: 1,
  },
  trackName: {
    fontSize: 15,
    fontWeight: '500',
    // color: '#525252',
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingLeft: 10,
  },
  artistName: {
    fontSize: 13,
    color: '#9a9a9a',
    paddingLeft: 10,
  },
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    backgroundColor: '#000',
    borderBottomWidth: 0.5,
    borderColor: 'white',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default TopList;
