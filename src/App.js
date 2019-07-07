import React, { Component } from 'react';
import './style/style.scss';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Routes/>
    );
  }
}
 
export default App;