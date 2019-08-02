import axios from 'axios';
import eventEmmiter from './emitter';

async function fetchData(config) {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      eventEmmiter.emit('onTokenExpired');
    }
    throw error;
  }
}

export default fetchData;
