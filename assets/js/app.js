// Preset array that's turned into buttons on page load
var loadArray = ['record', 'tape', 'cd', '8-track', 'walkman',
'napster', 'vhs', 'blue-ray', 'spotify', 'winamp'];

// createButtons loops through the loadArray to create a button with classes and
// attributes for every array item and appending it to the page
function createButtons() {
	$("#generated-button-container").empty();

	for (i = 0; i < loadArray.length; i++) {
		var searchValue = loadArray[i];
		var searchButton = $("<button>");
		searchButton.attr("data-name", searchValue);
		searchButton.addClass("btn btn-secondary search-button");
		searchButton.text(searchValue);
		$("#generated-button-container").append(searchButton);
	}
}

// Triggering the createButtons function when page load happens
createButtons();

// on click of the submit button, create a new button with search value
$("#search-submit").on("click", AddButton);

function AddButton() {
	event.preventDefault();
	var search = $("#search-input").val().trim().toLowerCase();

	// Prevent empty buttons from being created
	if (search === "") {
		alert("You have to enter a search term to create a button");
	}
	// Prevent duplicate buttons from being created by checking if the search
	// term is already in the loadArray
	else if (loadArray.includes(search)) {
		$("#search-input").val("");
		// animate existing button
		shakeExistingButton(search);
	} else {
		loadArray.push(search);
		$("#search-input").val("");
		createButtons();
	}
}

function shakeExistingButton(search) {
	// setting animate values on the duplicate button
	$("[data-name=" + search + "]").css("animation", "shake 0.5s");
	$("[data-name=" + search + "]").css("animation-iteration-count", "1");
	// waiting a 1/2 and then removing one of the properties
	// This in incase the user trys to enter the same text again, animation is 
	// only triggered a second time if animation css is removed so it can be reset next time
	setTimeout(function(){ 
		$("[data-name=" + search + "]").css("animation", "");
	}, 500);
}

// Takes the data-name off the button, searches the giphy API and prepends
// 10 results to the page
function showMeGifs() {
	event.preventDefault();
	var searchTerm = $(this).attr("data-name");
	var giphyKey = "lG9ckorGrueBoeXQXp16qJ66xivTGyd1";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm +
	 "&api_key=" + giphyKey + "&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			// pulling out the items I want to use from the API
			var rating = response.data[i].rating;
			var animateURL = response.data[i].images.downsized.url;
			var stillURL = response.data[i].images.original_still.url;

			// forming an element for the return item
			var wrapper = $("<div class='col-lg-4 col-sm-6 wrapper'>");
			var ratingElement = $("<p>").text("Rating: " + rating);
			var image = $("<img class='returned-image'>").attr("src", stillURL);
			image.attr("data-still", stillURL);
			image.attr("data-animate", animateURL);
			image.attr("data-state", "still");

			// adding the ratingElement paragraph and the image img to the wrapper
			wrapper.append(image, ratingElement);
			// rendering the wrapper to the #results-container
			$("#results-container").prepend(wrapper);
		}
	});
};

// This is triggering the start/stop of a gif by swapping out the src="" URLs
function gifStartStop() {
	var state = $(this).attr("data-state");
	var dataStill = $(this).attr("data-still");
	var dataAnimate = $(this).attr("data-animate");

	if (state === "still") {
		$(this).attr("src", dataAnimate);
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", dataStill);
		$(this).attr("data-state", "still");
	}
}
// Listening to the document for newly generated button, 
// on click run the showMeGifs function
$(document).on("click", ".search-button", showMeGifs);
// listeing to clicks on the returned images to trigger gifState and start/stop the gif
$(document).on("click", ".returned-image", gifStartStop);
