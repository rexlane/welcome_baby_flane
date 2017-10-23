var context = {
  "body": []
};

$( document ).ready(function() {
// var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZgC8FlfyqXXJUYJB4B0fWvPxOGQoMTOnoC2bXnTdhao/pubhtml'
  var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1eZa-5mbMd61s-LV2IjIqWIaLGsRWpmX9vcDkUDmJW4c/pubhtml'
  initializeTabletopObject(spreadsheet_url);
  template = Handlebars.compile($("#sections-template").html());
/*  submitForm();
*/});

function initializeTabletopObject(dataSpreadsheet){
  Tabletop.init({
    key: dataSpreadsheet,
    callback: pullDataFromTabletop,
    debug: false,
    prettyColumnNames: false
  });
}

function pullDataFromTabletop(data, tabletop) {
  words = data.responses.elements
  for (i in words) {
    context["body"].push(words[i]);
    color = words[i].word;
  }
  loadTemplates();
};

function loadTemplates() {
  var context_length = context.body.length;
  var random_index = Math.floor((Math.random() * context_length) +1);
  var random_word = context.body[random_index]
  var current_color_name = random_word.word;
  var current_color = random_word.definition;
/*  console.log(current_color)*/
   $("body").css("background-color",current_color);
   $(".wordTitle").css("color","orange")
   $("#content").html(template(random_word));
   $("#claim_form").hide();
/*    loadNext(random_index);
*//*
    $('#claim_form').submit(
        function() {
          var inputs = $('#claim_form :input');
          console.log(inputs);
  });*/
  return current_color;
};



/*returns random index and calls findColor*/
function randomIndex() {
  var context_length = context.body.length;
  var random_index = Math.floor((Math.random() * context_length) +1);
  findWord(random_index);
}

/*returns next index and calls findWord*/
function nextIndex(current_index) {
    var next_index = current_index + 1;
    findWord(next_index);
}


function findWord(index) {
  var chosen_word = context.body[index]
  var current_color_name = random_word.word;
  var current_color = random_word.definition;
}

function putWord(chosen_word) {

}



function submitForm() {
  // Variable to hold request
  var request;

  // Bind to the submit event of our form
/*  $("#claim_form").submit(function(event){
  var request;
  event.preventDefault();*/

      // Prevent default posting of form - put here to work in case of errors
/*      event.preventDefault();

      // Abort any pending request
      if (request) {
          request.abort();
      }
      // setup some local variables
/*      var $form = $(this);
*/      var $form = $("#claim_form");

      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      // Serialize the data in the form
      var serializedData = $form.serialize();
      serializedData = serializedData + "&color=" + loadTemplates();
      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      $inputs.prop("disabled", true);

      console.log(serializedData);
/*      console.log(loadTemplates());
*/      // Fire off the request to /form.php
      request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycby5HWQFUFs2iR--xuidcgCzsoj4mNt6wkdy53U5XazYVasNv70/exec",
          type: "post",
          data: serializedData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // Log a message to the console
          console.log("Hooray, it worked!");
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error(
              "The following error occurred: "+
              textStatus, errorThrown
          );
      });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
          $inputs.prop("disabled", false);
      });

/*  });
*/}



function showForm() {
  $("#claim_form").toggle();
}
