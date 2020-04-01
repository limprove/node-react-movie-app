import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const { userFrom, movieId, movieInfo } = props;
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  const [Favorite, setFavorite] = useState({
    number: 0,
    toggle: false,
  });

  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables).then(response => {
      // setFavoriteNumber(response.data.favoriteNumber);
      setFavorite({
        ...Favorite,
        number: response.data.favoriteNumber,
      });
      if (response.data.success) {
      } else {
        alert('숫자 정보를 가져오는데 실패 했습니다.');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then(response => {
      if (response.data.success) {
        // setFavorited(response.data.favorited);
        setFavorite({
          ...Favorite,
          toggle: response.data.favorited,
        });
      } else {
        alert('정보를 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorite.toggle) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then(
        response => {
          if (response.data.success) {
            setFavorite({
              ...Favorite,
              ...Favorite.number,
              number: Favorite.number - 1,
              toggle: !Favorite.toggle,
            });
          } else {
            alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
          }
        },
      );
    } else {
      Axios.post('/api/favorite/addToFavorite', variables).then(response => {
        if (response.data.success) {
          setFavorite({
            ...Favorite,
            ...Favorite.number,
            number: Favorite.number + 1,
            toggle: !Favorite.toggle,
          });
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorite.toggle ? 'Not Favorite' : 'Add to Favorite'} {Favorite.number}
      </Button>
    </div>
  );
}

export default React.memo(Favorite);
