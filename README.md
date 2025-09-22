# CoreSpectrum – Personality Test App

CoreSpectrum is a Node.js-based personality analysis application that provides users with their strengths, weaknesses, career suggestions, and areas for improvement based on a quiz.

- 10-Question Personality Quiz – Quickly assess user personality through interactive questions.
- AI-Powered Analysis – Uses Google Gemini API to provide in-depth insights.
- Color-Coded Personality Types – Results categorized into Red, Blue, Green, and Yellow personality types.
- Strengths & Weaknesses – Detailed breakdown of users’ key strengths and areas for improvement.
- Career Suggestions – Personalized job/career recommendations based on personality traits.
- Improvement Guidance – Actionable tips to work on weaknesses and enhance personal growth.
- Graphical Representation – Visual charts and graphs to display user traits and quiz responses.
- Secure User Authentication – Implements JWT and bcrypt for safe login and data protection.

## Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB (Atlas)
- AI & APIs: Google Gemini API
- Frontend: HTML, CSS, JavaScript, Chart.js, EJS (templating engine)
- Cloud & Deployment: AWS EC2, S3 (file storage), IAM (Admin & User roles)
- Authentication & Security: JWT, bcrypt, cookies

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


