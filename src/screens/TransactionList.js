import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import TransactionItem from '../components/TransactionItem';
import { SPACE_LG, SPACE_MD } from '../helpers/constants';
import { setTransactionAsync } from '../store/actions/transactionAction';
import SearchBar from '../components/SearchBar';
import { selectTransaction } from '../store/reducers/transactionReducer';

export default function TransactionList() {
  const transactions = useSelector(selectTransaction);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setTransactionAsync())
      .catch(err => {
        Toast.show(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      <FlatList
        style={styles.flatList}
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
  flatList: {
    marginTop: SPACE_MD
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: SPACE_MD,
    paddingHorizontal: SPACE_MD,
  },
  footer: {
    height: SPACE_MD,
  },
});
