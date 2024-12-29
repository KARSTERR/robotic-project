// Define optimal conditions for plants and trees
const plants = [
    { name: "Tomato", temperature: [18, 25], humidity: [60, 70], light: [60, 80] },
    { name: "Lettuce", temperature: [15, 20], humidity: [50, 70], light: [40, 60] },
    { name: "Basil", temperature: [20, 30], humidity: [40, 60], light: [70, 90] },
    { name: "Cucumber", temperature: [22, 28], humidity: [50, 70], light: [60, 80] },
    { name: "Spinach", temperature: [10, 20], humidity: [60, 80], light: [50, 70] }
  ];
  
  const trees = [
    { name: "Apple Tree", temperature: [15, 25], humidity: [50, 70], light: [50, 70] },
    { name: "Oak Tree", temperature: [10, 20], humidity: [40, 60], light: [40, 60] },
    { name: "Mango Tree", temperature: [25, 35], humidity: [60, 80], light: [70, 90] },
    { name: "Banana Tree", temperature: [20, 30], humidity: [60, 80], light: [60, 80] },
    { name: "Lemon Tree", temperature: [20, 30], humidity: [50, 70], light: [60, 80] }
  ];
  
  // Function to check if a value is within a range
  function isWithinRange(value, range) {
    return value >= range[0] && value <= range[1];
  }
  
  // Function to determine optimal plants/trees based on current sensor data
  function findOptimalPlantsTrees(temperature, humidity, light) {
    const optimalPlants = plants.filter(plant => 
      isWithinRange(temperature, plant.temperature) &&
      isWithinRange(humidity, plant.humidity) &&
      isWithinRange(light, plant.light)
    );
  
    const optimalTrees = trees.filter(tree => 
      isWithinRange(temperature, tree.temperature) &&
      isWithinRange(humidity, tree.humidity) &&
      isWithinRange(light, tree.light)
    );
  
    return { optimalPlants, optimalTrees };
  }
  
  // Fetch data from ThingSpeak
  async function fetchThingSpeakData() {
    const channelID = '2797124'; // Your ThingSpeak Channel ID
    const readAPIKey = 'UAQBLOMI2WI5KZHC'; // Your ThingSpeak Read API Key
  
    // Fetch the latest data from ThingSpeak
    const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1.json?api_key=${readAPIKey}&results=1`);
    const data = await response.json();
    
    const temperature = data.feeds[0].field1;
    const humidity = data.feeds[0].field2;
    const light = data.feeds[0].field3;
  
    // Update the page with the fetched data
    document.getElementById('current-temperature').textContent = temperature;
    document.getElementById('current-humidity').textContent = humidity;
    document.getElementById('current-light').textContent = light;
  
    // Find the optimal plants and trees based on the current sensor data
    const { optimalPlants, optimalTrees } = findOptimalPlantsTrees(temperature, humidity, light);
  
    // Display the optimal plants and trees
    document.getElementById('optimal-plants').textContent = optimalPlants.map(plant => plant.name).join(", ");
    document.getElementById('optimal-trees').textContent = optimalTrees.map(tree => tree.name).join(", ");
  }
  
  // Call the function to fetch data when the page loads
  fetchThingSpeakData();
  