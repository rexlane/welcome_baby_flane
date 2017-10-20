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
  var current_color_name = random_word.word;
  var current_color = random_word.definition;
/*  console.log(current_color)*/
   $("body").css("background-color",current_color);
   $(".wordTitle").css("color","orange")
    $("#content").html(template(random_word));
    $("#claim_form").hide();
    loadNext(random_index);
/*
    $('#claim_form').submit(
        function() {
          var inputs = $('#claim_form :input');
          console.log(inputs);
  });*/
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





function showForm() {
  $("#claim_form").toggle();
}


function submitClaimForm() {
  console.log(this)
}