import connectToSocketIoServer from 'socket.io-client';

export const socket = connectToSocketIoServer('http://localhost:8080');