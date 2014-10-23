listConnect = [
  {
    "participant": {
      "name": "Henk",
      "email": "henk@haar.nl"
    },
    "ticket": {
      "name": "Haar"
      "email": "Haar@henk.nl"
    }
  },
  {
    "participant": {
      "name": "Henk",
      "email": "henk@haar.nl"
    },
    "ticket": {
      "name": "Haar"
      "email": "Haar@henk.nl"
    }
  }
]


participantsList ->
  remove empty participants -> emptiedParticipantList -> loop

  usedParticipantList = emptiedParticipantList (met)
  each (p) ->
    maak tijdelijk lijstje van usedParticipantList zonder de huidige participant
    maak een object 'connect' =
      {
        "participant": {
          "name": "Henk",
          "email": "henk@henk.nl"
        },
        // PAK RANDOM TICKET VAN usedParticipantList
          // Kijk of used!=true
            "ticket": {
              "name": "Boyd",
              "email": "boyd@boyd.nl"
            }
          // else
            reroll(); ->
      }
