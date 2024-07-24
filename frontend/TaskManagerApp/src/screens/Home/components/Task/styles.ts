import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  taskAdd: {
    color: '#FFFFFF',
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  taskDone: {
    color: '#808080',
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    textDecorationLine: 'line-through',
  },
  button: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    width: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  checkbox: {
    alignSelf: 'center',
    borderRadius: 999,
    borderColor: '#4EA8DE',
    marginLeft: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
});
