import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  COLOR_GREEN,
  COLOR_ORANGE,
  SPACE_MD,
  SPACE_SM,
} from '../helpers/constants';
import {
  formatBankName,
  formatToIndonesianDate,
  formatToRupiah,
} from '../helpers/utils';

// this component will not re-render if id not change
// karena componentnya di memoized
export default React.memo(TransactionItem, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

function TransactionItem({ item }) {
  const { navigate } = useNavigation();
  function onPress() {
    navigate('Detail', { detail: item });
  }
  const status = item.status.toLowerCase();

  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftGroup}>
          <View style={styles.sign(status)} />
          <View style={styles.information}>
            <Text style={styles.bankText}>
              {formatBankName(item.sender_bank)}
              {' ➔ '}
              {formatBankName(item.beneficiary_bank)}
            </Text>
            <Text style={styles.nameInfoText}>
              {item.beneficiary_name.toUpperCase()}
            </Text>
            <Text style={styles.nameInfoText}>
              {formatToRupiah(item.amount)}
              {' ● '}
              {formatToIndonesianDate(item.created_at.split(' ')[0])}
            </Text>
          </View>
        </View>
        <View style={styles.badge(status)}>
          <Text style={styles.badgeText(status)}>{variant[status].text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: SPACE_SM,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: SPACE_MD,
    borderRadius: 10,
    alignItems: 'center',
  },
  leftGroup: {
    flexDirection: 'row',
  },
  information: {
    padding: SPACE_MD,
  },
  bankText: {
    fontSize: 18,
    fontWeight: '700',
  },
  nameInfoText: {
    fontSize: 16,
  },
  sign: status => ({
    width: SPACE_SM,
    alignSelf: 'stretch',
    backgroundColor: variant[status].backgroundColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }),
  badge: status => ({
    paddingVertical: SPACE_SM / 2,
    paddingHorizontal: SPACE_SM,
    backgroundColor: variant[status].badgeColor,
    borderColor: variant[status].borderColor,
    borderRadius: 5,
    borderWidth: 2,
  }),
  badgeText: status => ({
    fontFamily: Platform.OS === 'android' ? 'roboto_medium' : undefined,
    fontWeight: '700',
    color: variant[status].textColor,
  }),
});

const variant = {
  success: {
    text: 'Berhasil',
    textColor: '#fff',
    backgroundColor: COLOR_GREEN,
    badgeColor: COLOR_GREEN,
    borderColor: COLOR_GREEN,
  },
  pending: {
    text: 'Pengecekan',
    textColor: '#000',
    backgroundColor: COLOR_ORANGE,
    badgeColor: '#fff',
    borderColor: COLOR_ORANGE,
  },
};
