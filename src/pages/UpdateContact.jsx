import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Contact</h2>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="text"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full mb-6 px-4 py-2 rounded-md border border-gray-500 bg-transparent focus:outline-none"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mb-3"
        >
          Update
        </button>
        <button
          onClick={() => navigate("/view")}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateContact;
