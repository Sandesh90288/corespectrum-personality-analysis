const { getwelcomepage, getresult, getstartnewpage, getresultpage, getquestions, createacc,storeresult,getanalysis } = require('../controller/users');
const express = require('express');
const router = express.Router();

router.get('/', getwelcomepage);
router.get('/welcomepage/startnew', getstartnewpage); 
router.post('/welcomepage/getresult', getresult);
router.get('/welcomepage/getresult', getresultpage);
router.post('/welcomepage/startnew/usercreated', createacc);
router.get('/welcomepage/startnew/usercreated/questions', getquestions);
router.post('/welcomepage/startnew/usercreated/questions', storeresult);
router.post('/analyze',getanalysis);
router.get('/result', getresultpage);

module.exports = router;  