# OTP-Authentication-WebApplication

This project is a minimal full-stack web application that demonstrates OTP-based authentication using a simple client–server architecture.

The goal of this project is not to build a production-ready authentication system, but to clearly showcase:
Logical thinking
Backend and frontend integration
Handling edge cases like OTP retries and blocking
Clean and readable code
This project was built as part of a Fullstack Developer interview challenge.

**Features:**
Login using email or phone number
OTP generation and validation
OTP expiry handling
Maximum 3 OTP verification attempts
Automatic blocking for 10 minutes after 3 failed attempts
Session token generation after successful verification
Token persistence using localStorage
Simple protected “Welcome” page

OTP delivery is mocked using backend console logs to keep the project dependency-free.

**Tech Stack
Frontend**
React.js
React Router DOM
Fetch API
LocalStorage (for token persistence)

**Backend**
Node.js
Express.js
UUID (for mock session tokens)
CORS

**OTP & Authentication Logic
OTP Generation**
A random 6-digit numeric OTP is generated
OTP expiry time: 2 minutes
OTP Validation Rules
Maximum 3 incorrect attempts
After 3 failures:
  Identifier (email/phone) is blocked for 10 minutes
  OTP is invalidated
Blocked users are restricted at the login page itself

**Session Handling**
On successful OTP verification:
  A mock session token (UUID) is generated
  Token is stored in frontend localStorage
Token is validated via /auth/me API

