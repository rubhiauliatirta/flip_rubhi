import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import CopyIcon from '../components/CopyIcon';
import { COLOR_ORANGE, SPACE_LG, SPACE_MD } from '../helpers/constants';
import {
  formatBankName,
  formatToIndonesianDate,
  formatToRupiah,
} from '../helpers/utils';

export default function Detail() {
  const {
    params: { detail },
  } = useRoute();
  const { goBack } = useNavigation();

  function copyOnPress() {
    Clipboard.setString(detail.id);
    Toast.show('Copy to Clipboard');
  }
  function handleClose() {
    goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.id}>
          <Text style={styles.title}>ID TRANSAKSI:#{detail.id}</Text>
          <Pressable onPress={copyOnPress}>
            <CopyIcon />
          </Pressable>
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>DETAIL TRANSAKSI</Text>
          <Pressable onPress={handleClose}>
            <Text style={styles.close}>Tutup</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.bankText}>
            {formatBankName(detail.sender_bank)}
            {' ➔ '}
            {formatBankName(detail.beneficiary_bank)}
          </Text>
          <View style={styles.contentContainer}>
            <View style={styles.contentItemLeft}>
              <Text style={styles.title}>
                {detail.beneficiary_name.toUpperCase()}
              </Text>
              <Text style={styles.contentText}>{detail.account_number}</Text>
            </View>
            <View style={styles.contentItemRight}>
              <Text style={styles.title}>NOMINAL</Text>
              <Text style={styles.contentText}>
                {formatToRupiah(detail.amount)}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentItemLeft}>
              <Text style={styles.title}>BERITA TRANSFER</Text>
              <Text style={styles.contentText}>{detail.remark}</Text>
            </View>
            <View style={styles.contentItemRight}>
              <Text style={styles.title}>KODE UNIK</Text>
              <Text style={styles.contentText}>{detail.unique_code}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentItemLeft}>
              <Text style={styles.title}>WAKTU DIBUAT</Text>
              <Text style={styles.contentText}>
                {formatToIndonesianDate(detail.created_at.split(' ')[0])}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android' ? SPACE_LG + StatusBar.currentHeight : SPACE_LG,
  },
  background: {
    backgroundColor: 'white',
  },
  id: {
    flexDirection: 'row',
    padding: SPACE_LG,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  close: {
    fontSize: 16,
    color: COLOR_ORANGE,
  },
  title: {
    fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : undefined,
    fontSize: 16,
    marginRight: SPACE_MD / 2,
  },
  detail: {
    flexDirection: 'row',
    padding: SPACE_LG,
    justifyContent: 'space-between',
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 2,
  },
  content: {
    paddingTop: SPACE_MD,
    paddingHorizontal: SPACE_LG,
  },
  bankText: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: SPACE_MD,
  },
  contentContainer: {
    paddingBottom: SPACE_LG,
    flexDirection: 'row',
  },
  contentItemLeft: {
    flex: 3,
  },
  contentItemRight: {
    flex: 2,
  },
  contentText: {
    fontSize: 16,
  },
});
