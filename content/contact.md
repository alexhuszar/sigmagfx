/*
Title: Contact
Description: This description will go in the meta description tag
Template: index
*/

<div id="contact-page">
	<div class="main-title container">
		<div class="title content-center">
			<h1>Drop us a line, get in touch</h1>
			<h2>We'd love to hear from you!</h2>
		</div>
	</div>
	<div class="line-s container"></div>
	<div id="contact" calss="container">
		<form action="/vendor/mail/mailer.php" method="post" class="message">
			<fieldset>
				<input name="name" value="" id="name" placeholder="Your name" type="text">
				<input name="email" id="email" value="" placeholder="Enter your email address" type="email">
				<input name="subject" value="" size="40" class="" placeholder="Subject" type="text">
				<textarea name="message" id="message" value="Message" placeholder="Message"></textarea>
				<input value="Send message" type="submit">
			</fieldset>
		</form>
	</div>
	<div class="line-s container"></div>
</div>