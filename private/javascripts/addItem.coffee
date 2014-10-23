$ ->
  participantsCount = 0

  newItem = (number) ->
    currNum = number++

    getClass = (currNum, type) ->
      "participants[" + currNum + "][" + type + "]";

    html = $('<div class="form-group input newItem"><h5>Deelnemer ' + (currNum + 1) + ':</h5><input id="' + getClass(currNum, "name") + '" type="text" name="' + getClass(currNum, "name") + '" placeholder="Naam deelnemer" class="form-control"/><input id="' + getClass(currNum, "email") + '" type="email" name="' + getClass(currNum, "email") + '" placeholder="E-mail deelnemer" class="form-control"/></div>')
    $(".form-group#add").last().before(html)
    # scroll down
    $('html, body').stop().animate({scrollTop:$(document).height()}, 1800);

  checkIfFilledIn = () ->
    $(".form-group.input").last().find("input[type='email']").on "input", ->
      if $(this).val().length is 1 and $(this).data("added") is undefined
        participantsCount++
        newItem(participantsCount)
        $(this).data("added", true)
        checkIfFilledIn()

  $("#add_button").click (e) ->
    e.preventDefault()
    participantsCount++
    $("input[type='email']").last().data("added", true)
    newItem(participantsCount)
    checkIfFilledIn()

  checkIfFilledIn()