import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { RootState } from '../../Store';
import './Favorites.css';

export default function Favorites() {

	const films = useSelector((state: RootState) => state.Favorites);
	const navigate = useNavigate();

	const onClickTransitionHandler = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		navigate(`/film/${e.target.dataset.id}`)
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
			}
	}

	const header = 
		<Container>
			<Row>
				<Col xxl={{span: 1, offset: 9}} >
					<Button variant='outline-primary' data-id='bak' onClick={onClickNavigateHandler}>Назад</Button>
				</Col>
				<Col xxl='2'>
					<Button variant='outline-primary' data-id='main' onClick={onClickNavigateHandler}>На главную</Button>
				</Col>
			</Row>
		</Container>

	const list = films.map(film => 
		<Card key={film.imdbID} style={{ width: '18rem', marginLeft: '40px', marginTop: '20px' }}>
			<Card.Img variant="top" src={film.Poster} />
      			<Card.Body>
        			<Card.Title>{film.Title}</Card.Title>
        			<Card.Text>
          			Год выпуска: {film.Year}
        			</Card.Text>
        			<Button data-id={film.imdbID} variant="primary" onClick={onClickTransitionHandler}>Перейти</Button>
      			</Card.Body>
    	</Card>
	)
	
	return (
		<>
		{header}
		{ films && <Container>
			<Row className='overflow-auto' style={{maxHeight: '90vh'}}>{list}</Row>
		</Container>}
		</>
		)
	 
}
