import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#1E6F9F',
    borderRadius: 5,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    marginTop: 16,
    width: 52,
  },
  container: {
    backgroundColor: '#000000',
    flex: 1,
    padding: 24,
  },
  emptyList: {
    color: '#808080',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyListBold: {
    color: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyListImage: {
    alignSelf: 'center',
    height: 56,
    marginBottom: 16,
    marginTop: 56,
    width: 56,
  },
  form: {
    flexDirection: 'row',
    marginBottom: 42,
    marginTop: 36,
  },
  input: {
    backgroundColor: '#262626',
    borderRadius: 5,
    color: '#FFF',
    flex: 1,
    fontSize: 16,
    height: 54,
    marginRight: 12,
    marginTop: 16,
    padding: 16,
  },
});
