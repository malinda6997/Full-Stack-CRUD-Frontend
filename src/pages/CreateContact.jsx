import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const CreateContact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await fetch("http://127.0.0.1:5000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ firstName: "", lastName: "", mobileNumber: "", age: "" });
      alert("Contact created!");
    } catch (error) {
      alert("Error creating contact");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Contact</h2>
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
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => navigate("/view")}>View Contacts</button>
    </div>
  );
};

export default CreateContact;
