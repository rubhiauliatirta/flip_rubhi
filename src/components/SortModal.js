import React from 'react';
import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import RadioButton from 'radio-button-react-native';
import { SORT_OPTIONS } from '../store/reducers/transactionReducer';
import { COLOR_ORANGE, SPACE_LG, SPACE_MD } from '../helpers/constants';
import { useSelector } from 'react-redux';

const options = Object.keys(SORT_OPTIONS).map(key => {
  return {
    label: key,
    value: SORT_OPTIONS[key],
  };
});
console.log(options);

function SortModal({ visible, setVisible, onSelectedItem }) {
  const sort = useSelector(state => state.sort);
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {options.map(option => (
            <View style={styles.boxStyle} key={option.label}>
              <RadioButton
                value={option.value}
                currentValue={sort}
                outerCircleColor={COLOR_ORANGE}
                outerCircleSize={24}
                outerCircleWidth={2}
                innerCircleColor={COLOR_ORANGE}
                innerCircleSize={16}
                onPress={onSelectedItem}>
                <Text style={styles.textStyle}>{option.label}</Text>
              </RadioButton>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: SPACE_LG,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxStyle: {
    padding: SPACE_MD,
    borderWidth: 0,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: SPACE_LG,
    fontFamily: Platform.OS === 'android' ? 'roboto_medium' : undefined,
  },
});

export default SortModal;
