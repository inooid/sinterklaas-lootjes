var express = require('express');
    router = express.Router();
    nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'XXX', // Enter your Gmail account here (example@gmail.com)
        pass: 'XXX'                      // Enter your Gmail account password here
      }
    });

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
  console.log("function:");
  console.log(array);

  returnArray = [];
  array.forEach(function(p, i) {
    console.log("IN FOR EACH:");
    console.log(returnArray);
    if(p.name !== '' || p.email !== '') {
      // array.splice(i,1)
      returnArray.push(p);
    }
  });
  return returnArray;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sinterklaas' });
});

router.route('/').post(function(req, res) {
  partsList = req.body.participants;
  console.log (partsList);
  partsList = removeEmptyObjects(partsList);
  console.log (partsList);
  ticketList = partsList.slice(0); // Duplicate list

  listConnect = [];

  partsList.forEach(function(participant) {

    shuffle(ticketList);
    ticket = ticketList.shift();

    if (participant.name === ticket.name) { // if
      ticketList.push(ticket);
      ticket = ticketList.shift();
    }

    transporter.sendMail({
      from: {
        name:     'JouwSinterklaasLootjes',
        address:  'jouwsinterklaaslootjes@gmail.com'
      },
      to: participant.email,
      subject: 'Hey! Je hebt een Sinterklaas lootje gekregen!',
      text: 'Beste ' + participant.name + ', Je bent uitgenodigd voor de Sinterklaas loting. Jouw lot heeft de naam van: ' + ticket.name + '. Een fijn Sinterklaasfeest toegewenst. Groetjes, JouwSinterklaasLootjes',
      html: '<div style="width: 100%; height: 100%; bgcolor="#cccccc"><h1>Je bent uitgenodigd voor de Sinterklaas loting!</h1><br /><p>Beste ' + participant.name + ',<br /><br />Er is voor jouw een lot gegrabbeld en daar is de volgende naam uitgekomen:</p><h2>' + ticket.name + '</h2><p>Een fijn Sinterklaasfeest toegewenst!</p><br /><p>Groetjes,<br />JouwSinterklaasLootjes</p></div>',
    }, function(err, info) {
      console.log(err);
      console.log(info);
      if (err) {
        if (err.responseCode == 535) {
          res.send({
            "response": "error",
            "message": "No username and password configured for nodemailer."
          });
        }
        else {
          res.send({
            "response": "error",
            "message": "Helaas kon de mail niet verstuurd worden. Probeer het later nogmaals."
          });
        }
      } else {
        res.send({
          "response": "success",
          "message": "De lootjes zijn verdeeld en verstuurd naar de deelnemers. Veel plezier!"
        });
      }
    });
  });
});

module.exports = router;
