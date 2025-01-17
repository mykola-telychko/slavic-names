const axios = require('axios');

// Define the parameters
const params = {
  qty: 1000         // Replace with desired quantity
};

// Send the GET request
async function fetchData() {
  try {
    // const response = await axios.get('http://localhost:3000/api/generate?name=string&age=number&date=unix', { params });
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=8', { params });
    const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=8&qty=3000000')

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

//fetchData();

setInterval(() => { fetchData();}, 3000);