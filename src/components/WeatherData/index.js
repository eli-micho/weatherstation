import React from 'react';
import { renderError, validateInput } from './../handleErrors';
import { api_key } from './../../apikey';
import './styles.scss';

const WeatherData = () => {
    async function returnWeatherCall(url) {
        try{
            const res = await fetch(url, {mode: "cors"});
            const weatherData = await res.json();
            renderWeatherToDom(weatherData)
        }catch(err){
            renderError()
        }
    };

    const getWeatherUrl = () => {
        const city = document.querySelector('#search-input').value;
        if(validateInput(city)) return false;
    
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        returnWeatherCall(url)
    };

    const clearDiv = () => {
        const container = document.getElementById('display-results-container');
        if(container) {
            container.remove()
        }
    }

    const renderWeatherToDom = (weatherData) => {
        clearDiv()
        const container = document.createElement('div') 
        container.setAttribute('id','display-results-container');
        
    
        const location = document.createElement('h1');
        const currentTime = document.createElement('span');
        const dataWrap = document.createElement('div');
        const temperature = document.createElement('span');
        const feelsLikeTemp = document.createElement('span');
        const minTemp = document.createElement('span');
        const maxTemp = document.createElement('span');
        const humidity = document.createElement('span');
    
        const time = new Date().toLocaleTimeString(['en-us'], {hour: '2-digit', minute: '2-digit'})
    
        location.setAttribute('id', 'location');
        location.textContent = weatherData.name;
    
        currentTime.setAttribute('id', 'current-time')
        currentTime.textContent = time;
    
        dataWrap.setAttribute('id', 'data-wrap');
    
        temperature.textContent = `Current Temperature: ${weatherData.main.temp}\xB0C`
    
        feelsLikeTemp.textContent = `Feels Like: ${weatherData.main.feels_like}\xB0C`
    
        minTemp.textContent = `Today's Low: ${weatherData.main.temp_min}\xB0C`;
    
        maxTemp.textContent = `Today's High: ${weatherData.main.temp_max}\xB0C`;
    
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    
        dataWrap.appendChild(temperature);
        dataWrap.appendChild(feelsLikeTemp);
        dataWrap.appendChild(minTemp);
        dataWrap.appendChild(maxTemp);
        dataWrap.appendChild(humidity);
    
        container.appendChild(location);
        container.appendChild(currentTime);
        container.appendChild(dataWrap);
    
        document.querySelector('.main').appendChild(container);
        container.classList.add('fade-in');
        
    };

    const renderSearchUI = (e) => {
        e.preventDefault();
        getWeatherUrl()
    }
    

    return (
        <div>
            <header className="header">
                <h1 id="app-title">Weather App</h1>
                <span>Made by <a id="github-link" href="https://github.com/eli-micho/weatherstation">Elijah M</a>. 2021.</span>
            </header>

            <div className="main">        
                <div id="search-container">
                    <form id="search-form">
                        <input type="text" id="search-input" placeholder="Search City" size="40" />
                        <input type="submit" className="btn" id="searchBtn" value="Search" onClick={renderSearchUI} />
                    </form>

                    <div id="error-message-container" style={{display: 'none'}}>
                        <span>Enter Valid City Name</span>
                    </div>
                </div>
                <div className="break"></div>
            </div>
        </div>
    );
};

export default WeatherData;
