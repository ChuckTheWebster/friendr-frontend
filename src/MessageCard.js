import React, { useContext } from 'react'
import userContext from './userContext';

function MessageCard({message}) {
  const {user} = useContext(userContext);

  function isSenderCurrentUser() {
    return user.data.username === message.sender
  }

  return (
    <div className={isSenderCurrentUser() ? "bg-primary" : "bg-secondary"}>
      {message.message}
      </div>
  )
}

export default MessageCard