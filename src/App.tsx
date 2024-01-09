import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Film from './components/Film/Film';
import Favorites from './components/Favorites/Favorites';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' Component={MainPage} />
          <Route path='/film/:id' Component={Film} />
          <Route path='/favorites' Component={Favorites} />        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export const apiURL = `${process.env.REACT_APP_API_URL}apikey=${process.env.REACT_APP_API_KEY}&`;
export default App
