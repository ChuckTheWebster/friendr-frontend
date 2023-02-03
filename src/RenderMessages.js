import React from 'react';
import MessageCard from './MessageCard';

export default function RenderMessages({ messages }) {

  console.log("render messages", messages);
  return (
    <>
      {messages.map( (m, i) => <MessageCard key={`${m.username}-${i}`} message={m} />)}
    </>
  );
}
