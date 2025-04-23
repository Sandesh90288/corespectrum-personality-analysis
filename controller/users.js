const user = require("../model/user");
const question = require("../model/questions");
const { recommendations } = require("../utils/geminimodel");
async function getwelcomepage(req, res) {
    return res.render('welcomepage', { title: 'Welcome to the site' });
}

async function getresult(req, res) {
    try {
        let uniqueid = req.body.uniqueid;
        let userexist = await user.findOne({ uniqueid });
        if (userexist) {
            return res.status(200).json({ url: "/perso_test/welcomepage/getresult" });
        } else {
            return res.status(404).json({ error: "ID does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Error fetching the result" });
    }
}

function getstartnewpage(req, res) {
    return res.render('startnew', { title: 'Account Created' });
}

async function getresultpage(req, res) {
    return res.render('result', { title: 'Result' });
}

async function createacc(req, res) {
    try {
    let username = req.body.username;
    let id = req.body.id;
     // ✅ Store the user ID in the session
     req.session.questionIndex=0;
     req.session.selectedAnswers = [];  // Reset selected answers
     req.session.userId = id;
        await user.create({username: username,uniqueid: id });
        return res.status(200).json({ url: '/perso_test/welcomepage/startnew/usercreated/questions' });
        } 
        catch (error) {
        return res.status(500).json({ error: "Error in creating the account" });
    }
}

async function getquestions(req, res) {
    try {
        // Initialize session index if not set
        if (req.session.questionIndex === undefined) {
            req.session.questionIndex = 0; 
        }

        console.log("Fetching question at index:", req.session.questionIndex);

        // Fetch question at current index
        const currentQuestionArray = await question.find().skip(req.session.questionIndex).limit(1);
        const currentQuestion = currentQuestionArray[0]; // Extract first object from array
        
        // Get total number of questions
        const totalQuestions = await question.countDocuments({});

        // Check if a question was found
        if (!currentQuestion) {
            return res.render("questions", { message: "No more questions available" });
        }

        // Render the question page
        res.render("questions", { 
            question: currentQuestion,
            questionIndex: req.session.questionIndex + 1, // Display starts from 1, but keep session value intact
            totalquestions: totalQuestions,
        });

    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ message: "Error fetching question", error });
    }
}

async function storeresult(req, res) {
    try {
        // Ensure user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Initialize session variables if not present
        req.session.selectedAnswers = req.session.selectedAnswers || [];
        req.session.questionIndex = req.session.questionIndex ?? 0;

        // Store selected answer if provided
        if (req.body.answer) {
            req.session.selectedAnswers.push({
                questionIndex: req.session.questionIndex,
                answer: req.body.answer
            });
        }

        // Move to next question
        req.session.questionIndex += 1;
        const nextq = req.session.questionIndex;

        // Fetch next question
        const next = await question.find().skip(nextq).limit(1);

        if (!next.length) {
            // No more questions, save results to DB
            const updatedUser = await user.findOneAndUpdate(
                { uniqueid: req.session.userId },  // Find user by unique ID
                { options: req.session.selectedAnswers },  // Store answers in 'options' field
                { new: true, runValidators: true } // Ensure validation
            );

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.redirect('/perso_test/result');
        } 
        
        // Show next question
        return getquestions(req, res);
        
    } catch (error) {
        console.error("Error storing result:", error);
        return res.status(500).json({ error: "Error storing result" });
    }
}

// Render the result page
async function getresultpage(req, res) {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Extract data for debugging
        console.log("Selected Answers:", req.session.selectedAnswers); 

        return res.render('resultp', {
            selectedAnswers: req.session.selectedAnswers || [], // Ensure it's always an array
            uniqueid: req.session.userId
        });
    } catch (error) {
        console.error("Error rendering result page:", error);
        return res.status(500).json({ error: "Error loading result page" });
    }
}

async function getanalysis  (req, res) {
  try {
    const { answers } = req.body; 

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing answers array.' });
    }

    // Call the Gemini logic with the user's answers
    const analysis = await recommendations(answers); // Already returns parsed JSON

    return res.status(200).json({
      success: true,
      data: analysis // { strengths: [...], weaknesses: [...], careerSuggestions: [...] }
    });

  } catch (error) {
    console.error("Analysis failed:", error);
    return res.status(500).json({ success: false, message: 'Server error during analysis', error: error.message });
  }
}






module.exports = {
    getwelcomepage,
    getresult,    
    getstartnewpage,
    getresultpage,
    getquestions,
    createacc,
    storeresult,
    getanalysis,
};