import React from 'react';
import ToyCard from './ToyCard';

const ToyContainer = (props) => {
  const renderToyCards = (props) => {
    return props.toys.map((toy) => (
      <ToyCard
        key={toy.id}
        toyData={toy}
        deleteHandler={props.deleteHandler}
        likeButtonHandler={props.likeButtonHandler}
      />
    ));
  };

  return <div id='toy-collection'>{renderToyCards(props)}</div>;
};

export default ToyContainer;
