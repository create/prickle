<?php
/* 
This file displays the login page for Prickle. If the user has visited the site before it will show the last login.
*/
include 'common.php';
login_check(FALSE);
head();
?>
	<p>
		The open-source social network. <br />
	</p>

	<p>
		Log in now, and GET PRICKLIN'!. <br />
		If you do not have an account, one will be created for you.
	</p>

	<form id="loginform" action="login.php" method="post">
		<div><input name="email" type="text" size="8" autofocus="autofocus" /> <strong>Email Address</strong></div>
		<div><input name="password" type="password" size="8" /> <strong>Password</strong></div>
		<div><input type="submit" value="Log in" /></div>
	</form>
<?php
footer();
?>
