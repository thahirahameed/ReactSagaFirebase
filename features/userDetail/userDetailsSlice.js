import {createSlice} from '@reduxjs/toolkit';

const initialState = {userDetails: []};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      state.items.push(itemToAdd);
    },
    request: state => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.userDetails = action.payload;
      state.isFetching = false;
      state.failure = false;
      state.errorMessage = '';
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.failure = true;
      state.errorMessage = action.errorMessage;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
