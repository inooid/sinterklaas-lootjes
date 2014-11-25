$ ->
  successIcon = '<div class="succesIcon">
  <svg id="successIcon" fill="#3DB879" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="79px" height="79px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g>
      <g>
        <path d="M12,0C5.373,0,0,5.373,0,12c0,6.628,5.373,12,12,12c6.627,0,12-5.372,12-12C24,5.373,18.627,0,12,0z M19.754,9.561    l-8.607,8.607c-0.176,0.177-0.462,0.177-0.637,0l-1.272-1.285c-0.175-0.176-0.462-0.464-0.636-0.642l-2.96-3.112    c-0.087-0.087-0.133-0.21-0.133-0.327c0-0.115,0.046-0.227,0.133-0.314l1.297-1.169c0.088-0.09,0.205-0.134,0.321-0.134    c0.114,0.001,0.228,0.046,0.315,0.134l2.936,2.995c0.175,0.178,0.461,0.178,0.637,0l6.699-6.681c0.176-0.177,0.461-0.177,0.636,0    l1.272,1.285C19.93,9.094,19.93,9.384,19.754,9.561z"></path>
      </g>
    </g>
  </svg>
  </div>';

  errorIcon = '<div class="errorIcon">
  <svg id="errorIcon" fill="#e74c3c" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="79px" height="79px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
   height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g>
      <path d="M12,0C5.373,0,0,5.373,0,12c0,6.628,5.373,12,12,12s12-5.372,12-12C24,5.373,18.627,0,12,0z M18.364,16.242l-2.122,2.123L12,14.123l-4.242,4.242l-2.122-2.123L9.878,12L5.636,7.758l2.122-2.121L12,9.878l4.242-4.242l2.122,2.121L14.122,12L18.364,16.242z"/>
    </g>
  </svg>
  </div>';

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

  $('#email_form').submit (e) ->
    $("input[type='submit']").attr("disabled", true)
    postData = $(this).serializeArray()
    formURL = $(this).attr("action")
    console.log(postData)
    console.log(postData[0].value)
    console.log(postData[0].value isnt "")

    if(postData[0].value isnt "" and postData[1].value isnt "")
      loading = '<div class="spinnerOverlay"></div><div class="spinnerContainer">
        <div class="spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>';

      $("body").prepend(loading)

      $.ajax
        url: formURL
        type: "POST"
        data: postData
        success: (data, textStatus, jqXHR) ->
          $(".spinnerOverlay").fadeOut()
          $(".spinnerContainer").fadeOut()
          console.log(data)
          if data.response is "success"
            $('.md-content #alert').addClass('success')
            $('.md-content div #message').html(data.message)
            $('.md-content div .icon').html(successIcon)
            $('.md-trigger').click()
            $('.succesIcon').addClass("animated bounceIn")
            setTimeout (->
              $('.succesIcon').removeClass("animated bounceIn")
            ), 500
            $("input[type='submit']").attr("disabled", false)
          else
            $('.md-content #alert').addClass('error').html("Oops!")
            $('.md-content div #message').html(data.message)
            $('.md-content div .icon').html(errorIcon)
            $('.md-trigger').click()
            $('.errorIcon').addClass("animated bounceIn")
            setTimeout (->
              $('.errorIcon').removeClass("animated bounceIn")
            ), 500
            $("input[type='submit']").attr("disabled", false)

        #data: return data from server
        error: (jqXHR, textStatus, errorThrown) ->
          $(".spinnerOverlay").fadeOut()
          $(".spinnerContainer").fadeOut()
          $('.md-content #alert').addClass('error').html("Oops!")
          $('.md-content div #message').html("De lootjes konden niet worden verwerkt. Probeer het later nog eens!")
          $('.md-content div .icon').html(errorIcon)

    else
      $(".spinnerOverlay").fadeOut()
      $(".spinnerContainer").fadeOut()
      $('.md-content #alert').addClass('error').html("Oops!")
      $('.md-content div #message').html("Er zijn minimaal twee deelnemers nodig om de loting uit te voeren.")
      $('.md-content div .icon').html(errorIcon)
      $('.md-trigger').click()
      $('.errorIcon').addClass("animated bounceIn")
      setTimeout (->
        $('.errorIcon').removeClass("animated bounceIn")
      ), 500
      $("input[type='submit']").attr("disabled", false)

    #if fails
    e.preventDefault() #STOP default action