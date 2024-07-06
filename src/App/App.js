import React from 'react';
import Header from 'src/Components/Header/Header';
import AlbumCarousel from 'src/Components/AlbumCarrossel/Carrossel';
import 'src/App/App.css';

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
