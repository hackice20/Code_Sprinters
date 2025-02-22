# UnBoundEd - Unbounded Education

## Brief Project Description

UnBoundEd (Unbounded Education) – Learning without limits.
In today’s world, access to quality education remains a challenge for students in areas with
low-resource devices and limited network connectivity. Our solution is a lightweight, AI-
powered online education platform designed to function seamlessly in such environments.

Key Features:

- ✅ Offline Support – Students can download lessons (text & video) and sync progress when
online.
- ✅ AI-Powered Assistance – Smart AI tutors provide personalized learning recommendations
and instant Q&A support.
- ✅ Lightweight UI & Optimized Performance – Minimalist design ensures smooth operation on
low-end devices and slow networks.
- ✅ Micro-Certifications & Leaderboard – Learners earn digital certifications and compete in a
gamified ranking system.
- ✅ Learn-to-Earn Model – Students receive discounts or rewards for course completions,
making education more affordable.
- ✅ Community Support – Peer-to-peer learning, mentor matching, and discussion forums
enhance collaboration.

Our platform ensures inclusive and scalable learning, empowering students with minimal data
consumption and maximum engagement. 🚀

---
## Key Features to Implement:

1. **User Authentication and Authorization:**
   - User registration and login.
   - Role-based access control (e.g., student, mentor).

2. **Offline Support:**
   - Ability for students to download lessons (text and video).
   - Data synchronization when the device is online.

3. **AI-Powered Assistance:**
   - Integration of AI tutors for personalized learning recommendations.
   - Instant Q&A support using AI.

4. **Lightweight UI & Optimized Performance:**
   - Minimalist design for smooth operation on low-end devices.
   - Usage of TailwindCSS for a lightweight UI.
   - Performance optimization for slow networks.

5. **Micro-Certifications & Leaderboard:**
   - Digital certifications upon course completion.
   - Gamified ranking system to encourage competition.

6. **Learn-to-Earn Model:**
   - Reward system for course completions (e.g., discounts, points).

7. **Community Support:**
   - Peer-to-peer learning platforms.
   - Mentor matching systems.
   - Discussion forums for collaboration.

8. **Courses & Lessons:**
   - Video lectures, PDFs, downloadable notes, quizzes.
     
---



## Backend Stack & Libraries

| Feature                    | Tech Stack / Library | Status |
|----------------------------|----------------------|--------|
| **Authentication**         | Passport.js, JWT, bcrypt |done|
| **Database**               | MongoDB, Mongoose |done|
| **API Framework**          | Express.js |done|
| **AI Chatbot**             | Gemini AI API |done|
| **Leaderboard System**     | Custom Logic + MongoDB Aggregation |done|
| **Video Storage**          | Youtube |done|
| **Certificate Generation** | pdfkit, node-html-pdf |done|
| **Leaderboard System**     | Custom Logic + MongoDB Aggregation |pending...|
| **Video Storage**          | Youtube |done|done|
| **Certificate Generation** | pdfkit, node-html-pdf |done|
| **Offline Syncing**        | PouchDB, Workbox (Service Workers) |pending...|
| **Community Features**     | Socket.io, Discourse Integration |done|
| **Gamification & Rewards** | Custom Rewards Logic |pending...|

---

## Backend Project Structure

```
/UnBoundEd
   ├── /frontend
   ├── /backend
      ├── package.json
      ├── package-lock.json
      ├── result.json //stores results of Quizzes for leaderboard
      ├── .gitignore
      ├── server.js
      ├──/ config
      │   ├── config.js         // config constants (JWT secret, etc.)
      │   └── db.js           // MongoDB connection
      |   ├── cloudinaryConfig.js
      ├──/ models
      │   ├── User.js           // User model (for auth)
      │   ├── Admin.js         // Admin model (for auth)
      |   ├── Quiz.js          //Quiz model(array of questions, options array ,time limit )
      │   └── Course.js         // Course model
      ├──/ controllers
      │   ├── authController.js // Auth logic for users
      │   ├── adminController.js // Auth logic for admins
      |   ├── quizController.js // CRUD 
      |   ├── leaderboardController.js
      │   └── courseController.js // CRUD for courses and certificate API
      ├──/ middleware
      │   └── authMiddleware.js // JWT validation and role-checking
      |   ├── uploadMiddleware.js
      ├──/ routes
      │   ├── authRoutes.js     // Public user auth endpoints
      │   ├── adminRoutes.js    // Public admin auth endpoints
      │   ├── courseRoutes.js   // CRUD endpoints for courses (admin only for create/update/delete)
      │   └── certificateRoutes.js // GET endpoint for certificate data
      |   ├── leaderboardRoutes.js //GET Leaderboard
      |   ├── quizRoutes.js //create Quiz,Update,Delete(isAdmin) || attemptQuiz (User)
      |   ├── chatbotRoutes.js
      ├──/ utils
          └── resultHelper.js
   ├──Readme.md

```
---

## Backend Flow (Data Flow Explanation)

1. **User Signup/Login**
   - Users register & log in using JWT-based authentication.
   - Role-based access (Student/Mentor/Admin) is managed.

2. **Courses & Content**
   - Admin uploads video courses, notes (Stored on Youtube).
   - Students access video courses & downloadable PDFs.
   - Offline mode enables downloads for later viewing.

