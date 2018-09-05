import { maxCountOfUsers } from '../../components/admin-page/Admin-page.component';

const initialState = {
  data: [],
  editable: false,
  startItem: 0,
  endItem: maxCountOfUsers,
  nextDisable: false,
  prevDisable: true
};

export const adminReducer = (state = initialState, action) => {
  console.log(state.startItem, state.endItem);
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    case 'UPDATE_DATA_ITEM':
      return { ...state, data: action.payload };
    case 'DELETE_DATA_ITEM':
      return { ...state, data: action.payload };
    case 'UPDATE_START_ITEM':
      return { ...state, startItem: action.payload };
    case 'UPDATE_END_ITEM':
      return { ...state, endItem: action.payload };
    case 'NEXT_BTN_DISABLE':
      return { ...state, nextDisable: true };
    case 'NEXT_BTN_ENABLE':
      return { ...state, nextDisable: false };
    case 'PREV_BTN_DISABLE':
      return { ...state, prevDisable: true };
    case 'PREV_BTN_ENABLE':
      return { ...state, prevDisable: false };
    default:
      return state
  }
}
