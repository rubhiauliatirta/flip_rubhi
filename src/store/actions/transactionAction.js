export const SET_TRANSACTION = 'transactions/setTransaction';
export const SET_QUERY = 'transactions/setQuery';
export const SET_SORT = 'transactions/setSort';

export function setTransactionAsync() {
  return dispatch => {
    return fetch('https://nextar.flip.id/frontend-test')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to get data');
      })
      .then(transactions => {
        dispatch(setTransaction(Object.values(transactions)));
      });
  };
}

export function setTransaction(payload) {
  return {
    type: SET_TRANSACTION,
    payload,
  };
}

export function setQuery(payload) {
  return {
    type: SET_QUERY,
    payload,
  };
}
export function setSort(payload) {
  return {
    type: SET_SORT,
    payload,
  };
}
