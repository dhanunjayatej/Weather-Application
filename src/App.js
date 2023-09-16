import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null); // State to store temperature

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56d1f0fec2fed7e8e64806eca172d86d`)
      .then((response) => response.json())
      .then((data) => {
        if (data.main && data.main.temp) {
          const kelvin=data.main.temp;
          const celsius=Math.round(kelvin-273.15);
          setTemperature("Temparature at"+" "+city+ " is\n "+celsius+"C"); // Set the temperature in state
        } else {
          setTemperature(null); // Reset temperature if data is not as expected
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setTemperature(null); // Reset temperature on error
      });
  };

  return (
    <div>
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mt-2">Weather Application</h4>
            <form onSubmit={submitHandler}>
              <input type="text" name="city" className='mt-3 p-1' onChange={changeHandler} />
              <br />
              <button className='btn btn-info mt-3'>Get Temperature</button>
            </form>
              <h1 className='m-3'>{temperature}</h1>
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;