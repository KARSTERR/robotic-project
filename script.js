document.addEventListener('DOMContentLoaded', function() {
  const channelID = '2797124'; // Your ThingSpeak Channel ID
  const readAPIKey = 'UAQBLOMI2WI5KZHC'; // Replace with your ThingSpeak Read API Key

  async function fetchDataAndUpdateUI() {
      try {
          const urlTemp = `https://api.thingspeak.com/channels/${channelID}/fields/1.json?api_key=${readAPIKey}&results=1`;
          const responseTemp = await fetch(urlTemp);
          const dataTemp = await responseTemp.json();
          const temperature = parseFloat(dataTemp.feeds[0].field1).toFixed(2);

          const urlHumidity = `https://api.thingspeak.com/channels/${channelID}/fields/2.json?api_key=${readAPIKey}&results=1`;
          const responseHumidity = await fetch(urlHumidity);
          const dataHumidity = await responseHumidity.json();
          const humidity = parseFloat(dataHumidity.feeds[0].field2).toFixed(2);

          const urlLight = `https://api.thingspeak.com/channels/${channelID}/fields/3.json?api_key=${readAPIKey}&results=1`;
          const responseLight = await fetch(urlLight);
          const dataLight = await responseLight.json();
          const light = parseFloat(dataLight.feeds[0].field3).toFixed(2);

          // Convert temperature and humidity to integers
          const roundedTemperature = Math.round(parseFloat(temperature));
          const roundedHumidity = Math.round(parseFloat(humidity));
          const roundedLight = Math.round(parseFloat(light));

          document.getElementById('current-temperature').textContent = `Current Temperature: ${roundedTemperature}°C`;
          document.getElementById('current-humidity').textContent = `Current Humidity: ${roundedHumidity}%`;
          document.getElementById('current-light').textContent = `Current Light Intensity: ${roundedLight} lux`;

          displayOptimalPlants(roundedTemperature, roundedHumidity, roundedLight);

      } catch (error) {
          console.error('Error fetching data from ThingSpeak:', error);
      }
  }

  function displayOptimalPlants(temperature, humidity, light) {
      // Example logic to determine optimal plants based on temperature, humidity, and light intensity
      const optimalPlants = [];

      if (temperature >= 20 && temperature <= 30 && humidity >= 40 && humidity <= 60 && light >= 500 && light <= 1000) {
          optimalPlants.push('Tomato', 'Cucumber');
      } else if (temperature >= 15 && temperature <= 25 && humidity >= 30 && humidity <= 50 && light >= 400 && light <= 800) {
          optimalPlants.push('Pepper', 'Eggplant');
      } else {
          document.getElementById('optimal-plants').textContent = 'No optimal plants found';
          return;
      }

      const plantsList = optimalPlants.join(', ');
      document.getElementById('optimal-plants').textContent = `Optimal Plants: ${plantsList}`;
  }

  // Fetch data and update UI every minute
  setInterval(fetchDataAndUpdateUI, 60000);
});