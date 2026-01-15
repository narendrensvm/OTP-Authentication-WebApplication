import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [identifier, setIdentifier] = useState("");
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!identifier) {
            alert("Please enter email or phone");
            return;
        }

        const res = await fetch("http://localhost:5000/auth/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier }),
        });

        const data = await res.json();

        if (!res.ok) {
            // User blocked or other error
            alert(data.message);
            return;
        }

        localStorage.setItem("identifier", identifier);
        navigate("/verify");
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
    };

    const formStyle = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    };

    const titleStyle = {
        marginBottom: '20px',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={titleStyle}>Login</h2>
                <input
                    placeholder="Email or Phone"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    style={inputStyle}
                />
                <button
                    onClick={sendOtp}
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Send OTP
                </button>
            </div>
        </div>
    );
}

export default Login;
