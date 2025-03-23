import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contentInput: {
    fontSize: 16,
    flex: 1,
    minHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 16,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
  },
});

