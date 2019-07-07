import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import '../../style/style.scss';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
  }

  getData = (e) => {
    const {user} = this.state;
    user[e.target.name] = e.target.value;
    this.setState({user})
  }

  enter = (e) => {
    e.preventDefault();
    this.login();
  }

  login = async () => {
    const {email, password} = this.state.user;
    try {

      await firebase.login(email, password)
      .catch(error => {
        if(error.code === 'auth/user-not-found')
          alert('Este usuário não existe!');
        else {
          alert('Codigo de erro: ' + error.code);
          return null
        };
      });
      this.props.history.replace('/dashboard') 

    }
    catch(error){
      alert(error.message);
    };
  }

  componentDidMount(){
    if(firebase.getCurrentUser())
      return this.props.history.replace('/dashboard');
  }

  render() { 
    const {email, password} = this.state.user;
    return ( 
      <div>
        <form onSubmit={this.enter} className="login">

          <label className="login__label">Email:</label><br/>
          <input className="login__input" type="email" autoComplete="off" autoFocus value={email} name="email" onChange={this.getData} placeholder="email@email.com"/><br/>

          <label className="login__label">Senha:</label><br/>
          <input className="login__input" type="password" autoComplete="off" value={password} name="password" onChange={this.getData} placeholder="Sua senha"/>

          <button className="login__button" type="submit">Entrar</button>

          <Link className="login__register" to="/register">Ainda não possui uma conta? <br/>Clique aqui!</Link>
        </form>
      </div>
     );
  }
}
 
export default withRouter(Login);