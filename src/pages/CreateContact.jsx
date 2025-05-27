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
    <div className="min-h-screen min-w-fit bg-white  flex items-center justify-center px-4">
      <div className=" w-full max-w-md p-8 justify-center rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Contact
        </h2>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full mb-4 px-4 py-2  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition"
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/view")}
            className="bg-gray-200 hover:bg-gray-300 text-white font-medium py-2 rounded-xl transition"
          >
            View Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
