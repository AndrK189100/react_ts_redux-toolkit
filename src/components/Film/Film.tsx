import './Film.css';

import { Button, Card, Container, Row, Spinner } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { getFilm } from './filmSlice';
import { AppDispatch, RootState } from '../../Store';
import { favoritesActions } from '../Favorites/favoritesSlice';


export default function Film() {
	
	const params = useParams();
	const id:string = params.id ? params.id : '';
	const dispatch:AppDispatch = useDispatch();
	const navigate = useNavigate();
	

	const film = useSelector((state: RootState) => state.Film);
	const favorites = useSelector((state: RootState) => state.Favorites);

	useEffect(() => {
		dispatch(getFilm(id))
	},[]);

	const onClickAddFavoritesHandler = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		dispatch(favoritesActions.favoritesToggle(film));
	}

	const isFavorites = ():string => {
		return favorites.find(f => f.imdbID === film.imdbID) ? 'Удалить из Избранного' : 'В избранное'; 
	}

	const onClickNavigateHandler = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		switch(e.target.dataset.id){
			case 'main':
				navigate('/');
				break;
			case 'bak':
				navigate(-1);
				break;
			case 'fvr':
				navigate('/favorites');	
				break;	
		}
		
	}

	const loading = <Spinner animation='border' role='status' className='ntlg-loading'>
						<span className='visually-hidden'>Loading...</span>
  					</Spinner>
			
	return film.status === 'idle' ?
	<Container>
		<Button variant='outline-primary' className='button' data-id='fvr' 
			onClick={onClickNavigateHandler}> Перейти в избранное</Button>
		<Button variant='outline-primary' className='button2' data-id='bak' 
			onClick={onClickNavigateHandler}> Назад</Button>
		<Button variant='outline-primary' className='button3' data-id='main' 
			onClick={onClickNavigateHandler}> На главную</Button>
		<Row>
			<Card style={{ width: '21rem', margin: 'auto'}}>
				<Card.Img variant="top" src={film.Poster} />
				<Card.Body>
					<Card.Title>{film.Title}</Card.Title>
					<Card.Text>Год выпуска: {film?.Year} Жанр: {film.Genre} Продолжительность: {film.Runtime} Режиссер: {film.Director} Актеры: {film?.Actors} Рейтинг: {film.imdbRating}
					</Card.Text>
					<Button variant="primary" onClick={onClickAddFavoritesHandler}>{isFavorites()}</Button>	
				</Card.Body>
			</Card>
		</Row>
	</Container>
	: film.status === 'loading' ? loading : '';
}
