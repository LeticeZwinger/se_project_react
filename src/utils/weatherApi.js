const baseUrl = "http://localhost:3001";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return request(url);
};

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const addItem = (name, imageUrl, weather) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const deleteItem = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.location = data.name;
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((data.main.temp - 32) * 5) / 9);

  result.temp = {
    F: tempF,
    C: tempC,
  };

  result.type = getWeatherType(tempF);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
