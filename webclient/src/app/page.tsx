"use client"
import { useState } from 'react';
import ResponseDisplay from '../components/ResponseDisplay';

export default function Home() {
  const [username, setUsername] = useState('');
  const [id, setId] = useState<string>('user-7ce7c2e4');
  const [friend, setFriend] = useState('');
  const [location, setLocation] = useState('');
  const [queryLink, setQueryLink] = useState<string>('http://localhost:3000');
  const [responseMessages, setResponseMessages] = useState<{ code: number; body: string }[]>([]);

  async function handleCreateUser() {
    const response = await fetch(queryLink + '/api/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username }),
    });
    const body = await response.text();
    setResponseMessages((prevMessages) => [...prevMessages, { code: response.status, body }]);
  }

  async function handleAddFriend() {
    const response = await fetch(queryLink + '/api/addfriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid: id, friend: friend }),
    });
    const body = await response.text();
    setResponseMessages((prevMessages) => [...prevMessages, { code: response.status, body }]);
  }

  async function handleSendLocation() {
    const response = await fetch(queryLink + '/api/sendloc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location }),
    });
    const body = await response.text();
    setResponseMessages((prevMessages) => [...prevMessages, { code: response.status, body }]);
  }

  async function handleGetLocation() {
    const response = await fetch(`${queryLink}/api/getloc?uuid=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.text();
    setResponseMessages((prevMessages) => [...prevMessages, { code: response.status, body }]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="title">
        <h1 className="text-4xl font-bold">API Tester</h1>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="user id"
          />
          <input
            type="text"
            value={queryLink}
            onChange={(e) => setQueryLink(e.target.value)}
            placeholder="localhost:xxxx"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
            placeholder="Friend"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <button onClick={handleCreateUser}>Create User</button>
          <button onClick={handleAddFriend}>Add Friend</button>
          <button onClick={handleSendLocation}>Send Location</button>
          <button onClick={handleGetLocation}>Get Location</button>
        </div>
      </div>
      <div className="mt-8">
        <h2>API Responses:</h2>
        <div className="mt-4">
          {responseMessages.map(({ code, body }, index) => (
            <ResponseDisplay key={index} code={code} body={body} />
          ))}
        </div>
      </div>
    </main>
  );
}