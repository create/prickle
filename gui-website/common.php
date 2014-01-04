<?php
$prefix = "userdata/{$id}/";
/* 
This file holds the common php functions that are used across several pages.
*/

//checks whether the user is logged in or not according to $bool
//if the user state is not equal to $bool, it will redirect to appropriate page
//if user should be logged in, redirects to start.php. If user should be logged out
//redirects to todolist.php
function login_check($bool) {
	session_start();
	if (isset($_SESSION['email']) != $bool) {
		if ($bool) {
			header("Location: start.php");
		} else {
			header("Location: newsfeed.php");
		}
		die();
	}
}
//Displays the HTML for the top of a prickle page
function head() {
?>
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Prickle - social networking for pricks</title>
			<link href="style.css" type="text/css" rel="stylesheet" />
			<link href="cactus.png" type="image/ico" rel="shortcut icon" />
			<script src="main.js" type="text/javascript"></script>
		</head>

		<body>
			<div class="headfoot">
				<h1>
					<img src="prickle.png" height="100" alt="logo" />
				</h1>
			</div>

			<div id="main">
<?php
}
//Displays the HTML for the footer of a prickle page
function footer() {
?>
	</div>

			<div class="headfoot">
				<p>
					"Prickle is nice, but it's a totally oldschool." - PCWorld<br />
					All pages and content &copy; Copyright Jaserdude Inc.
				</p>

				<div id="w3c">
					<a href="http://validator.w3.org/check?uri=referer"><img
          src="http://www.w3.org/Icons/valid-xhtml10"
          alt="Valid XHTML 1.0!" height="31" width="88" /></a>
					<a href="http://jigsaw.w3.org/css-validator/check?uri=referer"><img
          src="http://www.w3.org/Icons/valid-css.png"
          alt="Valid CSS!" height="31" width="88" /></a>
          		</div>
			</div>
		</body>
	</html>
<?php
}
?>