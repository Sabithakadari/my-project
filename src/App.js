import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './landing-page';
import ResultsPage from './results-page';

class App extends React.Component {
  
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/resultsPage' element={<ResultsPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
