import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const EditUser = () => {
  const [judul, setJudul] = useState("");
  const [catatan, setCatatan] = useState("");
  const [kategori, setKategori] = useState("Pribadi");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/users/${id}`, {
        judul,
        catatan,
        kategori,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    setJudul(response.data.judul);
    setCatatan(response.data.catatan);
    setKategori(response.data.kategori);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  const cardStyle = {
    width: "80%",
    maxWidth: "600px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    color: "white",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "none",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#ffcc00",
    color: "black",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>✏️ Edit Catatan</h1>
        <form onSubmit={updateUser}>
          <div>
            <label>Judul Catatan</label>
            <input
              type="text"
              style={inputStyle}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul"
            />
          </div>
          <div>
            <label>Isi Catatan</label>
            <textarea
              style={{ ...inputStyle, height: "100px" }}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan"
            ></textarea>
          </div>
          <div>
            <label>Kategori Catatan</label>
            <select
              style={inputStyle}
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="Pribadi">Pribadi</option>
              <option value="Pekerjaan">Pekerjaan</option>
              <option value="Pendidikan">Pendidikan</option>
            </select>
          </div>
          <div>
            <button type="submit" style={buttonStyle}>✅ Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
