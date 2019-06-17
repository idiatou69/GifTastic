
// we create a variable for our Api key
var ApiKey = "mAlVE8BvS2yqgQyRBwObgGYf9pttobR9";


// Initial array of animals
var animals = ["dog", "cat", "lion", "giraf","gorilla", "turtle", "mosquitos"];
// then we loop our array of string
for (let i = 0; i < animals.length; i++) {
  createButton(animals[i]);
}

// create a function  called createButton
function createButton(text) {
  if(!text)return
  var button = $("<button>");
  button.text(text);
  // we put a event click for our button
  button.on("click", function (event) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + text + "&api_key=" + ApiKey + "&limit=10"

    $("#animals-view").empty();
    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var imageArray = response.data;
      console.log(imageArray)
      //loop through, and grab the key called "downsized_still", for each
      for (var i = 0; i < imageArray.length; i++) {

        //use jquery to create an img and set the src to be the downsized_still value
        var image = $("<img>").attr("src", imageArray[i].images.downsized_still.url);
        image.attr("data-still", imageArray[i].images.downsized_still.url);
        image.attr("data-animate", imageArray[i].images.downsized.url);
        image.attr("data-state", "still");
        image.addClass("gif")

        // then  we call our div then  append it
       
        $("#animals-view").append(image);
      }
    })
  });
  $("#buttons-view").append(button);
}

$(document).on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  createButton($("#animal-input").val().trim());
});

