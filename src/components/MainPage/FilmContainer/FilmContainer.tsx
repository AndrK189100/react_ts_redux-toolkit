import { useSelector } from 'react-redux';
import { Container, Row, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { RootState } from '../../../Store';
import './FilmContainer.css'

export default function FilmContainer() {

	const films = useSelector((state: RootState) => state.ListFilms);
	const navigate = useNavigate();

	const onClickTransitionHandler = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		navigate(`/film/${e.target.dataset.id}`)
	};

	const list = films.listFilms.map(film => 
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
	);
	
	const loading = <Spinner animation='border' role='status' className='ntlg-loading'>
						<span className='visually-hidden'>Loading...</span>
  					</Spinner>

	const error = <Alert variant='danger'>
					<div style={{textAlign: 'center'}}>{films.error}</div>	
  				  </Alert>;	

	return (<>
			{
				films.status === 'loading' ? loading : films.error ? <div>{error}</div>
				:  <Container>
						<Row className='overflow-auto' style={{maxHeight: '90vh'}}>{list}</Row>
					</Container>
			}
			</>
	);	
}

