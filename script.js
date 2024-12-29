// Define the ThingSpeak channel and API key
const channelID = '2797124'; // Your ThingSpeak Channel ID
const readAPIKey = 'UAQBLOMI2WI5KZHC'; // Replace with your ThingSpeak Read API Key

// Function to fetch data from ThingSpeak
async function fetchSensorData() {
  try {
    // Fetch temperature data from Field 1
    const urlTemperature = `https://api.thingspeak.com/channels/${channelID}/fields/1.json?api_key=${readAPIKey}&results=1`;
    const responseTemperature = await fetch(urlTemperature);
    const dataTemperature = await responseTemperature.json();
    const temperature = dataTemperature.feeds[0].field1;

    // Fetch humidity data from Field 2
    const urlHumidity = `https://api.thingspeak.com/channels/${channelID}/fields/2.json?api_key=${readAPIKey}&results=1`;
    const responseHumidity = await fetch(urlHumidity);
    const dataHumidity = await responseHumidity.json();
    const humidity = dataHumidity.feeds[0].field2;

    // Fetch light intensity data from Field 3
    const urlLight = `https://api.thingspeak.com/channels/${channelID}/fields/3.json?api_key=${readAPIKey}&results=1`;
    const responseLight = await fetch(urlLight);
    const dataLight = await responseLight.json();
    const light = dataLight.feeds[0].field3;

    // Update the webpage with the fetched data
    document.getElementById('current-temperature').textContent = `${temperature} °C`;
    document.getElementById('current-humidity').textContent = `${humidity} %`;
    document.getElementById('current-light').textContent = `${light} %`;

    // Optionally, you can add logic to decide which plants are optimal based on the data
    displayOptimalPlants(temperature, humidity, light);

  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error);
  }
}

// Function to display optimal plants based on the current sensor values
function displayOptimalPlants(temperature, humidity, light) {
  // Define the optimal ranges for each plant type
  const plants = [
    {
      name: 'Tomato',
      temperatureRange: [20, 25], // Optimal temperature range for Tomato
      humidityRange: [60, 70],    // Optimal humidity range for Tomato
      lightRange: [60, 80],       // Optimal light intensity range for Tomato
    },
    {
      name: 'Lettuce',
      temperatureRange: [15, 20],
      humidityRange: [50, 60],
      lightRange: [40, 60],
    },
    {
      name: 'Cucumber',
      temperatureRange: [22, 28],
      humidityRange: [60, 80],
      lightRange: [70, 90],
    },
    {
      name: 'Rose',
      temperatureRange: [18, 24],
      humidityRange: [40, 60],
      lightRange: [50, 70],
    },
    {
      name: 'Sunflower',
      temperatureRange: [18, 25],
      humidityRange: [50, 60],
      lightRange: [80, 100],
    }
  ];

  // Check which plant is optimal based on the current sensor values
  const optimalPlants = plants.filter(plant => 
    temperature >= plant.temperatureRange[0] && temperature <= plant.temperatureRange[1] &&
    humidity >= plant.humidityRange[0] && humidity <= plant.humidityRange[1] &&
    light >= plant.lightRange[0] && light <= plant.lightRange[1]
  );

  // Display the optimal plants
  const plantList = document.getElementById('optimal-plants');
  plantList.innerHTML = ''; // Clear the current list
  if (optimalPlants.length > 0) {
    optimalPlants.forEach(plant => {
      const plantItem = document.createElement('li');
      plantItem.textContent = plant.name;
      plantList.appendChild(plantItem);
    });
  } else {
    plantList.innerHTML = '<li>No optimal plants found for the current conditions.</li>';
  }
}

// Call the function to fetch data when the page loads
fetchSensorData();

// Optionally, you can set an interval to fetch the data periodically (e.g., every 30 seconds)
setInterval(fetchSensorData, 30000);
