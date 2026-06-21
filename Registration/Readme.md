- Register API (POST)
- http://localhost:5000/api/auth/register
- {
  "name": "test user",
  "email": "test@gmail.com",
  "password": "123456"
- }

- https://www.jwt.io/

- Login API (POST)
- http://localhost:5000/api/auth/login
- {
  "email": "gobinda@gmail.com",
  "password": "123456"
- }

- Premium Route (GET)
- http://localhost:5000/api/premium
- Add Header > Authorization: <your_token>
- login again to get a new JWT token



- zip -r frontend.zip frontend
- zip -r backend.zip backend
- zip -r premium-membership-app.zip frontend backend README.md

  
