var PREFIX = "> ";
var commands = new Array("print");
function transferKeyboardFocus() {
  document.getElementById("input").focus();
}
function reply() {
	try {
    var line = getLine();
    var arguments = line.split(" ");
    var fn = arguments.splice(0, 1).pop(); //remove command
    console.log(fn);
    console.log(arguments);
    printElement(line, $.inArray(fn, commands) == -1); // print command so they can see their history
		runFunction("userfn_" + fn, arguments);
	} catch (e) {
		console.error(e.message);
	}
  return false;
}
function userfn_print() {
  for (var i = 0; i < 5; i++) {
    printElement("waddup");
  }
}
function getLine() {
  return document.getElementById("input").value;
}
function getInput() {
  return document.getElementById("input");
}
function runFunction(name, arguments)
{
    var fn = window[name];
    if(typeof fn !== 'function') {
      return;
    }
    fn.apply(window, arguments);
}
function printElement(element, error) {
  var div = document.createElement('div');
  div.classList.add('output');
  var pre = document.createElement('span');
  pre.innerHTML = PREFIX;
  pre.classList.add("prefix");
  var line = document.createElement('span');
  line.classList.add('line');
  line.innerHTML = element;
  console.log(error);
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
  printElement(span);
}
function clearOut() {
	$(".output").remove();
	return false;
}
////////////////////////////////////////

// case 1:
//           System.out.println("Who would you like to send a message to?");
//           String msgName = capWords(input.nextLine());
//           try {   
//             Person msgPerson = new Person(users.get(msgName));
//             System.out.println("What is your message?");
//             msgPerson.sendMessage(input.nextLine(), name);
//           } catch (Exception e) {
//             System.out.println("Person does not exist.");
//           }
//           break;
//         case 2:
//           System.out.println("Enter the group name");
//           String groupName = capWords(input.nextLine());
//           System.out.println("Enter the group description");
//           String groupDesc = input.nextLine();
//           Group group = new Group(groupName, groupDesc);
//           break;
//         case 3:
//           System.out.println("Relationship Status: \n");
//           System.out.println("1) " + RelStatus.single.toString());
//           System.out.println("2) " + RelStatus.inrel.toString());;
//           System.out.println("3) " + RelStatus.open.toString());
//           System.out.println("4) " + RelStatus.complicated.toString());
//           System.out.println("5) " + RelStatus.married.toString());
//           try {
//             int relationshipNumber = Integer.parseInt(input.nextLine());
//             RelStatus status = RelStatus.getRelById(relationshipNumber);
//             currentUser.setRelStatus(status);
//             System.out.println("You set your relationship to: " + status.toString());
//           } catch(InputMismatchException e) {
//             System.out.println("Please enter a number!");
//           }
//           break;

//         case 4:
//           System.out.println("Who would you like to add?");

//           String addName = capWords(input.nextLine());
//           if (personExists(addName)) {
//             currentUser.addFriend(addName);
//             System.out.println("You are now friends with " + capWords(addName) + ".");
//           } else {
//             System.out.println("Person does not exist.");
//           }

//           break;
//         case 5:
//           System.out.println("Who would you like to remove?");
//           String remName = capWords(input.nextLine());
//           if (currentUser.getFriends().contains(remName)) {
//             currentUser.removeFriend(remName);
//             System.out.println("Removed.");
//           } else {
//             System.out.println("Person is not on your friends list.");
//           }
//           break;
//         case 6:
//           System.out.println("Status Update: \n");
//           try {
//             currentUser.postStatus(input.nextLine());
//           } catch (FileNotFoundException e) {
//             // TODO Auto-generated catch block
//           }
//           break;
//         case 7:
//           System.out.println(currentUser.getProfile());
//           break;
//         case 8:
//           System.out.println("Who would you like to view?");
//           String viewName = capWords(input.nextLine());
//           if (personExists(viewName)) {
//             Person viewPerson = null;
//             try {
//               viewPerson = new Person(users.get(viewName));
//             } catch (FileNotFoundException e1) {
//               // TODO Auto-generated catch block
//               e1.printStackTrace();
//             }
//             if (viewPerson.getFriends().contains(name)) {
//               try {
//                 System.out.println(new Person(users.get(viewName)).getProfile());
//               } catch (Exception e) {
//                 System.out.println("Person does not exist.");
//               }
//             } else {
//               System.out.println(viewName + " has not added you as a friend.");
//             }
//           } else {
//             System.out.println("Person does not exist.");
//           }
//           break;
//         case 9:
//           System.out.println("Messages:");
//           List<Message> msgs = currentUser.getMessages();
//           int min = Math.min(10, msgs.size());
//           for (int i = 1; i <= min; i++) {
//             System.out.println(i + ") " + msgs.get(i - 1));
//           }
//           System.out.println((min + 1) + ") close inbox");
//           int choice = Integer.parseInt(input.nextLine());
//           if (choice < min + 1) {
//             try {
//               Person msgPerson = new Person(users.get(msgs.get(choice - 1).getSender()));
//               System.out.println("What is your message?");
//               msgPerson.sendMessage(input.nextLine(), currentUser.toString());
//             } catch (FileNotFoundException e) {
//               // TODO Auto-generated catch block
//               e.printStackTrace();
//             }
//           }
//           break;
//         case 10:
//           loggedIn = false;
//           break;


////////////////////////////////////////////
$( document ).ready(function() {
  var console = document.getElementById("console");
  var clear = document.getElementById("clear");
  getInput().onKeyDown = function(event) {
     if (!event)
          event = window.event;
     var code = event.keyCode;
     if (event.charCode && code == 0)
          code = event.charCode;
     switch(code) {
          case 37:
              // Key left.
              break;
          case 38:
              // Key up.
              break;
          case 39:
              // Key right.
              break;
          case 40:
              // Key down.
              break;
     }
     event.preventDefault();
};
  clear.onclick = clearOut;
  document.body.onclick = transferKeyboardFocus;
  transferKeyboardFocus();
});
