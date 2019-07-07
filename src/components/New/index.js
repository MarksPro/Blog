import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';


class New extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      post: {
        titulo: '',
        imagem: '',
        descricao: ''
      },
      alert: ''

    }
  }

  componentDidMount(){
    if(!firebase.getCurrentUser()){
      this.props.history.replace('/')
      return null;
    }
  }

  getData = (e) => {
    const {post} = this.state;
    post[e.target.name] = e.target.value;
    this.setState({post})
  }

  registerPost = async (e) => {
    const {titulo, imagem, descricao} = this.state.post;
    
    e.preventDefault();

    if(titulo !== '' && imagem !== '' && descricao !== ''){
      const posts = firebase.app.ref('posts');
      const chave = posts.push().key;
      await posts.child(chave).set({
        titulo,
        imagem,
        descricao,
        autor: localStorage.name
      });
      this.props.history.push('/dashboard');
    }
    else {
      this.setState({alert: 'Preencha todos os campos!'})
    }
  }

  render() { 
    const {titulo, imagem, descricao} = this.state.post;
    return (
      <div>
        <header>
          <Link className="post__button" to="/dashboard">Voltar</Link>
        </header>
        <form className="post" onSubmit={this.registerPost}>
          <span className="post__alert">{this.state.alert}</span>
          <label className="post__label">Titulo:</label><br/>
          <input className="post__input" type="text" autoComplete="off" autoFocus value={titulo} name="titulo" onChange={this.getData} placeholder="Digite seu titulo"/><br/>

          <label className="post__label">Url da imagem:</label><br/>
          <input className="post__input" type="text" autoComplete="off" value={imagem} name="imagem" onChange={this.getData} placeholder="Digite a url aqui"/>

          <label className="post__label">Descrição</label><br/>
          <textarea className="post__input--area" type="text" autoComplete="off" value={descricao} name="descricao" onChange={this.getData} placeholder="Digite a descrição aqui"/>

          <button className="post__button" type="submit">Cadastrar</button>

        </form>
      </div>
    );
  }
}
 
export default withRouter(New);