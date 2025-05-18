import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const AddCatatan = () => {
  const [judul, setJudul] = useState("");
  const [catatan, setCatatan] = useState("");
  const [kategori, setKategori] = useState("Pribadi");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveCatatan = async (e) => {
    e.preventDefault();

    // ✅ Validasi input
    if (judul.trim() === "" || catatan.trim() === "") {
      setMsg("Judul dan Isi Catatan tidak boleh kosong.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/catatan`, {
        judul,
        catatan,
        kategori,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
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
    outline: "none"
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#ffcc00",
    color: "black",
    marginTop: "20px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>📝 Tambah Catatan Baru</h2>
        {msg && <p style={{ color: "#ffcc00", fontWeight: "bold" }}>{msg}</p>}

        <form onSubmit={saveCatatan}>
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <label>Judul Catatan</label>
            <input
              type="text"
              style={inputStyle}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul"
            />
          </div>

          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <label>Isi Catatan</label>
            <textarea
              style={inputStyle}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan"
              rows={5}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: "15px" }}>
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

          <button type="submit" style={buttonStyle}>✅ Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddCatatan;
