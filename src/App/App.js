import React from 'react';
import Header from '../Components/Header/Header'
import AlbumCarousel from '../Components/AlbumCarrossel/Carrossel';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <AlbumCarousel />
      </div>
    </div>
  );
}

export default App;
