import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return ( 
    <header className="main_header">
      <nav>
        <ul className="main_header__nav">
          <li><Link to="/">Front Blog</Link></li>
          <li><Link to="/login">Entrar</Link></li>
        </ul>
      </nav>
    </header>
   );
}
 
export default Header;