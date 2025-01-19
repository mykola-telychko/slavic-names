const axios = require('axios');

// Send the GET request
async function fetchData() {
  try {
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=5&qty=30')
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=7&qty=100&type=codes')
    const response = await axios.get('http://localhost:3001/api/generate?number=integer&numlen=5&qty=89990')

    console.log('Response Data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.message);
    } else {
      console.error('Request Setup Error:', error.message);
    }
  }
}

fetchData();
// setInterval(() => { fetchData();}, 3000);