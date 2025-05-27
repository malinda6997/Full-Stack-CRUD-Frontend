import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Contact</h2>

        <input
          type="text"
          placeholder="First Name"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />

        <button
          onChange={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-md mb-3"
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/view")}
          className="w-full bg-gray-700 text-white py-2 rounded-md"
        >
          View Contacts
        </button>
      </div>
    </div>
  );
};

export default CreateContact;
