import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/contacts");
      const data = await res.json();
      setContacts(data.contacts);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/contacts/${id}`, {
        method: "DELETE",
      });
      fetchContacts(); // refresh list
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contact List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Mobile",
                  "Age",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-gray-300 px-4 py-2 text-center text-gray-700"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No contacts found.
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="even:bg-white odd:bg-gray-100 hover:bg-indigo-100 transition"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {c.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {c.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {c.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {c.mobileNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                      {c.age}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/update/${c.id}`)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded-md transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            Back to Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewContacts;
