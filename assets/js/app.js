// on click of the submit button, create a new button with search value
$("#search-submit").on("click", createButton);

function createButton() {
	event.preventDefault();
	var search = $("#search-input").val().trim();
	var searchButton = $("<button>");
	searchButton.attr("data-name", search);
	searchButton.addClass("btn btn-secondary search-button");
	searchButton.text(search);
	$("#search-input").val("");
	$("#generated-button-container").append(searchButton);
}

function showMeGifs() {
	event.preventDefault();
	var searchTerm = $(this).attr("data-name");
	var giphyKey = config.giphyAPIKey;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyKey + "&limit=10";

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
function gifState() {
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
$(document).on("click", ".returned-image", gifState);




// -----------------------------
// Assignment instructions
// -----------------------------
// 1. **Hit the GIPHY API**.
//    * Fool around with the GIPHY API. [Giphy API](https://developers.giphy.com/docs/).
//    * Be sure to read about these GIPHY parameters (hint, hint):
//      * `q`
//      * `limit`
//      * `rating`
//    * Like many APIs, GIPHY requires developers to use a key to access their API data. To use the GIPHY API, you'll need a GIPHY account (don't worry, it's free!) and then obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).
//    * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.

// 2. **[Watch the demo video](https://youtu.be/BqreERTLjgQ)**

//    * You should have a high-level understanding of how this assignment works before attempting to code it.

// ### Submission on BCS

// * Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

// ### Instructions

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

// - - -

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