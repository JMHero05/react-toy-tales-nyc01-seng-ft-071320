import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

import data from './data';

const baseUrl = 'http://localhost:3000/toys/';
class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  handleSubmit = (newObj) => {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(newObj),
    })
      .then((res) => res.json())
      .then((newToy) => {
        this.setState(() => ({
          toys: [...this.state.toys, newToy],
        }));
      });
  };

  deleteHandler = (id) => {
    fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const newToyArray = [...this.state.toys];
    newToyArray.splice(id - 1, 1);
    this.setState(() => ({
      toys: newToyArray,
    }));
  };

  likeButtonHandler = (id) => {
    const newToyArray = [...this.state.toys];
    const foundToy = newToyArray.find((toy) => toy.id === id);
    fetch(baseUrl + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        likes: foundToy.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((retObj) => {
        const retObjFoundToy = newToyArray.find((toy) => toy.id === retObj.id);
        retObjFoundToy.likes += 1;
        this.setState(() => ({
          toys: newToyArray,
        }));
      });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm addNewToy={this.handleSubmit} /> : null}
        <div className='buttonContainer'>
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          toys={this.state.toys}
          deleteHandler={this.deleteHandler}
          likeButtonHandler={this.likeButtonHandler}
        />
      </>
    );
  }

  componentDidMount() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState(() => ({
          toys: data,
        }));
      });
  }
}

export default App;
