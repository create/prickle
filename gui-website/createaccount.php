<?php
include 'common.php';
login_check(TRUE);
if (!isset($_POST['name']) || !isset($_POST['birthday'])) { //no post error message
	die("You need to login first.");
}
$name = $_POST['name'];
$birthday = $_POST['birthday'];
$id = $_SESSION['id'];
if (!file_exists("userdata/$id")) {
    mkdir("userdata/$id", 0777, true);
}
file_put_contents("userdata/$id/data.txt", data);
if (TRUE) {
	//create account
	$_SESSION['name'] = $name;
	header("Location: newsfeed.php");
} else {

} 
?>