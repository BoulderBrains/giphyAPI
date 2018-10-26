// Preset array that's turned into buttons on page load
var loadArray = ['Wheels', 'Spokes', 'pedals', 'clipless shoes', 'cycle cross',
'fixed gear', 'road bike', 'aero', 'gels', 'hydrate', 'chain'];

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
	var search = $("#search-input").val().trim();

	// Prevent empty buttons from being created
	if (search === "") {
		alert("You have to enter a search term to create a button");
	}
	// Prevent duplicate buttons from being created by checking if the search
	// term is already in the loadArray
	else if ($.inArray(search, loadArray) !== 0) {
		$("#search-input").val("");
		alert("You already have a button with that search term");
		// Flash the button with the .text(search)
	} else {
		loadArray.push(search);
		$("#search-input").val("");
		createButtons();
	}
}

// Takes the data-name off the button, searches the giphy API and prepends
// 10 results to the page
function showMeGifs() {
	event.preventDefault();
	var searchTerm = $(this).attr("data-name");
	var giphyKey = config.giphyAPIKey;
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



// ### Bonus Goals

// 1. Ensure your app is fully mobile responsive.

// 2. Allow users to request additional gifs to be added to the page.
//    * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

// 3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

// 4. Include a 1-click download button for each gif, this should work across device types.

// 5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 6. Allow users to add their favorite gifs to a `favorites` section.
//    * This should persist even when they select or add a new topic.
//    * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

// ### Reminder: Submission on BCS

// * Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

// // Add next steps to README.md file

// // Add To Your Portfolio