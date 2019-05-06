var express = require('express');
var router = express.Router();

var Student=require('../models/studentmodel');
var Faculty=require('../models/facultymodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add Students
router.get('/students',function(req,res,next){
	res.render('addstudents');
});


router.post('/students',function(req,res,next){
	var stdid=req.body.stdid;
	var stdname=req.body.stdname;

	console.log(stdid+'-'+stdname);

  // Database Operations
  var query={stdid:stdid};

	Student.findOneAndUpdate(query, {
    $set: {
      stdid:stdid,
      stdname:stdname
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }});

	res.redirect('/studentdetails');

});

router.get('/studentdetails',function(req,res,next){
	Student.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('studentdetails',{info:results});
    	}
  	});
});

// Add Faculties
router.get('/faculties',function(req,res,next){
  res.render('addfaculties');
});

router.post('/faculties',function(req,res,next){
  var facid=req.body.facid;
  var facname=req.body.facname;
  var facemail=req.body.facemail;
  var facdesig=req.body.facdesig;
  var facdep=req.body.facdep;

  console.log(facid+'-'+facname+'-'+facemail+'-'+facdesig+'-'+facdep);

  // Database Operations
  var query={facid:facid};

  Faculty.findOneAndUpdate(query, {
    $set: {
      facid:facid,
      facname:facname,
      facemail:facemail,
      facdesig:facdesig,
      facdep:facdep,
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }});

  res.redirect('/facultydetails');

});

router.get('/facultydetails',function(req,res,next){
  Faculty.find(function(err,results){
      if (err) return console.error(err);
      else{
        res.render('facultydetails',{info:results});
      }
    });
});


module.exports = router;
