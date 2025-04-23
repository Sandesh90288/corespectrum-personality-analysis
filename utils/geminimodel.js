require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

// process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getStrengthsAndWeaknesses(result) {
  const prompt = `Based on the following personality traits, which include both the questions and the chosen answers:  

  ${result.map(item => `- ${item.question} → ${item.recommendation}`).join("\n")}  
  
  Please provide the response in the **exact JSON format** below, ensuring that the strengths and weaknesses are **simple** and **easy to understand**:
  
  {
    "strengths": [ 
      "Strength 1",
      "Strength 2",
      "Strength 3", 
      "Strength 4",
      "Strength 5"
    ],
    "weaknesses": [
      {
        "weakness": "Weakness 1",
        "improvement": "How to improve Weakness 1"
      },
      {
        "weakness": "Weakness 2",
        "improvement": "How to improve Weakness 2"
      },
      {
        "weakness": "Weakness 3",
        "improvement": "How to improve Weakness 3"
      },
      {
        "weakness": "Weakness 4",
        "improvement": "How to improve Weakness 4"
      },
      {
        "weakness": "Weakness 5",
        "improvement": "How to improve Weakness 5"
      }
    ],
    "careerSuggestions": [
      "Career 1",
      "Career 2",
      "Career 3",
      "Career 4",
      "Career 5"
    ]
  }
  
  - **Strengths** should be **simple**, like “Good at solving problems” or “Strong leader.”
  - **Weaknesses** should also be **simple**, like “Can be impatient” or “Avoids confrontation.”
  - For each weakness, provide a **clear and easy improvement suggestion** like “Practice patience” or “Work on conflict resolution.”
  - **Career suggestions** should be realistic and based on the personality traits. 
  - Include a mix of **technical and non-technical** career options.
  - Keep the response **concise** and **to the point**—**no extra explanations** or additional text outside the JSON format.
  
  Only return the response in the **exact JSON format** shown above.`;
  
    try {
        // Directly call generateContent on the ai object
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
           contents: prompt
        });

        let text = response.text; // Extract response text
        text = text.replace(/```json|```/g, '').trim();
        console.log(text);
        return JSON.parse(text); // safely return JSON; // Return the text for further use
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error for proper handling
    }
}
async function recommendations(answers) {
    let questions = [
        {     
          
          "question": "How do you approach decision-making?",
          "A": "Quickly and decisively.",
          "B": "Only after analyzing all possible outcomes.",
          "C": "I prefer someone else to decide.",
          "D": "I follow my gut feeling."
        },
        {
          
          "question": "What best describes your work style?",
          "A": "Fast and efficient.",
          "B": "Accurate and methodical.",
          "C": "Slow but steady.",
          "D": "Creative and flexible."
        },
        {
          
          "question": "How do you handle stress?",
          "A": "Push through and work harder.",
          "B": "Find a logical way to solve it.",
          "C": "Try to relax and stay calm.",
          "D": "Distract myself with fun activities."
        },
        {
          
          "question": "How do you usually spend your free time?",
          "A": "Working on my personal goals.",
          "B": "Reading or learning something new.",
          "C": "Spending time with close friends or family.",
          "D": "Exploring new experiences or hobbies."
        },
        {
          
          "question": "What motivates you the most?",
          "A": "Achieving success and winning.",
          "B": "Understanding complex concepts.",
          "C": "Stability and harmony.",
          "D": "New experiences and fun."
        },
        {
         
          "question": "How do you react to sudden changes?",
          "A": "Adapt quickly and take charge.",
          "B": "Plan a new strategy carefully.",
          "C": "I don’t like changes but will adjust slowly.",
          "D": "Excited! I love surprises."
        },     
        {
         
          "question": "How do you handle criticism?",
          "A": "Defend my point aggressively.",
          "B": "Analyze if the criticism is valid.",
          "C": "Take it personally but remain quiet.",
          "D": "Laugh it off."
        },
        {
        
          "question": "How do you usually communicate?",
          "A": "Direct and to the point.",
          "B": "Detailed and structured.",
          "C": "Gentle and understanding.",
          "D": "Energetic and expressive."
        },
        {
          "question": "What role do you usually take in a group project?",
          "A": "The leader who makes decisions.",
          "B": "The researcher who gathers information.",
          "C": "The supporter who ensures everyone is happy.",
          "D": "The motivator who keeps everyone engaged."
        },
        {

          "question": "How do you typically handle conflicts?",
          "A": "Confront it head-on and find a solution.",
          "B": "Analyze the situation and think logically.",
          "C": "Avoid confrontation and try to keep the peace.",
          "D": "Make a joke or try to lighten the mood."
        }
      ]
;      

    // Validate input length
    if (answers.length !== questions.length) {
        throw new Error("The number of answers provided does not match the number of questions.");
    }

    // Validate answers and generate recommendations
    const result = answers.map((answer, index) => {
        const questionObj = questions[index];

        if (!["A", "B", "C", "D"].includes(answer)) {
            throw new Error(`Invalid answer '${answer}' for question ${index + 1}`);
        }

        return {
            question: questionObj.question,
            chosenOption: answer,
            recommendation: questionObj[answer]
        };
    });

    // Call Gemini Flash API to analyze strengths & weaknesses
    try {
        const analysis = await getStrengthsAndWeaknesses(result);
        return analysis;
    } catch (error) {
        console.error("Error fetching strengths and weaknesses:", error);
        throw error;
    }
}
module.exports = {
    recommendations
};  