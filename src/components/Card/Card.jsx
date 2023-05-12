import style from './Card.module.css'
import { Link } from 'react-router-dom';
import { addFav, removeFav } from '../../Redux/action';
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';

const Card = ({ id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites }) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    isFav ? removeFav(id) : addFav({ id, name, status, species, gender, origin, image, onClose });
    setIsFav(!isFav)
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={style.card}>
      {
        (
          <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button>)
      }
      <button onClick={() => { onClose(id) }}>Close</button>
      <Link to={`/detail/${id}`}>
        <div className={style.front}>
          <img src={image} alt="" />
          <h1>Name: "{name}"</h1>
        </div>
        <div className={style.back}>
          <p>Status: "{status}"</p>
          <p>Species: "{species}"</p>
          <p>Gender: "{gender}"</p>
          <p>Origin: "{origin}"</p>
        </div>
      </Link>


    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  }
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Card)


