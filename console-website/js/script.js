"use strict";
var PREFIX = "> ";
var commands = new Array("help", "print", "commands");
var version = "v0.01";
var helpid = 0;
var ignore = false;
var prevstack = new Array();
var futurestack = new Array();
function transferKeyboardFocus() {
  document.getElementById("input").focus();
}
function reply() {
	try {
    if (ignore) {
      return false;
    }
    var line = getLine();
    if (line) {
      prevstack.push(line);
    }
    var br = line.toLowerCase().localeCompare("do a barrel roll") == 0;
    var args = line.split(" ");
    var fn = args.splice(0, 1).pop(); //remove command
    console.log("function called: " + fn + " ...with arguments: " + args);
    pr_printElement(document.createTextNode(line), ($.inArray(fn, commands) == -1 && !br)); // print command so they can see their history
		if (br) {
      pr_secret();
    } else {
      runFunction("userfn_" + fn, args);
    }
	} catch (e) {
		console.error(e.message);
	}
  return false;
}
function userfn_print() {
  for (var i = 0; i < 5; i++) {
    pr_printElement(document.createTextNode("waddup"));
  }
}
function userfn_commands() {
  pr_printToggleBox("COMMANDS", commands);
}
function userfn_help() {
  helpid++;
  var div = document.createElement('div');
  div.classList.add('help', 'output');
  var result = "";
  for (var index = 0; index < commands.length; index++) {
    result += commands[index] + "<br>";
  }
  var builtins = '<h2><span class="strong">COMMANDS</span></h2>' +
    '<div class="builtinList" id="builtinList' + helpid + '">' +
    '<p>' +
      'To learn how to use a command, type ' +
      '<strong>help <em>command</em></strong> where ' +
      '<strong><em>command</em></strong> is the action to look up.' +
    '</p>' +
    '<p>' +
      'Enter <strong>commands</strong> to view a list of available actions.' +
    '</p>';
  div.innerHTML = '<h1><span class="strong">PRICKLE HELP</span> ' +
    pr_getToggleLinkFor('helpBody','helpMin') + '</h1><div class="helpBody">'+
    '<div id="helpBody' + helpid + '">' +
    '<p>Welcome to Prickle ' + version + '!</p>' +
    '<p>' +
      'An experiment in web interfaces. ' +
    '</p>' +
    '<p>' +
      'Prickle is written by brothers Jason and Jeff.' +
    '</p>' +
    '<p>' +
      'Visit the <a href="https://github.com/jeffpyke/prickle">Github</a> ' +
      'page for more information.' +
    '</p>' +
    builtins +
    '</div></div>';
  document.getElementById("console").appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
}
function pr_getToggleLinkFor(what, cssClass, text) {
  if (text == undefined) text = '[toggle]';
    cssClass = cssClass ? (' class="' + cssClass + '" ') : '';
  return '<a href="#" onclick="$(\'#' + what + helpid + '\').toggle();' +
    'return false;"' + cssClass + '>' + text + '</a>';
}
function pr_printToggleBox(title, html) {
  helpid++;
  var div = document.createElement('div');
  div.classList.add('help', 'output');
  div.innerHTML = '<h1><span class = "strong">' + title + '</span> ' +
       pr_getToggleLinkFor('helpBody', 'helpMin') + '</h1>' +
       '<div class="helpBody"><div id="helpBody' + helpid + '">' +
       html + '</div>';
  $('#console').append(div);
  window.scrollTo(0, document.body.scrollHeight);
}
function getLine() {
  return document.getElementById("input").value;
}
function getInput() {
  return document.getElementById("input");
}
function runFunction(name, args)
{
    var fn = window[name];
    if(typeof fn !== 'function') {
      return;
    }
    fn.apply(window, args);
}
function pr_secret() {
  var s = document.createElement('style');
  s.id = "barrel";
  s.innerHTML = '@-moz-keyframes roll { 100% { -moz-transform: rotate(360deg); } } @-o-keyframes roll { 100% { -o-transform: rotate(360deg); } } @-webkit-keyframes roll { 100% { -webkit-transform: rotate(360deg); } } body{ -moz-animation-name: roll; -moz-animation-duration: 3s; -moz-animation-iteration-count: 1; -o-animation-name: roll; -o-animation-duration: 3s; -o-animation-iteration-count: 1; -webkit-animation-name: roll; -webkit-animation-duration: 3s; -webkit-animation-iteration-count: 1; }';
  document.getElementsByTagName('head')[0].appendChild(s);
  ignore = true;
  window.setTimeout(pr_del, 3000);
}
function pr_del() {
  $("#barrel").remove();
  ignore = false;
}
function pr_printElement(element, error) {
  var div = document.createElement('div');
  div.classList.add('output');
  var pre = document.createElement('span');
  pre.innerHTML = PREFIX;
  pre.classList.add("prefix");
  var line = document.createElement('span');
  line.classList.add('line');
  if (element) {
    line.appendChild(element);
  }
  if (error) {
    line.classList.add('error');
  }
  div.appendChild(pre);
  div.appendChild(line);
  document.getElementById("input").value = "";
  var consolearea = document.getElementById("console")
  consolearea.appendChild(div);
  window.scrollTo(0, consolearea.scrollHeight);
}

function printBlock(text, className) {
  var span = document.createElement('span');
  span.classList.add(className, "block");
  span.appendChild(document.createTextNode(text));
  pr_printElement(span);
}
function clearOut() {
	$(".output").remove();
	return false;
}
$( document ).ready(function() {
  document.getElementById("input").onkeydown = function(event) {
     if (!event)
          event = window.event;
     var code = event.keyCode;
     if (event.charCode && code == 0)
          code = event.charCode;
     switch(code) {
          case 38:
              // Key up.
              if (prevstack.length > 0) {
                futurestack.push(getLine());
                getInput().value = prevstack.pop();
              }
              event.preventDefault();
              break;
          case 40:
              // Key down.
              if (futurestack.length > 0) {
                prevstack.push(getLine());
                getInput().value = futurestack.pop();
              }
              event.preventDefault();
              break;
          default:
            break;
     }
};
  var clear = document.getElementById("clear");
  clear.onclick = clearOut;
  document.body.onclick = transferKeyboardFocus;
  transferKeyboardFocus();
});
