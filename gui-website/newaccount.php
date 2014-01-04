<?php
include 'common.php';
login_check(TRUE);
head();
?>
<h2>Become a Prickler</h2>
<form id="signupform" action="createaccount.php" method="post">
	<div><input name="name" type="text" size="8" autofocus="autofocus" /> <strong>Full Name</strong></div>
	<div><input name="birthday" type="text" size="8" /> <strong>Birthday</strong></div>
	<div><input type="submit" value="Let's go!" /></div>
</form>
<div>
	<a href="logout.php"><strong>Cancel</strong></a>
</div>
<?php
footer();
function login() {
	header("Location: newsfeed.php");
	die();
}
?>