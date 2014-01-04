<?php
/* 
Jeffrey Pyke
Homework 5: To-Do List
This file displays the HTML output for a todo list for a user. A user must be logged in to view
this page. It will read his text file info and allow him to add / delete tasks or logout.
*/
include 'common.php';
login_check(TRUE);
$user = $_SESSION['user'];
$filename = "todo_{$user}.txt";
if (!file_exists($filename)) { //creates file if it does not exist
	file_put_contents($filename, "");
}
$listcontents = file("todo_{$user}.txt");
head();
?>
			<h2><?= $_SESSION['user'] ?>'s To-Do List</h2>
			
			<ul id="todolist">
<?php
for ($i = 0; $i < count($listcontents); $i++) { //prints all saved list items
	createitem($listcontents[$i], $i);
}
?>
		<li>
			<form action="submit.php" method="post">
				<input type="hidden" name="action" value="add" />
				<input name="item" type="text" size="25" autofocus="autofocus" />
				<input type="submit" value="Add" />
			</form>
		</li>
	</ul>

	<div>
		<a href="logout.php"><strong>Log Out</strong></a>
		<em>(logged in since <?= $_COOKIE['lastlogin'] ?>)</em>
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