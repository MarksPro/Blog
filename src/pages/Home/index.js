import React, { Component } from 'react';
import '../../style/style.scss';
import firebase from '../../firebase';

class Home extends Component {
  state = {
    posts: []
  }

  loadingPosts = () => {
    firebase.app.ref('posts').on('value', snapshot => {
      let posts = [...this.state.posts];
      posts = [];
      snapshot.forEach(post => {this.getPosts(post, posts)});
      posts.reverse();
      this.setState({posts});
    });
  }

  getPosts = (post, posts) => {
    posts.push({
      key: post.key,
      autor: post.val().autor,
      titulo: post.val().titulo,
      imagem: post.val().imagem,
      descricao: post.val().descricao
    });
  }

  componentDidMount(){
    this.loadingPosts();
  }

  render() { 
    return ( 
      <section className="post__section">
        {this.state.posts.map(post => {
          return (
            <article key={post.key} className="post">
              <header className="post__header">
                <div>
                  <strong className="post__header__titulo">{post.titulo}</strong>
                  <span className="post__header__autor">Autor: {post.autor}</span>
                </div>
              </header>
              <img className="post__image" src={post.imagem} alt={`imagem ${post.titulo}`}></img>
              <footer className="post__footer">
                <p className="post__footer__description">{post.descricao}</p>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
}
 
export default Home;