$ ->
  participantsCount = 0

  newItem = (number) ->
    number++
    participantsCount = number
    return '<h5>Deelnemer 1:</h5><input id="name' + number + '" type="text" name="name' + number + '" placeholder="Naam deelnemer" class="form-control"/><input id="email' + number + '" type="email" name="email' + number + '" placeholder="E-mail deelnemer" class="form-control"/>'

