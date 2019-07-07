import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login'
import DashBoard from './components/Dashboard';
import New from './components/New';
import Register from './components/Register';
import firebase from './firebase';

class Routes extends Component {
  state = {
    isConnect: false
  }

  componentDidMount(){
    firebase.isConnect()
    .then(response => {
      this.setState({isConnect: response})
    });
  }

  render(){
    return this.state.isConnect !== false ? ( 
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={DashBoard} />
          <Route exact path='/dashboard/new' component={New} />
          <Route exact path='/register' component={Register} />

        </Switch>
      </BrowserRouter>
     )
     : (
       <h1>Carregando...</h1>
     );
  }
}
 
export default Routes;