import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: '100%',
    alignItems: 'center',
  },
  dasboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    paddingVertical: 12,
    width: 120,
    alignItems: 'center',
    marginBottom: 16,
  },
});
