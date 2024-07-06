import React, { useState, useRef, useEffect } from 'react';
import 'src/Components/AlbumCarrossel/Carrossel.css';
import marcus from "src/Assets/ursal.jpg";
import audio from 'src/Assets/Ursal - Me diga o que será preciso.mp3';
import pitty from 'src/Assets/pitty2.jpeg';
import audio2 from 'src/Assets/Pitty - Me Adora (Clipe Oficial).mp3';
import skank from 'src/Assets/skank.webp'

const albums = [
  { id: 1, title: 'Album 1', image: marcus, audio: audio },
  { id: 2, title: 'Album 2', image: pitty, audio: audio2 },
  { id: 3, title: 'Album 3', image: skank, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 4, title: 'Album 4', image: marcus, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 5, title: 'Album 5', image: marcus, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const App = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(null);
  const audioRefs = useRef([]);

  const handleNext = () => {
    setCurrentAlbum((currentAlbum + 1) % albums.length);
    setTranslateX((translateX - 300) % (albums.length * 300));
  };

  const handlePrev = () => {
    if (currentAlbum === 0) return; // não vá para o álbum anterior se estiver no primeiro
    setCurrentAlbum((currentAlbum - 1 + albums.length) % albums.length);
    setTranslateX((translateX + 300) % (albums.length * 300));
  };

  const handlePlayPause = () => {
    const audio = audioRefs.current[currentAlbum];
    if (audio) {
      if (audio.paused) {
        if (playingAudio && playingAudio !== audio) {
          playingAudio.pause();
        }
        audio.play();
        setPlayingAudio(audio);
      } else {
        audio.pause();
        setPlayingAudio(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (playingAudio) {
        playingAudio.pause();
      }
    };
  }, [playingAudio]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="carousel">
          <div
            className="albums"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {albums.map((album, index) => {
              const isActive = index === currentAlbum;
              return (
                <div key={album.id} className={`album ${isActive ? 'active' : ''}`}>
                  <img src={album.image} alt={album.title} />
                  <div className="album-info">
                    <h2>{album.title}</h2>
                    <p>Descrição do álbum</p>
                    {album.audio && (
                      <audio
                        ref={(el) => (audioRefs.current[index] = el)}
                      >
                        <source src={album.audio} type="audio/mp3" />
                      </audio>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button className="carousel-control prev" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="carousel-control next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
        <button className="play-pause-btn" onClick={handlePlayPause}>
          {playingAudio && !playingAudio.paused ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default App;
