import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import TransactionItem from '../components/TransactionItem';
import { SPACE_MD } from '../helpers/constants';
import { setTransactionAsync } from '../store/actions/transactionAction';
import SearchBar from '../components/SearchBar';
import { selectTransaction } from '../store/reducers/transactionReducer';

export default function TransactionList() {
  const transactions = useSelector(selectTransaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTransactionAsync()).catch(err => {
      Toast.show(err.message);
    });
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        key={item => item.id}
        ListFooterComponent={View}
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACE_MD,
    paddingHorizontal: SPACE_MD,
  },
  footer: {
    height: SPACE_MD,
  },
});
