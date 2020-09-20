import React, { Component } from 'react';

class ToyCard extends Component {
  onClickHandler = () => {
    const { id } = this.props.toyData;
    this.props.deleteHandler(id);
  };

  likeButtonOnClick = () => {
    const { id } = this.props.toyData;
    this.props.likeButtonHandler(id);
  };

  render() {
    const { id, image, likes, name } = this.props.toyData;
    return (
      <div className='card' id={id}>
        <h2>{name}</h2>
        <img src={image} alt={name} className='toy-avatar' />
        <p>{likes} Likes </p>
        <button className='like-btn' onClick={this.likeButtonOnClick}>
          Like {'<3'}
        </button>
        <button className='del-btn' onClick={this.onClickHandler}>
          Donate to GoodWill
        </button>
      </div>
    );
  }
}

export default ToyCard;
