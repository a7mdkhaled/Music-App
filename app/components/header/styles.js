import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    height: 72,

    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    opacity: 0.72,
  },
});

export default styles;
