/*
This file provides the main javascript code to make the page react to user input
and fetch required data as requested by the user and inject it into the HTML.
*/
"use strict";
(function() {
	window.onload = function() {
		var newsfeed = document.getElementById("newsfeed");
		var search = document.getElementById("search");
		search.onclick = displaySearch;
		fetchFeed();
		fetchNotifications();
	};
	// this function populates the select list of baby names at page load
	function fetchFeed() {
		var ajax = new XMLHttpRequest();
		ajax.onload = displayFeed;
		ajax.open("GET", "newsfeedget.php", true);
		ajax.send(); // fetch entire newsfeed
	}
	// handles the ajax reqeust when it finishes and injects the names into the select area
	// disables the loading gif
	function displayFeed() {
		if (this.status == 200) {
			var response = this.responseText.split("\n");
			var newsfeed = document.getElementById("newsfeed");
			for (var i = 0; i < response.length; i++) {
				var p = document.createElement("p");
				var item = response[i];
				p.innerHTML = item;
				p.value = item;
				allnames.appendChild(p);
			}
			newsfeed.disabled = false;	
		} else {
			nuke(this);
		}
		var loadingFeed = document.getElementById("loadingfeed");
		loadingNames.classList.add("invisible");
	}
	// this function handles the click of the search button sending
	// out some ajax requests
	function displaySearch() {
		var search = document.getElementById("search").value;
		if (search) {
			setLoading(true);
			sendSearch(query);
			var resultsarea = document.getElementById("resultsarea");
			resultsarea.classList.remove("invisible");
			resultsarea.removeAttribute("style"); // only necessary first time
		}
	}
	// accepts a boolean action of whether to set loading images true or hidden
	// changes the search loading images but not the name loading gif
	function setLoading(action) {
		var resultIds = ["newsfeed", "notifications", "errors"];
		for (var i = 0; i < resultIds.length; i++) {
			document.getElementById(resultIds[i]).innerHTML = "";
		}
		var loadingIds = ["loadingfeed", "loadingnotifications"];
		for (var i = 0; i < loadingIds.length; i++) {
			var classes = document.getElementById(loadingIds[i]).classList;
			if (action) {
				classes.remove("invisible");
			} else {
				classes.add("invisible");
			}
		}
	}
	// accepts a string query and sends an ajax request to find the meaning of the query
	function sendSearch(query) {
		var ajax = new XMLHttpRequest();
		ajax.onload = displaySearchResult;
		ajax.open("GET", 
					"search.php?query=" +
					 query, true);
		ajax.send(); // fetch meaning of baby name
	}
	//fetches notifications
	function fetchNotifications() {
		var ajax = new XMLHttpRequest();
		ajax.onload = displayNotifications;
		ajax.open("GET", 
			"userdata.php?type=notifications", true);
		ajax.send(); // fetch celebrity info of name
	}

	// displays the rank information in the html page by creating a table in "graph"
	function displaySearchResult() {
		var search = document.getElementById("search");
		if (this.status == 200) {
			var response = this.responseXML;
			var results = response.getElementsByTagName("result");
			for (var i = 0; i < results.length; i++) {
				var li = document.createElement("li");
				li.innerHTML = results[i].textContent;
				search.appendChild(li);
			}
		} else if (this.status == 410) {
			search.innerHTML = "There is no data for that search.";
		} else {
			nuke(this);
		}
		document.getElementById("loadingsearch").classList.add("invisible");
	}
	// displays the notification info in the "notifications" id div in an unordered list
	function displayNotifications() {
		if (this.status == 200) {
			var data = JSON.parse(this.responseText);
			var notifications = data.notifications;
			var ul = document.getElementById("notifications");
			for (var i = 0; i < notifications.length; i++) { // creates a li for each notification
				var notification = notifications[i];
				var li = document.createElement("li");
				li.innerHTML = notification.text;
				ul.appendChild(li);
			}
			document.getElementById("loadingnotifications").classList.add("invisible");
		} else {
			nuke(this);
		}
	}
	// accepts an ajax request object
	// displays an error message and hides loading images
	function nuke(request) {
		setLoading(false);
		var errors = document.getElementById("errors");
		errors.innerHTML = "There was an error in your request: " + 
		request.status + ": " + request.responseText;
	}
})();