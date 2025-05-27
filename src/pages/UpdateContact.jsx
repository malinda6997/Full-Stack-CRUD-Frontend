import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style.css";

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:5000/contacts");
      const data = await res.json();
      const contact = data.contacts.find((c) => c.id === parseInt(id));
      setForm(contact);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:5000/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Contact updated!");
    navigate("/view");
  };

  return (
    <div className="form-container">
      <h2>Update Contact</h2>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="mobileNumber"
        value={form.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
      />
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => navigate("/view")}>Cancel</button>
    </div>
  );
};

export default UpdateContact;
