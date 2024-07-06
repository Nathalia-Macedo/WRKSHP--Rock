import React from 'react';
import 'src/Components/Header/Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#albums">Álbuns</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
