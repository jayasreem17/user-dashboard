import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

const sortByName = () => {
  const sorted = [...users].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
  setUsers(sorted);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedUser) {
    return (
      <div>
        <button onClick={() => setSelectedUser(null)}>Back</button>
        <h2>{selectedUser.name}</h2>
        <p>Email: {selectedUser.email}</p>
        <p>Phone: {selectedUser.phone}</p>
        <p>Company: {selectedUser.company.name}</p>
        <p>City: {selectedUser.address.city}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={sortByName}>Sort by Name</button>

      <input
        placeholder="Search by name/email"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} onClick={() => setSelectedUser(user)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;