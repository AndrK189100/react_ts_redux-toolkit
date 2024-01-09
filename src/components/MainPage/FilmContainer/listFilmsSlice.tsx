import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FilmParams, SearchParams } from '../../../types';
import { apiURL } from '../../../App';

const initialState: {status: string, error: string, listFilms: FilmParams[]} = {
    listFilms: [],
    status: 'idle',
    error: '',
}

const listFilmSlice = createSlice(
    {
        name: 'ListFilms',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder 
                .addCase(fetchFilms.pending, (state) =>
                {
                    state.status = 'loading';
                })
                .addCase(fetchFilms.fulfilled, (state, action) => 
                {
                    state.status = 'idle';
                    if(action.payload.Response === 'False') {
                        state.error = action.payload.Error;
                        return; 
                    }
                    state.listFilms = [];
                    state.listFilms.push(...action.payload.Search)
                    
                })
                .addCase(fetchFilms.rejected, (state, action) => 
                {
                    state.status = 'idle';
                    state.error = action.error.message ? action.error.message : '';
                })
        },
    }
);

export const fetchFilms = createAsyncThunk('listFilms/fetchFilms', async (sParams: SearchParams) => {
    
    const params = sParams.filmYear ? `s=${sParams.filmTitle}&y=${sParams.filmYear}` : `s=${sParams.filmTitle}`;
    const response = await fetch(apiURL + params); 
    
    return response.ok ? response.json() : {status: response.status, statusText: response.statusText};
})

export const listFilmActions = listFilmSlice.actions;
export default listFilmSlice.reducer;

