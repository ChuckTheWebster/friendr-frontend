import React, { useContext, useEffect, useState } from 'react';
import MessageCard from './MessageCard';
import FriendrApi from './api';
import userContext from './userContext';
import { useLocation, useParams } from 'react-router-dom';
import RenderMessages from './RenderMessages';
import MessageForm from './MessageForm';
import { Card } from 'react-bootstrap';
/**
 * Renders a list of messages between two users.
 *
 * State:
 * - messages
 * - loading
 *
 * Context:
 * - user
 */
function MessagesList() {
  const { username } = useParams();
  const other_user = username;

  const { user } = useContext(userContext);
  const current_user = user.data.username;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("messages state=", messages);


  useEffect(function fetchAndSetMessages() {
    async function fetchMessages() {

      try {
        const data = await FriendrApi.getMessages(current_user, other_user);
        console.log("resp data=", data);
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  }, []);

  async function sendMessage(message) {
    const payload = {
      u1:current_user,
      u2:other_user,
      msg_text:message
    }

    const resp = await FriendrApi.sendMessage(payload);
    console.log("sendMessage resp=", resp);
  }

  if (loading) return <p>Loading...</p>;

  console.log("messages state2=", messages);

  return (
    <>
      <h1>Messages with {other_user}</h1>
      <div>
        <RenderMessages messages={messages} />
        <Card className='mt-5'>
          <Card.Body>
            <MessageForm submit={sendMessage}/>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default MessagesList;