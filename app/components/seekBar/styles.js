import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  slider: {
    marginTop: -5
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16
  },
  track: {
    height: 2,
    borderRadius: 1
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white"
  },
  text: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    textAlign: "center"
  }
});

export default styles;
