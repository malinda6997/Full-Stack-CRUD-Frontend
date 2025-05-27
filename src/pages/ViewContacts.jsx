import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    const res = await fetch("http://127.0.0.1:5000/contacts");
    const data = await res.json();
    setContacts(data.contacts);
  };

  const deleteContact = async (id) => {
    await fetch(`http://127.0.0.1:5000/contacts/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="table-container">
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.mobileNumber}</td>
              <td>{c.age}</td>
              <td>
                <button
                  className="action-button update"
                  onClick={() => navigate(`/update/${c.id}`)}
                >
                  Update
                </button>
                <button
                  className="action-button delete"
                  onClick={() => deleteContact(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/")}>Back to Create</button>
    </div>
  );
};

export default ViewContacts;
