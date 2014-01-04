<?php
/* 
This file will log the user out by destroying their session and regenerating their ID
then redirect them to start.php.
*/
session_start();
if (isset($_SESSION['email'])) {
	session_destroy();
	session_regenerate_id(TRUE);
}
header("Location: start.php");
?>