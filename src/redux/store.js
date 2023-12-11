import { configureStore } from '@reduxjs/toolkit';
import boardsSlice, { fetchBoards } from './boardsSlice.js';
import accountsSlices from './accountsSlice.js';

const store = configureStore({
    reducer: {
        // redux slices
        boards: boardsSlice.reducer,
        account: accountsSlices.reducer,
    },
});

export default store;
