import {
  SET_QUERY,
  SET_SORT,
  SET_TRANSACTION,
} from '../actions/transactionAction';

const initialState = {
  transactions: null,
  query: null,
  sort: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION:
      return { ...state, transactions: action.payload };
    case SET_QUERY:
      return { ...state, query: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

export function selectTransaction(state) {
  const { query, sort, transactions } = state;
  if (query === null && sort === null) {
    return state.transactions;
  }
  if (transactions !== null) {
    // for copying deep prevent mutate state
    let result = JSON.parse(JSON.stringify(transactions));

    // check query jika ada maka akan difilter berdasarkan query
    if (query !== null && query !== '') {
      const regex = new RegExp(query, 'i');
      result = result.filter(transaction => {
        return (
          transaction.beneficiary_name.match(regex) ||
          transaction.sender_bank.match(regex) ||
          transaction.beneficiary_bank.match(regex) ||
          transaction.amount.toString().match(regex)
        );
      });
    }
    // check value sort jika user memilih salah satu opsi
    if (sort !== null) {
      const [key, option] = sort.split(':');

      if (option === 'desc') {
        result.sort((itemA, itemB) => (itemA[key] < itemB[key] ? 1 : -1));
      } else {
        result.sort((itemA, itemB) => (itemB[key] < itemA[key] ? 1 : -1));
      }
    }
    return result;
  }
  return [];
}

export const SORT_OPTIONS = {
  URUTKAN: null,
  'Nama A-Z': 'beneficiary_name:asc',
  'Nama Z-A': 'beneficiary_name:desc',
  'Tanggal Terbaru': 'created_at:desc',
  'Tanggal Terlama': 'created_at:asc',
};
