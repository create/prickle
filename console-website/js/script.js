var PREFIX = "> ";
function transferKeyboardFocus() {
  document.getElementById("input").focus();
}
function reply() {
	try {
		printElement(document.getElementById("input").value);
		return false;
	} catch (e) {
		console.error(e.message);
		return false;
	}
}
function printElement(element) {
  var div = document.createElement('div');
  div.classList.add('output');
  var pre = document.createElement('span');
  pre.innerHTML = PREFIX + element;
  var line = document.createElement('span');
  line.classList.add('line');
  line.appendChild(pre);
  div.appendChild(line);
  document.getElementById("input").value = "";
  var console = document.getElementById("console")
  console.appendChild(div);
  window.scrollTo(0, console.scrollHeight);
}

function printBlock(text, className) {
  var span = document.createElement('span');
  span.addClassName(className);
  span.addClassName('block');
  span.appendChild(document.createTextNode(text));
  printElement(span);
}
function clearOut() {
	$(".output").remove();
	return false;
}
$( document ).ready(function() {
  var console = document.getElementById("console");
  var clear = document.getElementById("clear");
  clear.onclick = clearOut;
  document.body.onclick = transferKeyboardFocus;
  transferKeyboardFocus();
});
