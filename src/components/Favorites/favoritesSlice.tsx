import { createSlice } from '@reduxjs/toolkit';
import { FilmParams } from '../../types';


const initialState:FilmParams[] = [];

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		favoritesToggle: (state, action) => {
			const index = state.findIndex(film => film.imdbID === action.payload.imdbID);
			index === -1 ? state.push(action.payload) : state.splice(index, 1);
		},
	},
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;