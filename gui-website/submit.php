<?php
/* 
This file will recieve POST info from todolist.php and either write a new task to the current
session user's txt file or delete an entry from it according to an index.
*/
include 'common.php';
login_check(TRUE);
$user = $_SESSION['user'];
$file = "todo_{$user}.txt";
if (isset($_POST['action'])) {
	$action = $_POST['action']; //add or delete?
	
	if ($action == "add" && isset($_POST['item'])) {
		$info = $_POST['item'];
		file_put_contents($file, $info . "\n", FILE_APPEND); //adds to end of file
	} elseif ($action == "delete" && isset($_POST['index'])) {
		$index = $_POST['index'];
		$filecontents = file($file); //all previous items in array
		if (array_key_exists($index, $filecontents)) { //deletes the item if it is a valid index
			unset($filecontents[$index]);
		} else { //invalid index
			die("index");
		}
		file_put_contents($file, $filecontents); //replaces the file with the array minus the item
	} else { //either the action is invalid or a required POST item is unset
		die("post");
	}
}
header("Location: todolist.php");
die();

?>