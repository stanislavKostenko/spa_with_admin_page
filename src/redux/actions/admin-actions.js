export const updateData = (data) => {
  return {
    type: 'UPDATE_DATA',
    payload: data,
  }
};

export const updateDataItem = (data) => {
  return {
    type: 'UPDATE_DATA_ITEM',
    payload: data,
  }
};

export const deleteDataItem = (data) => {
  return {
    type: 'DELETE_DATA_ITEM',
    payload: data,
  }
};

export const nextButtonDisable = () => {
  return {
    type: 'NEXT_BTN_DISABLE'
  }
};

export const nextButtonEnable = () => {
  return {
    type: 'NEXT_BTN_ENABLE'
  }
};

export const prevButtonDisable = () => {
  return {
    type: 'PREV_BTN_DISABLE'
  }
};

export const prevButtonEnable = () => {
  return {
    type: 'PREV_BTN_ENABLE'
  }
};

export const updateStartItem = (count) => {
  return {
    type: 'UPDATE_START_ITEM',
    payload: count
  }
};

export const updateEndItem = (count) => {
  return {
    type: 'UPDATE_END_ITEM',
    payload: count
  }
};


