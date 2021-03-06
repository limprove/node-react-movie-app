import React from 'react';

function MainImage(props) {
  const hendleClick = e => {
    console.log(props);
  };

  return (
    <a href={`/movie/${props.movieId}`} onClick={hendleClick}>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)
  39%, rgba(0,0,0,0)
  41%, rgba(0,0,0,0.65)
  100%),
  url('${props.image}'), #1c1c1c`,
          height: '500px',
          backgroundSize: '100%, cover',
          backgroundPosition: 'center, center',
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            maxWidth: '500px',
            bottom: '2rem',
            marginLeft: '2rem',
          }}
        >
          <h2 style={{ color: 'white' }}>
            {props.title}
            <p style={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>
          </h2>
        </div>
      </div>
    </a>
  );
}

export default MainImage;
