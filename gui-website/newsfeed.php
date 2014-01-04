<?php
/* 
This file displays the HTML output for a todo list for a user. A user must be logged in to view
this page. It will read his text file info and allow him to add / delete tasks or logout.
*/
include 'common.php';
login_check(TRUE);
$id = $_SESSION['id'];
$filename = "userdata/{$id}/statuses.txt";
if (!file_exists($filename)) { //creates file if it does not exist
	file_put_contents($filename, "");
}

$listcontents = file($filename);
head();
?>
<button id="searchbutton">
		<img src="cactus.png" alt="icon" />
		Search
</button>
<h2>Search</h2>
<div id="search">
	<div class="loading" id="loadingsearch">
		<img src="loading.gif" alt="icon" />
			Searching...
	</div>
</div>
<h2>Notifications</h2>

	<div id="notifications"></div>
	<div class="loading" id="loadingnotifications">
		<img src="loading.gif" alt="icon" />
			Prickling...
	</div>
	<h2><?= $_SESSION['user'] ?>'s Newsfeed</h2>
	<div id="newsfeedbox">
		<ul id="newsfeed">

		</ul>
	
		<div class="loading" id="loadingnewsfeed">
			<img src="loading.gif" alt="icon" />
			Prickling...
		</div>
	</div>
	<div id="errors">
	</div>
	<div>
		<a href="logout.php"><strong>Log Out</strong></a>
	</div>
<?php
footer();
//Outputs the HTML for a list item in the TODO list
//accepts a string of the item and an index for the location of the item
function createitem($string, $index) {
?>
	<li>
		<form action="submit.php" method="post">
			<input type="hidden" name="action" value="delete" />
			<input type="hidden" name="index" value="<?= $index ?>" />
			<input type="submit" value="Delete" />
		</form>
		<?= htmlentities($string) ?>
	</li>
<?php
}
?>