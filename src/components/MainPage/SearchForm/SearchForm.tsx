import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';

import { AppDispatch } from '../../../Store';
import { fetchFilms } from '../FilmContainer/listFilmsSlice';
import { RootState } from '../../../Store';

export default function SearchForm() {

    const [validated, setValidated] = useState(false);
    const [fields, setFields] = useState({filmTitle: '', filmYear: ''});
    const dispatch: AppDispatch = useDispatch();
    const films = useSelector((state: RootState) => state.ListFilms)
    const navigate = useNavigate();
    
    const onSubmitHandler = (event: React.BaseSyntheticEvent) => {
      event.preventDefault();
      const form = event.currentTarget;
      
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
      }
      if(films.status === 'idle') {
        dispatch(fetchFilms({filmTitle: fields.filmTitle, filmYear: fields.filmYear}));
      }            
    };

    const onChangeHandler = (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      setFields({...fields, [e.target.name]: e.target.value});
    }

    const onClickToFavoritesHandler = (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      navigate('/favorites');
    }

      return (
          <Container>
            <Row>
              <Col xxl={12}>
                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                  <Row>
                    <Col xxl='5'>
                      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                          <Col xxl='3'>
                            <Form.Label column>Наименование:</Form.Label>
                          </Col>
                          <Col xxl='9'>
                            <Form.Control required type='text' placeholder='Наименование фильма' minLength={1} 
                            onChange={onChangeHandler} name='filmTitle' value={fields.filmTitle}></Form.Control>
                            <Form.Control.Feedback type='invalid'>Введите название</Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                    </Col>
                    <Col xxl='3'>
                      <Form.Group as={Row}>
                        <Col xxl='5'>
                          <Form.Label column> Год выпуска:</Form.Label>
                        </Col>
                        <Col xxl='6'>
                          <Form.Control placeholder='Год выпуска' min={1895} max={new Date().getFullYear()} type="number" value={fields.filmYear} name='filmYear' onChange={onChangeHandler}></Form.Control>
                          <Form.Control.Feedback type="invalid">Значение между 1895 и 
                          {new Date().getFullYear()}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xxl='2'><Button type='submit'>Поиск</Button></Col>
                    <Col xxl='2'><Button variant='outline-primary' onClick={onClickToFavoritesHandler}>Перейти в избранное</Button></Col>
                  </Row>  
                </Form> 
              </Col>
            </Row>
          </Container>
        
      );
    }
    