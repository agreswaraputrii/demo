import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    setUser(response.data);
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const deleteUser = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`${BASE_URL}/users/${selectedUser.id}`);
        getUsers();
        setShowModal(false);
        setSelectedUser(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const containerStyle = {
    display: "flex", 
    justifyContent: "center", 
    marginTop: "40px"
  };

  const cardStyle = {
    width: "80%",
    maxWidth: "900px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    color: "white",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    letterSpacing: "1px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden"
  };

  const thTdStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color: "black"
  };

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginRight: "6px",
    fontWeight: "bold"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>📒 Daftar Catatan ✨</h1>
        <Link
          to={`add`}
          style={{ ...buttonStyle, background: "#ffcc00", color: "black", display: "inline-block", marginBottom: "10px" }}
        >
          ➕ Tambah Catatan
        </Link>
        <table style={tableStyle}>
          <thead style={{ background: "#2575fc", color: "white" }}>
            <tr>
              <th style={thTdStyle}>No</th>
              <th style={thTdStyle}>Judul Catatan</th>
              <th style={thTdStyle}>Isi Catatan</th>
              <th style={thTdStyle}>Kategori</th>
              <th style={{ ...thTdStyle, textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} style={{ background: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={thTdStyle}>{index + 1}</td>
                <td style={thTdStyle}>{user.judul}</td>
                <td style={thTdStyle}>{user.catatan}</td>
                <td style={thTdStyle}>{user.kategori}</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    <Link
                      to={`edit/${user.id}`}
                      style={{ ...buttonStyle, background: "#3498db", color: "white" }}
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(user)}
                      style={{ ...buttonStyle, background: "#e74c3c", color: "white" }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal Konfirmasi Hapus */}
      {showModal && (
        <div style={{
          position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <h2>Apakah Anda yakin ingin menghapus catatan ini?</h2>
            <p><b>{selectedUser?.judul}</b></p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={deleteUser} style={{ padding: "10px", background: "#e74c3c", color: "white", borderRadius: "6px", marginRight: "10px" }}>
                ✅ Hapus
              </button>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px", background: "#3498db", color: "white", borderRadius: "6px" }}>
                ❌ Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;