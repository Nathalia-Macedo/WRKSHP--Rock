//Importando os Hooks que usaremos
import React, { useState, useRef, useEffect } from 'react';
//Importando o css do projeto
import './Carrossel.css';
//Importando imagens e áudios que usaremos no projeto
import marcus from "../../Assets/marcusUrsal.jpg";
import audio from '../../Assets/Ursal - Me diga o que será preciso.mp3';
import pitty from '../../Assets/pitty2.jpeg';
import audio2 from '../../Assets/Pitty - Me Adora (Clipe Oficial).mp3';
import skank from '../../Assets/skank.webp';
import BS from '../../Assets/baianaSystem.jpeg'
import audio3 from '../../Assets/Água.mp3'
import audio4 from '../../Assets/Skank - Vamos Fugir (Lyric Video).mp3'
import legiao from '../../Assets/LegiãoUrbana.jpeg'
import audio5 from '../../Assets/Tempo Perdido.mp3'
//Criando os albuns:
const albums = [
  { id: 1,
     title: 'Ursal Banda',
      image: marcus,
      audio: audio,
      descricao: "A banda Ursal, liderada pelo vocalista Marcus Azevedo, é uma figura proeminente no cenário musical brasileiro contemporâneo. Originária de Salvador, Bahia, Ursal combina elementos de rock alternativo, indie e música brasileira, criando uma sonoridade única e envolvente." },
  { id: 2, title: 'Pitty', image: pitty, audio: audio2,descricao: "Pitty é uma cantora, compositora e instrumentista brasileira e baiana, conhecida por seu estilo único que combina rock, grunge e elementos do punk. " },
  { id: 3, title: 'Skank', image: skank, audio: audio4,descricao: "Skank é uma banda brasileira formada em 1991 na cidade de Belo Horizonte, Minas Gerais. Inicialmente, o grupo combinava reggae e ska com influências de rock e pop, criando um som único e cativante." },
  { id: 4, title: 'Baiana System', image: BS, audio: audio3,descricao: "Baiana System é uma banda brasileira formada em Salvador, Bahia, em 2009, conhecida por sua fusão única de ritmos tradicionais baianos com elementos de eletrônica, reggae, rock e hip-hop." },
  { id: 5, title: 'Legião Urbana', image: legiao, audio:audio5,descricao: "Legião Urbana foi uma das bandas mais emblemáticas e influentes do rock brasileiro, formada em Brasília em 1982 por Renato Russo (vocal, baixo e teclado), Dado Villa-Lobos (guitarra) e Marcelo Bonfá (bateria)."  },
];
//criando nosso componente App
const App = () => {
    // Definindo o estado para o álbum atual, 
    //inicialmente definido como 0 (primeiro álbum)
  const [currentAlbum, setCurrentAlbum] = useState(0);
    // Definindo o estado para a posição de translação no
    // eixo X, inicialmente definida como 0
  const [translateX, setTranslateX] = useState(0);
    // Definindo o estado para o áudio que está tocando,
    // inicialmente definido como null (nenhum áudio tocando)
  const [playingAudio, setPlayingAudio] = useState(null);
    // Criando uma referência para armazenar os elementos de
    // áudio
  const audioRefs = useRef([]);


  // Função para ir para o próximo álbum
  const handleNext = () => {
     // Atualiza o estado currentAlbum para o próximo álbum
    // (currentAlbum + 1) % albums.length garante que o 
    //índice volta ao início quando chegar ao final da lista
    // de álbuns
    setCurrentAlbum((currentAlbum + 1) % albums.length);
    // Atualiza o estado translateX para transladar a posição
    // da lista de álbuns
    // Cada álbum tem 300px de largura, então diminui 300px a
    // cada avanço
    // O módulo garante que a posição de translação não
    // exceda o número total de álbuns multiplicado por 300
    setTranslateX((translateX - 300) % (albums.length * 300));
  };

  //Função que impede o album de ir pro anterior caso esteja no primeiro
  const handlePrev = () => {
      // Verifica se o álbum atual é o primeiro (índice 0)
    if (currentAlbum === 0) return; // não vá para o álbum
    // anterior se estiver no primeiro
// Atualiza o estado currentAlbum para o álbum anterior
  // (currentAlbum - 1 + albums.length) % albums.length
  // garante que, se currentAlbum for 0, ele será configurado 
  //para o índice do último álbum
    setCurrentAlbum((currentAlbum - 1 + albums.length) % albums.length);
     // Atualiza o estado translateX para mover a lista de álbuns 300 pixels para a direita (para mostrar o álbum anterior)
  // O módulo % (albums.length * 300) garante que a 
  //translação permaneça dentro dos limites da largura total
  // dos álbuns
    setTranslateX((translateX + 300) % (albums.length * 300));
  };

  //Função que pausa o áudio
  const handlePlayPause = () => {
    //pega como referência o álbum que está tocando atualmente
    const audio = audioRefs.current[currentAlbum];
    //Verifica se a referência tem um áudio
    if (audio) {
      //se o áudio estiver pausado
      if (audio.paused) {
        //se estiver tocando e se esse áudio é diferente 
        //do audio que esta em foco
        if (playingAudio && playingAudio !== audio) {
          //se sim, ele para de tocar o audio que estava tocando 
          playingAudio.pause();
        }
        //E começa a tocar o audio que esta em foco
        audio.play();
        //Atualiza a variavel que guarda qual áudio está
        // tocando!
        setPlayingAudio(audio);
        //Senão, ou seja, se o audio atual está tocando
      } else {
        //Pausa o audio
        audio.pause();
        //e guarda na variável que nenhum áudio está tocando!
        setPlayingAudio(null);
      }
    }
  };

  const handleAlbumClick = (index) => {
      // Atualiza o estado currentAlbum para o índice do
      // álbum clicado
    setCurrentAlbum(index);
    setTranslateX(-index * 300); // Atualiza o translateX para focar no álbum clicado
  };

  //o useEffect é um hook que define o que é pra acontecer
  //Assim que entrar na página
  useEffect(() => {
    //Nesse caso, ele fica esperando a tecla de seta
    //para direita ser utilizada pelo usuário, se sim,
    // chama a função que passa para o próximo álbum
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
        //Se apertar a tecla de seta para esquerda,
        //chamamos a função responsável por voltar o álbum
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
        //Caso pressione a tecla de espaço, ele
        //chama a função que pausa a música
      } else if (event.key === ' ') {
        event.preventDefault(); // prevenir scroll da página quando espaço é pressionado
        handlePlayPause();
      }
    };

 
    //Ainda dentro do useEffect
  // Adiciona um ouvinte de eventos para pressionamentos de 
  //tecla na janela
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        // Retorna uma função de limpeza que será chamada 
        //quando o componente for desmontado ou quando 
        //currentAlbum, translateX, ou playingAudio mudarem

      window.removeEventListener('keydown', handleKeyDown);
          // Pausa o áudio se algum estiver tocando
      if (playingAudio) {
        playingAudio.pause();
      }
    };
  }, [currentAlbum, translateX, playingAudio]);

  useEffect(() => {
    // Reproduzir a nova música ao mudar de álbum, se havia
    // uma música tocando
    if (playingAudio) {// Verifica se há algum áudio tocando
      // Obtém a referência do novo áudio do álbum atual
      const newAudio = audioRefs.current[currentAlbum];
      // Verifica se a referência do novo áudio não é nula
      if (newAudio) {
        //Se não for nulo, paramos o audio antigo
        playingAudio.pause();
        //começamos a tocar o novo áudio
        newAudio.play();
        //e avisamos a variável que controla o áudio atual,
        //que esse é o novo áudio atual
        setPlayingAudio(newAudio);
      }
    }
  }, [currentAlbum]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="carousel">
          <div
            className="albums"
            style={{
              //o estilo se transforma, ele se mexe para
              //os lados, dependendo da variável translateX
              transform: `translateX(${translateX}px)`,
            }}
          > {/*Percorrendo a lista dos álbuns e pegando
          o album e a posição dele */}
            {albums.map((album, index) => {
              //testa se o alguns dos albuns tem a posição
              //do album que está em evidência
              const isActive = index === currentAlbum;
              return (
                <div 
                  key={album.id} 
                /*Adicionando o estilo diferente caso 
                    o album esteja ativo */
                  className={`album ${isActive ? 'active' : ''}`}
                  onClick={() => handleAlbumClick(index)} // Adiciona o evento de clique
                >
                  <img src={album.image} alt={album.title} />
                  <div className="album-info">
                    <h2>{album.title}</h2>
                    <p>{album.descricao}</p>
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
