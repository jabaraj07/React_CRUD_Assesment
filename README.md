## Dynamic User Management CRUD App

This project is a full-stack CRUD application with a dynamic form system, where frontend form fields are generated from a schema and backend accepts flexible user data with validation for unique fields.

---
## Tech Stack

### Frontend
- React
- Material UI
- Axios
- Custom Hooks

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render

---
  
## 1️⃣ setup Instructions

### Clone the repository
```bash
git clone <your-github-repo-url>
cd Dynamic_Form_Project
```


## 2️⃣ Backend Setup
```bash
cd backend
npm install
```
---
## Create a .env file:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-vercel-frontend-url
```
---
## Start backend:
```bash
npm start
```
Backend runs at:
```bash
http://localhost:5000
```

## 3️⃣ Frontend Setup
```bash
cd Front-End/crud_app
npm install
```

## Create .env file:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## Start frontend:
```bash
npm start
```
Frontend runs at: 
```bash
http://localhost:3000
```
---
## How to Add New Fields to the Form

The form is schema-driven, meaning input fields are generated dynamically from a configuration file.

📂 Schema Location
```bash
src/schema/formSchema.js
```

## Example: Adding a new field
```bash
{
  name: "address",
  type: "text",
  label: "Address",
  placeholder: "Enter address",
  required: false
}
```

What happens automatically?

-New input appears in the UI
-Data is added to formData
-Sent to backend on submit
-Stored in MongoDB

No UI or backend code changes required.

---

## Backend Design Decisions

Core fields like email and phoneNumber are defined in the schema

Additional fields are allowed using:

```bash
strict: false
```

-Email and phone number are optional
-If provided, uniqueness is enforced

---

## Assumptions & Design Decisions

- Frontend controls which fields are visible
- Backend accepts flexible data structure
- Duplicate email or phone number returns 409 Conflict
- Custom hooks are used to keep components clean
- API logic is separated from UI logic

---

## Error Handling

- Backend returns proper HTTP status codes
- Frontend shows error messages using snackbar alerts
- Duplicate email/phone handled gracefully

---

## Mock API Setup

- This project does not use a mock API.  
- A real backend built with Node.js, Express, and MongoDB is used for all API interactions.

