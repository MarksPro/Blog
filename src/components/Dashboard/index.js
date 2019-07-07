import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import '../../style/style.scss';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: localStorage.name
    }
  }

  async componentDidMount(){
    if(!firebase.getCurrentUser()){
      this.props.history.replace('/login')
      return null;
    }

    firebase.getUserName((info) => {
      localStorage.name = info.val().nome;
      this.setState({name: localStorage.name})
    })
  }

  logout= async () => {
   await firebase.logout()
   .catch(error => {
     alert(error);
   })
   localStorage.removeItem('name');
   this.props.history.push('/');
  }

  render() { 
    return ( 
      <div className="dashboard">
        <h1 className="dashboard__title">Painel de controle</h1>
        <div className="dashboard__info">
          <h2 className="dashboard__welcome">Olá seja bem vindo {this.state.name}!</h2>
          <Link className="dashboard__newpost" to="/dashboard/new">Novo Post</Link>
        </div>
        <p className="dashboard__useremail">Logado com: {firebase.getCurrentUser()}</p>
        <button className="dashboard__logout" onClick={this.logout}>Sair</button>
      </div>
     );
  }
}
 
export default withRouter(DashBoard);