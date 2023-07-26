import { SOCKET_EVENT, SOCKET_UPDATE_EVENT, SOCKET_URL } from '@/app/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  if (res?.socket?.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res?.socket?.server);
    res.socket.server.io = io;


    io.on('connection', (socket) => {
      socket.on(SOCKET_EVENT, (msg: string) => {
        socket.emit(SOCKET_UPDATE_EVENT, msg);
      });
    });
  }
  res.end();
}
