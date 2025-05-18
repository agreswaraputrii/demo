import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState("Male");
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMsg, setNotificationMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            setMsg("Password dan konfirmasi password tidak cocok");
            // Show error notification
            setNotificationType('error');
            setNotificationMsg("Password dan konfirmasi password tidak cocok");
            setShowNotification(true);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }
        try {
            await axios.post(`${BASE_URL}/register`, {
                name: name,
                email: email,
                gender,
                password: password
            });
            
            // Show success notification
            setNotificationType('success');
            setNotificationMsg('Registrasi berhasil! Mengalihkan ke halaman login...');
            setShowNotification(true);
            
            // Navigate after short delay to show notification
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                // Show error notification
                setNotificationType('error');
                setNotificationMsg(error.response.data.msg || 'Registrasi gagal. Silakan coba lagi.');
                setShowNotification(true);
                
                // Hide notification after 3 seconds
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            }
        }
    }

    // Custom styles
    const containerStyle = {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: "20px"
    };

    const cardStyle = {
        width: "90%",
        maxWidth: "500px",
        background: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        padding: "30px",
        color: "#333",
        textAlign: "center"
    };

    const titleStyle = {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "25px",
        color: "#6a11cb",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        letterSpacing: "1px"
    };

    const formGroupStyle = {
        marginBottom: "20px",
        textAlign: "left"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: "bold",
        color: "#555"
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "16px",
        transition: "border 0.3s",
        boxSizing: "border-box"
    };

    const selectStyle = {
        ...inputStyle,
        backgroundColor: "white",
        appearance: "menulist" // Show dropdown arrow
    };

    const buttonStyle = {
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        width: "100%",
        fontSize: "16px",
        transition: "background 0.3s",
        marginTop: "10px"
    };

    const errorStyle = {
        color: "#e74c3c",
        marginBottom: "15px",
        fontWeight: "bold"
    };
    
    const notificationStyle = {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px 25px",
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        fontSize: "16px",
        fontWeight: "bold",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out forwards"
    };
    
    const successStyle = {
        ...notificationStyle,
        backgroundColor: "#2ecc71",
        color: "white",
        border: "1px solid #27ae60"
    };
    
    const errorNotificationStyle = {
        ...notificationStyle,
        backgroundColor: "#e74c3c",
        color: "white",
        border: "1px solid #c0392b"
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>📝 Register Akun ✨</h1>
                {msg && <p style={errorStyle}>{msg}</p>}
                
                <form onSubmit={Register}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Nama</label>
                        <input 
                            type="text" 
                            style={inputStyle} 
                            placeholder="Masukkan nama lengkap" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Email</label>
                        <input 
                            type="email" 
                            style={inputStyle} 
                            placeholder="Masukkan email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Gender</label>
                        <select
                            style={selectStyle}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input 
                            type="password" 
                            style={inputStyle} 
                            placeholder="Masukkan password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Konfirmasi Password</label>
                        <input 
                            type="password" 
                            style={inputStyle} 
                            placeholder="Konfirmasi password" 
                            value={confPassword} 
                            onChange={(e) => setConfPassword(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{...buttonStyle, background: "#2575fc", color: "white"}}
                    >
                        ✅ Register
                    </button>
                    
                    <Link to="/">
                        <button 
                            type="button" 
                            style={{...buttonStyle, background: "#ffcc00", color: "black"}}
                        >
                            ↩️ Kembali ke Login
                        </button>
                    </Link>
                </form>
                
                {/* Notification */}
                {showNotification && (
                    <div style={notificationType === 'success' ? successStyle : errorNotificationStyle}>
                        {notificationType === 'success' ? '✅ ' : '❌ '}
                        {notificationMsg}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register