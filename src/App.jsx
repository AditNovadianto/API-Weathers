import { useState, useEffect } from "react";
import { ContrastOutline } from "react-ionicons";

const App = () => {
  const [weather, setweather] = useState();
  const [search, setSearch] = useState("jakarta");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");

  // get weathers
  const getWeather = async () => {
    setLoading(true);

    const response = await fetch(
      `https://weatherdbi.herokuapp.com/data/weather/${search}`
    );

    const data = await response.json();

    setweather(data);

    setLoading(false);
  };

  console.log(weather);

  useEffect(() => {
    localStorage.theme == "dark" ? setTheme("dark") : setTheme("light");

    getWeather();
  }, []);

  const searchWeather = (e) => {
    e.preventDefault();
    getWeather();
  };

  // toggle darkmode
  const toggleDarkMode = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (theme == "dark") {
      localStorage.theme = "dark";
      document.body.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="container">
      <div className="header">
        <h1>Umang Weather</h1>

        {/* Dark Mode */}
        <ContrastOutline
          className="darkButton"
          color={theme == "dark" ? "white" : "black"}
          height="40px"
          width="40px"
          onClick={toggleDarkMode}
        />
      </div>

      {/* Search Weather */}
      <form onSubmit={searchWeather}>
        <input
          type="text"
          className="search"
          placeholder="Search Weather..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {/* Weathers */}
      {!loading && (
        <div>
          <h2>{weather?.region}</h2>
          <p>Dayhour: {weather?.currentConditions.dayhour}</p>

          <div className="condition">
            <img
              className="icon"
              src={weather?.currentConditions.iconURL}
              alt="iconURL"
            />
            <p className="temp">{weather?.currentConditions.temp.c}</p>
            <p className="celcius">°C | °F</p>

            <div>
              <p className="information">
                Precip: {weather?.currentConditions.precip}
              </p>
              <p className="information">
                Humidity: {weather?.currentConditions.humidity}
              </p>
              <p className="information">
                Wind: {weather?.currentConditions.wind.km} km/h
              </p>
            </div>
          </div>

          <div className="weathers">
            {weather?.next_days.map((w, index) => (
              <div className="weather" key={index}>
                <p>Day: {w.day}</p>
                <img src={w.iconURL} alt="iconURL" />
                <p>{w.comment}</p>
                <div className="minmax">
                  <p className="max">max: {w.max_temp.c}°</p>
                  <p className="min">min: {w.min_temp.c}°</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
