# CoreSpectrum – Personality Test App

CoreSpectrum is a Node.js-based personality analysis application that provides users with their strengths, weaknesses, career suggestions, and areas for improvement based on a quiz.

## Features
- Quiz with 10 personality-based questions
- Analysis using Google Gemini API
- Results based on color-coded personality types (Red, Blue, Green, Yellow)
- Graphical representation of user traits
- User authentication using JWT and bcrypt

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Google Gemini API
- HTML, CSS, JavaScript
- EJS (templating engine)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Sandesh90288/personality_test.git
   cd personality_test
2. npm install
3. Create a .env file:
    MONGO_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    PORT=3000
4.Start the development server:
  npm start

---

### check a `start` script in `package.json`

Open your `package.json` and under `"scripts"`,check:
"start":"nodemon main.js"
if not the modify "test":"node main.js" to "start":"nodemon main.js


