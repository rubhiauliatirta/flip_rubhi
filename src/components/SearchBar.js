import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DownIcon from './DownIcon';
import SearchIcon from './SearchIcon';
import { COLOR_ORANGE, SPACE_SM } from '../helpers/constants';
import {
  setQuery as setQueryAction,
  setSort,
} from '../store/actions/transactionAction';
import SortModal from './SortModal';
import { getOptionKey } from '../helpers/utils';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const sort = useSelector(state => state.sort);
  const dispatch = useDispatch();

  // baru akan ngefilter setelah submit editing,
  // jadi kalo di back gak searching
  function onSubmit() {
    dispatch(setQueryAction(query));
  }

  function onPress() {
    setVisible(true);
  }

  function onSelectedItem(value) {
    dispatch(setSort(value));
    setVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari nama, bank, atau nominal"
          onSubmitEditing={onSubmit}
        />
        <Pressable style={styles.sortButton} onPress={onPress}>
          <Text style={styles.sortText}>{getOptionKey(sort)}</Text>
          <DownIcon />
        </Pressable>
      </View>

      <SortModal
        visible={visible}
        setVisible={setVisible}
        onSelectedItem={onSelectedItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: SPACE_SM,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  sortButton: {
    flexDirection: 'row',
  },
  sortText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : undefined,
    color: COLOR_ORANGE,
  },
});
