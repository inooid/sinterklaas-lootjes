var express = require('express');
var router = express.Router();

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function removeEmptyObjects(array) {
  console.log("function:")
  console.log(array)

  returnArray = [];
  array.forEach(function(p, i) {
    console.log("IN FOR EACH:")
    console.log(returnArray)
    if(p.name != '' || p.email != '') {
      // array.splice(i,1)
      returnArray.push(p)
    }
  });
  return returnArray;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sinterklaas' });
});

router.route('/').post(function(req, res) {
  partsList = req.body.participants
  console.log (partsList)
  partsList = removeEmptyObjects(partsList)
  console.log (partsList)
  ticketList = partsList.slice(0) // Duplicate list

  listConnect = []

  partsList.forEach(function(participant) {

    shuffle(ticketList)
    ticket = ticketList.shift()

    if (participant.name === ticket.name) { // if
      ticketList.push(ticket)
      ticket = ticketList.shift()
    }

    listConnect.push({"participants": participant, "ticket": ticket})
  });

  res.send({
    "response": "success",
    "message": "Successful called the server"
  });

});

module.exports = router;
