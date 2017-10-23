var context = {
  "body": []
};

$( document ).ready(function() {
  var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1a2r7zh1kVtZ0Uywzh4MqrJGuXFdc5Bc6jbdv3U8s17c/pubhtml'

  initializeTabletopObject(spreadsheet_url);
  template = Handlebars.compile($("#sections-template").html());
});

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
randomIndex();
};


/*returns random index and calls loadTemplates*/
function randomIndex() {
  var context_length = context.body.length;
  var random_index = Math.floor((Math.random() * context_length) +1);
  loadTemplates(random_index);
}

/*returns next index and calls loadTemplates*/
function nextIndex() {
    var context_length = context.body.length;
    if (context_length > cur_index)
      var next_index = cur_index + 1;
    else 
      var next_index = 0;
    loadTemplates(next_index);
}

function loadTemplates(index) {

  /*get entry for selected color*/
  window.cur_index = index;
  var cur_color = context.body[index];

  /*send cur_color values to html template*/
   $("#content").html(template(cur_color));
   $("#claim_form").hide();

  /*create variables for cur_color attributes*/
  var current_color_name = cur_color.word;
  var current_color_code = cur_color.definition;
  var current_text_color = cur_color.textcolor;

  /*call formatPage() with cur_color variables and pre-fill form with color name*/
  formatPage(current_color_code, current_text_color);
  prepareForm(current_color_name);
  submitForm();

};

function formatPage(current_color_code, current_text_color) {
   $("body").css("background-color",current_color_code);
   $(".change_color").css("color",current_text_color);
   $("#claim_link").css("color",current_text_color);
}

function prepareForm(current_color_name) {
    var text = '<input type="text" name="color" value="' ;
    text = text + current_color_name + '">';
    $("#color_input").html(text);
  }

function submitForm() {
  // Variable to hold request
  var request;

  // Bind to the submit event of our form
 $("#claim_form").submit(function(event){

      // Prevent default posting of form - put here to work in case of errors
      event.preventDefault();

      // Abort any pending request
      if (request) {
          request.abort();
       }
      // setup some local variables
      var $form = $(this);

      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      // Serialize the data in the form
      var serializedData = $form.serialize();

      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      $inputs.prop("disabled", true);

      console.log(serializedData);
      // Fire off the request to /form.php
      request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycbwhdOAa-AF9lRm3lNUaWcA0PI8bUK94NFvvX1ERInqPlIQgBoRH/exec",
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

});
}

function showForm() {
  $("#claim_form").toggle();
}
