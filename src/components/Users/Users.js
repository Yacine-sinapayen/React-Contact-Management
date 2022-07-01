import React, { useEffect, useState } from "react";
import "./Users.scss";

export default function User() {
  const [users, setUsers] = useState([]);

  // Get contact
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(users);
  return (
    <>
      <h1>Listes des utilisateurs</h1>
      <div>
        {users.map((a) => (
          <div className="users" key={a.id}>
            <p>{a.name}</p>
            <p>{a.username}</p>
            <p>{a.email}</p>
            <p>{a.phone}</p>
            <p>{a.website}</p>
            <p>{a.address.street}</p>
          </div>
        ))}
      </div>
    </>
  );
}
