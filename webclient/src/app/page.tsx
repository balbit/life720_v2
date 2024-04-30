"use client"
import React, { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [id, setId] = useState<string>('user-7ce7c2e4');
  const [friend, setFriend] = useState('');
  const [location, setLocation] = useState('');
  const [queryLink, setQueryLink] = useState<string>('http://localhost:3000');
  const [responseMessages, setResponseMessages] = useState<string[]>([]);


  async function handleCreateUser() {
    const response = await fetch(queryLink + '/api/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username})
    });
    const message = await response.text();
    setResponseMessages(prevMessages => [...prevMessages, message]);
  }

  async function handleAddFriend() {
    const response = await fetch(queryLink + '/api/addfriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid: id, friend: friend })
    });
    const message = await response.text();
    setResponseMessages(prevMessages => [...prevMessages, message]);
  }

  async function handleSendLocation() {
    const response = await fetch(queryLink + '/api/sendloc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location })
    });
    const message = await response.text();
    setResponseMessages(prevMessages => [...prevMessages, message]);
  }

  async function handleGetLocation() {
    const response = await fetch(`${queryLink}/api/getloc?uuid=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const message = await response.text();
    setResponseMessages(prevMessages => [...prevMessages, message]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="user id"
        />
        <input
          type="text"
          value={queryLink}
          onChange={e => setQueryLink(e.target.value)}
          placeholder="localhost:xxxx"
        />
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={handleCreateUser}>Create User</button>
        <br />
        <input
          type="text"
          value={friend}
          onChange={e => setFriend(e.target.value)}
          placeholder="Friend"
        />
        <button onClick={handleAddFriend}>Add Friend</button>
        <br />
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location"
        />
        <button onClick={handleSendLocation}>Send Location</button>
        <br />
        <button onClick={handleGetLocation}>Get Location</button>
      </div>
      <div className="mt-8">
        <h2>API Responses:</h2>
        <div className="mt-4 h-48 overflow-y-scroll border border-gray-300 p-4">
          {responseMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </main>
  );
}