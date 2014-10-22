$(function() {
  var checkIfFilledIn, newItem, participantsCount;
  participantsCount = 0;
  newItem = function(number) {
    var currNum, getClass, html;
    currNum = number++;
    getClass = function(currNum, type) {
      return "participants[" + currNum + "][" + type + "]";
    };
    html = $('<div class="form-group input newItem"><h5>Deelnemer ' + (currNum + 1) + ':</h5><input id="' + getClass(currNum, "name") + '" type="text" name="' + getClass(currNum, "name") + '" placeholder="Naam deelnemer" class="form-control"/><input id="' + getClass(currNum, "email") + '" type="email" name="' + getClass(currNum, "email") + '" placeholder="E-mail deelnemer" class="form-control"/></div>');
    $(".form-group#add").last().before(html);
    return $('html, body').stop().animate({
      scrollTop: $(document).height()
    }, 1800);
  };
  checkIfFilledIn = function() {
    return $(".form-group.input").last().find("input[type='email']").on("input", function() {
      if ($(this).val().length === 1 && $(this).data("added") === void 0) {
        participantsCount++;
        newItem(participantsCount);
        $(this).data("added", true);
        return checkIfFilledIn();
      }
    });
  };
  $("#add_button").click(function(e) {
    e.preventDefault();
    participantsCount++;
    $("input[type='email']").last().data("added", true);
    newItem(participantsCount);
    return checkIfFilledIn();
  });
  return checkIfFilledIn();
});
