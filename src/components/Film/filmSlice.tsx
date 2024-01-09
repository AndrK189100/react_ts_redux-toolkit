import { createSlice } from '@reduxjs/toolkit';

import { FilmParams } from '../../types';
import { AppDispatch } from '../../Store';
import { apiURL } from '../../App';

const initialState:FilmParams = {
	Title: '',
	Genre: '',
	Year: '',
	Poster: '',
	Runtime: '',
	Director: '',
	Actors: '',
	imdbRating: '',
	status: 'none',
}

const filmSlice = createSlice(
	{
		name: 'Film',
		initialState,
		reducers: {
			beginGet: state => {
				state.status = 'loading';
			},
			endGet: state => {
				state.status = 'idle';
			},
			get: (state, action) => {
				state.Title = action.payload.Title;
				state.Genre = action.payload.Genre;
				state.Poster = action.payload.Poster;
				state.Year = action.payload.Year;
				state.Runtime = action.payload.Runtime;
				state.Director = action.payload.Director;
				state.Actors = action.payload.Actors;
				state.imdbRating = action.payload.imdbRating;
				state.imdbID = action.payload.imdbID;
			},
		},
	}
);

export const filmActions = filmSlice.actions;
export default filmSlice.reducer;

export const getFilm = (id: string) => async (dispatch: AppDispatch) => {
	
	dispatch(filmActions.beginGet());
	const response = await fetch(apiURL + `i=${id}`);

	if (response.ok) {
		const {Title, Genre, Year, Poster, Runtime, Director, Actors, imdbRating, imdbID} = await response.json();
		const film = {
			imdbID: imdbID,
			Title: Title,
			Genre: Genre,
			Year: Year,
			Poster: Poster,
			Runtime: Runtime,
			Director: Director,
			Actors: Actors,
			imdbRating: imdbRating,
		};
		/////////////////////////////
		// Обработка ошибок и т. д.//
		////////////////////////////
		
		dispatch(filmActions.get(film))
	}

	dispatch(filmActions.endGet());
}