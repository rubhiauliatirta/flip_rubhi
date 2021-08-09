import { SORT_OPTIONS } from '../store/reducers/transactionReducer';

export function formatBankName(bankName) {
  // melihat dari response API yang muncul,
  // asumsi bahwa nama bank yang terdiri dari 4 huruf
  // akan menjadi huruf kapital semua.
  // sisanya akan jadi huruf kapital di huruf pertama saja
  if (bankName.length <= 4) {
    return bankName.toUpperCase();
  } else {
    return bankName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.substring(1));
  }
}

export function formatToRupiah(value) {
  // Intl not avaliable in javascript core in react native
  // sehingga saya pakai logic sendiri
  let delimitResult = '';
  const amount = '' + value;
  for (let i = 0; i < amount.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      delimitResult = '.' + delimitResult;
    }
    delimitResult = amount[amount.length - 1 - i] + delimitResult;
  }
  return 'Rp' + delimitResult;
}

export function formatToIndonesianDate(value) {
  const indonesianMonth = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const dateInstance = new Date(value);
  const date = dateInstance.getDate();
  const month = indonesianMonth[dateInstance.getMonth()];
  const year = dateInstance.getFullYear();
  return `${date} ${month} ${year}`;
}

export function getOptionKey(value) {
  return Object.keys(SORT_OPTIONS).find(key => SORT_OPTIONS[key] === value);
}
