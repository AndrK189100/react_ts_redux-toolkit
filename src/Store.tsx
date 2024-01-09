import { configureStore } from "@reduxjs/toolkit";

import filmSlice from './components/Film/filmSlice';
import listFilmsSlice from "./components/MainPage/FilmContainer/listFilmsSlice";
import favoritesSlice from './components/Favorites/favoritesSlice';

export const store = configureStore({
    reducer: {
        ListFilms: listFilmsSlice,
        Film: filmSlice,
        Favorites: favoritesSlice,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;