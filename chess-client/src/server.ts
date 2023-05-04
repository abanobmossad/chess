import { io } from 'socket.io-client';
import axios from 'axios';

const baseURL = 'http://localhost:5000';
export const socket = io(baseURL);
export const GameSocket = io(`${baseURL}/game`);

export const API = axios.create({
  baseURL,
});
