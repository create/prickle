<?php
/* 
This file will validate login POST info from start.php. It will either log the user in
or push them back to the start page if their password is incorrect or create a new
user profile if they input a valid email and password that do not exist. When a user
logs in a date cookie is created and their session is created. It will
redirect to todolist.php after a succesful login / account creation.
*/
include 'common.php';
login_check(FALSE);
if (!isset($_POST['email']) || !isset($_POST['password'])) { //no post error message
	die("You need to login first.");
}
$email = $_POST['email'];
$password = $_POST['password'];
$filename = 'users.txt';
$filecontent = file($filename); // all user info
$userinfo = arrayfind($email . ":", $filecontent); // "email:password" TODO: check that arrayfind searchs within strings not exact match because id begins line
if ($userinfo) { //true if user exists
	if (strpos($userinfo, ":" . $password) !== FALSE) { //succesful login
		$id = substr($userinfo, 0, strpos($userinfo, ";"));
		login($email, $id); //starts a session and redirects
	}
} else /*if (preg_match("/^[a-z][a-z0-9]{2,7}/", $email) && preg_match("/^[0-9].{4,10}[^a-zA-Z0-9]/", $password))*/ {
	//create account
	$id = file_get_contents("counter.txt"); // file should consist of only a number, that represents the next available user id
	file_put_contents("counter.txt", (intval($id) + 1));
	file_put_contents($filename, intval($id) . ";" . $email . ":" . $password . "\n", FILE_APPEND);
	loginforce($email, $id, TRUE); //starts a session and redirects
} 
//wrong password or invalid email/password creation
header("Location: start.php");
die();

//accepts a string $needle and $haystack array
//search an array with a partial value string
//returns the value
function arrayfind($needle, $haystack) {
   foreach ($haystack as $value) {
      if (strpos($value, $needle) !== FALSE) {
         return $value;
      }
   }
   return FALSE;
}
//start a session with the string email and id and redirect to todolist
function login($string, $id) {
	loginforce($string, $id, FALSE);
}
function loginforce($string, $id, $newaccount) {
	session_start();
	$_SESSION['email'] = $string;
	$_SESSION['id'] = $id;
	setcookie("lastlogin", date("D y M d, g:i:s a"), time()+7*24*60*60);
	if ($newaccount) {
		header("Location: newaccount.php");
	} else {
		$_SESSION['name'] = file_get_contents("userdata/$id/data.txt");
		header("Location: newsfeed.php");
	}
	die();
}
?>