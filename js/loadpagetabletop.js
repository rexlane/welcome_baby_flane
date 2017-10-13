var context = {
  "body": []
};

$( document ).ready(function() {
// var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZgC8FlfyqXXJUYJB4B0fWvPxOGQoMTOnoC2bXnTdhao/pubhtml'
  var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1eZa-5mbMd61s-LV2IjIqWIaLGsRWpmX9vcDkUDmJW4c/pubhtml'
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
  loadTemplates();
};

function loadTemplates() {
  var context_length = context.body.length;
  var random_index = Math.floor((Math.random() * context_length) +1);
  var random_word = context.body[random_index]
  var current_color = random_word.definition;
  console.log(current_color)
   $("#content").css("color",current_color);
    $("#content").html(template(random_word));
  //  $(".wordTitle").css("color":)
};

function showExample() {
  $("#example-chunk").toggle();
}

function showDef() {
  $("#def-chunk").toggle();
};