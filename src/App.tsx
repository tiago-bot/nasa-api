import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'hdPD6979Odo16irwRDgNbe2vDlcbUE8h7AJARbJ8';
const API_URL = `https://api.nasa.gov/planetary/apod`;

interface NasaData {
  title: string;
  explanation: string;
  url: string;
}

const App: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [nasaData, setNasaData] = useState<NasaData | null>(null);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          date: date,
        },
      });
      setNasaData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da API da NASA:', error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="app">
      <video autoPlay muted loop id="myVideo">
        <source src="/video.mp4" type="video/mp4" />
      </video> 
      <div className="container">
        <h1 className="title">Foto diária da NASA</h1>
        <p className="subtitle">
          Veja a imagem de astronomia do dia selecionado
        </p>
        <div className="img-gap">
          <img src='/NASA_logo.png' alt='NASA Logo' className='nasa-logo'/>
          <p>Todos os direitos reservados à NASA</p>
        </div> 
        <div className="date-picker">
          <label htmlFor="date" className='date-lb'>Selecione a Data: </label>
          <input type="date" id="date" value={date} onChange={handleDateChange} />
        </div>

        {nasaData && (
          <div className="apod-info">
            <h2 className="apod-title">{nasaData.title}</h2>
            <p className="apod-explanation">{nasaData.explanation}</p>
            <img
              src={nasaData.url}
              alt={nasaData.title}
              className="apod-image"
            />
                    <div className="footer-main">
           <p className='footer'>Desenvolvido por <a href="https://tiago-bot.github.io" target='black' className='name-author'>Tiago Triani</a>
        </p>
      </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
