import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import '../../style/style.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {
        nome: '',
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

  register = (e) => {
    e.preventDefault();
    this.onRegister();
  }

  onRegister = async () => {
    try {

      const {nome, email, password} = this.state.user;
      await firebase.registerUser(nome, email, password);
      this.props.history.replace('/dashboard');

    }
    catch(error){
      alert(error.message);
    }
  }

  render() { 
    const {nome, email, password} = this.state.user;
    return ( 
      <div>
        <h1 className="register__title">Novo Usuário</h1>
        <form className="register" onSubmit={this.register}>
          <label className="register__label">Nome:</label><br/>
          <input className="register__input" type="text" autoComplete="off" value={nome} name="nome" onChange={this.getData} placeholder="Digite seu nome"/><br/>

          <label className="register__label">Email:</label><br/>
          <input className="register__input" type="email" autoComplete="off" value={email} name="email" onChange={this.getData} placeholder="email@email.com"/><br/>

          <label className="register__label">Senha:</label><br/>
          <input className="register__input" type="password" autoComplete="off" value={password} name="password" onChange={this.getData} placeholder="Sua senha"/>

          <button className="register__button" type="submit">Cadastrar</button>
        </form>
      </div>
     );
  }
}
 
export default withRouter(Register);