3. **AI-Powered Assistance**
   - Students ask questions → Sent to Claude AI API.
   - AI returns answers + personalized recommendations.

4. **Gamification & Leaderboard**
   - Students earn points by completing quizzes/courses.
   - Leaderboard updates ranks based on learning activity.

5. **Certificates & Rewards**
   - On course completion, a PDF certificate is generated.
   - Students receive rewards (discounts, badges, points).

6. **Community & Mentorship**
   - Peer discussions in forums (Discourse).
   - Mentor-student matching for guidance.

7. **Offline Support**
   - Course materials are downloadable.
   - Progress syncs once online.

---

## API routes

Here's an **API guide** table based on the routes you've provided. This will allow your team to fetch these APIs on the frontend easily.

**BASE URL - localhost:3000**

| **HTTP Method** | **API Endpoint**                    | **Description**                                                            | **Authentication Required** | **Role Required** | **Parameters**                           | **Response**              |
|-----------------|-------------------------------------|----------------------------------------------------------------------------|-----------------------------|-------------------|------------------------------------------|---------------------------|
| **POST**        | `/api/auth/register`               | Register a new admin                                                        | No                          | Admin             | `username`, `password`, `email`          | 201 Created               |
| **POST**        | `/api/auth/login`                  | Login as an admin                                                            | No                          | None              | `username`, `password`                   | 200 OK, JWT Token         |
| **GET**         | `/api/admin/dashboard`             | Get the admin dashboard details                                              | Yes                         | Admin             | None                                     | 200 OK                    |
| **POST**        | `/api/users/register`              | Register a new user                                                          | No                          | User              | `username`, `password`, `email`          | 201 Created               |
| **POST**        | `/api/users/login`                 | Login as a user                                                              | No                          | None              | `username`, `password`                   | 200 OK, JWT Token         |
| **GET**         | `/api/users/dashboard`             | Get the user dashboard details                                                | Yes                         | User              | None                                     | 200 OK                    |
| **GET**         | `/api/certificate`                 | Generate certificate for a course                                            | Yes                         | User/Admin        | `username`, `courseName`                 | 200 OK, PDF Certificate   |
| **GET**         | `/api/courses`                     | Get a list of all available courses                                          | No                          | None              | None                                     | 200 OK                    |
| **GET**         | `/api/courses/:id`                 | Get course details by course ID                                              | No                          | None              | `id`                                     | 200 OK                    |
| **POST**        | `/api/courses`                     | Create a new course (Admin only)                                             | Yes                         | Admin             | `courseName`, `youtubeLinks`, `quizLink`, `discordLink` | 201 Created               |
| **PUT**         | `/api/courses/:id`                 | Update course details (Admin only)                                           | Yes                         | Admin             | `id`, `courseName`, `youtubeLinks`, `quizLink`, `discordLink` | 200 OK                    |
| **DELETE**      | `/api/courses/:id`                 | Delete a course by course ID (Admin only)                                     | Yes                         | Admin             | `id`                                     | 200 OK                    |

---

### **Explanation:**
1. **Authentication & Authorization**:
   - For **public routes** (e.g., `GET /api/courses` and `GET /api/courses/:id`), no authentication is needed.
   - **Admin routes** (e.g., `POST /api/courses` and `PUT /api/courses/:id`) require **authentication** (JWT token) and **admin privileges** (`isAdmin` middleware).

2. **Parameters**:
   - `username`, `password`, `email` for login and registration.
   - `courseName`, `youtubeLinks`, `quizLink`, and `discordLink` for course creation and updates.
   - `courseName` and `username` for generating certificates.

3. **Response**:
   - Most API calls return a `200 OK` status along with the required data (e.g., course list, certificate).
   - The `POST` requests for creating a course or user will return a `201 Created` status.
   - The `GET /api/certificate` returns a **PDF certificate** upon success.

---
## API Testing Table Summary

| **HTTP Method** | **Endpoint**                         | **Role**         | **Description**                               | **Headers**                                            | **Sample Body**                                                     |
|-----------------|--------------------------------------|------------------|-----------------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------|
| POST            | `/api/auth/admin/login`              | Admin            | Admin login to get JWT token                  | `Content-Type: application/json`                       | `{ "email": "admin@example.com", "password": "adminpassword" }`       |
| POST            | `/api/quiz`                          | Admin            | Create a new quiz                             | `Authorization: Bearer {{adminToken}}` <br> `Content-Type: application/json` | JSON with quiz details (see Create Quiz sample above)               |
| GET             | `/api/quiz/{{quizId}}`               | Public           | Get details of a quiz                         | None (or with token)                                   | –                                                                   |
| POST            | `/api/auth/users/login`              | User             | User login to get JWT token                   | `Content-Type: application/json`                       | `{ "email": "user@example.com", "password": "userpass123" }`          |
| POST            | `/api/quiz/{{quizId}}/attempt`       | User             | Submit quiz attempt                           | `Authorization: Bearer {{userToken}}` <br> `Content-Type: application/json` | `{ "answers": [ ...10 answers... ], "timeTaken": 290 }`               |

---

## Get Leader Board

localhost:3000/api/leaderboard/<courseId>

---

## API KEY

GEMINI_API_KEY = AIzaSyC1ZLy_olVsr-ItHdv5nSdM7K4ewbO-zYQ

---
