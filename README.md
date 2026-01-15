# OTP-Based Authentication Web Application

## Overview

This project is a simple full-stack web application that demonstrates OTP-based authentication using a minimal and clean implementation.

The purpose of this project is to showcase logical problem-solving, backend and frontend integration, and handling of real-world edge cases such as OTP retries and temporary user blocking. The focus is kept on clarity and functionality rather than heavy frameworks or abstractions.

This application was developed as part of a Fullstack Developer interview challenge.

---

## Features

- Login using email or phone number
- One-Time Password (OTP) based authentication
- OTP expiry handling
- Maximum 3 OTP verification attempts
- Automatic blocking for 10 minutes after 3 failed attempts
- Session token generation on successful verification
- Token persistence using localStorage
- Protected Welcome page after login

OTP delivery is mocked and printed in the backend console for simplicity.

---

## Tech Stack Used

### Frontend
- React.js
- React Router DOM
- Fetch API
- LocalStorage for session handling

### Backend
- Node.js
- Express.js
- UUID (for generating session tokens)
- CORS

### Other
- No database (in-memory storage)
- No third-party OTP or authentication services

---

## OTP & Authentication Logic

- OTP is a randomly generated 6-digit number
- OTP validity duration is 2 minutes
- Users are allowed a maximum of 3 incorrect OTP attempts
- After 3 failed attempts, the email or phone number is blocked for 10 minutes
- Blocked users are restricted at the login page itself
- On successful OTP verification, a mock session token is generated

---

