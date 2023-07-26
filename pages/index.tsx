'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { SOCKET_EVENT, SOCKET_UPDATE_EVENT } from '@/app/models';

let socket: any;

export default function Home() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const socketInitializer = async () => {
      try {
        await fetch('http://localhost:3000/api/socket');

        socket = io();

        socket.on('connect', () => {
          console.log('connected');
        });

        socket.on(SOCKET_UPDATE_EVENT, (msg: string) => {
          setValue(msg);
        });

        socket.on('disconnect', () => {
          console.log('disconnected');
        });
      } catch (error) {
        console.log(error);
      }
    };

    socketInitializer();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    socket.emit(SOCKET_EVENT, newValue);
  };

  return (
    <div>
      Home
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Type something"
      />
    </div>
  );
}
