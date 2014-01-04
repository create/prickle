package com.prickle;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class PersonLookup {
	public static Map<String, Integer> users = new HashMap<String, Integer>();
	public static boolean personExists(String name) {
		return users.keySet().contains(name);
	}
	public static void init() {
		Scanner input = null;
		try {
			input = new Scanner(new File("users.txt"));
			while (input.hasNext()) {
				int id = Integer.parseInt(input.nextLine());
				String name = input.nextLine();
				users.put(name, id);
			}
		} catch (FileNotFoundException e) {
			//
		}

	}
	public static String capWords(String phrase) {
		String result = "";
		phrase = phrase.toLowerCase();
		String[] words = phrase.split(" ");
		for(int i = 0; i< words.length; i++){
			char chr = Character.toUpperCase(words[i].charAt(0));
			words[i] = chr + words[i].substring(1);
			result += " " + words[i];	
		}
		return result.substring(1);
	}

	public static void main(String[] args) {
		init();
		Scanner input = new Scanner(System.in);
		//	createPerson();
		boolean run = true;
		while (run) {
			boolean valid = false;
			String name = null;
			while (!valid) {
				System.out.println("Prickle.\n\nWhat is your full name?\n");
				name = capWords(input.nextLine());
				if (name.length() > 4 && name.contains(" ")) {
					valid = true;
				} else if (name.toLowerCase().equals("quit")) {
					run = false;
					System.out.println("Goodbye.");
					return;
				}
			}
			Person currentUser = null;
			if (!personExists(name)) {
				String[] fullName = name.split(" ");
				valid = false;
				while (!valid) {
					System.out.println("Please enter your date of birth in this format (Using Numbers): Month/Day/Year");
					String birthday = input.nextLine();
					String[] birthdate = birthday.split("/");
					int month = Integer.parseInt(birthdate[0]);
					int day = Integer.parseInt(birthdate[1]);
					int year = Integer.parseInt(birthdate[2]);
					try {
						JaseDate bday = new JaseDate(year, month, day);
						valid = true;
						currentUser = new Person(users.size(), fullName[0], fullName[1], bday);
					} catch (Exception e) {
						System.out.println("Invalid birthday.");
					}
				}
				users.put(name, users.size());

				try {
					PrintStream out = new PrintStream(new File("users.txt"));
					for (String s : users.keySet()) {
						out.println(users.get(s));
						out.println(s);
					}
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			} else {
				try {
					currentUser = new Person(users.get(name));
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			System.out.println("Welcome " + currentUser.toString());
			boolean loggedIn = true;
			while (loggedIn) {
				System.out.println("\nWhat would you like to do?\n");
				System.out.println("1) Message someone");
				System.out.println("2) Create a group");
				System.out.println("3) Change your relationship status");
				System.out.println("4) Add a friend");
				System.out.println("5) Remove a friend");
				System.out.println("6) Post a status");
				System.out.println("7) View your profile");
				System.out.println("8) View someone's profile");
				System.out.println("9) Read Messages");
				System.out.println("10) Log Out");
				int number;
				try {
					number = Integer.parseInt(input.nextLine());
				} catch (Exception e) {
					number = -1;
				}
				switch (number) {
				case 1:
					System.out.println("Who would you like to send a message to?");
					String msgName = capWords(input.nextLine());
					try { 	
						Person msgPerson = new Person(users.get(msgName));
						System.out.println("What is your message?");
						msgPerson.sendMessage(input.nextLine(), name);
					} catch (Exception e) {
						System.out.println("Person does not exist.");
					}
					break;
				case 2:
					System.out.println("Enter the group name");
					String groupName = capWords(input.nextLine());
					System.out.println("Enter the group description");
					String groupDesc = input.nextLine();
					Group group = new Group(groupName, groupDesc);
					break;
				case 3:
					System.out.println("Relationship Status: \n");
					System.out.println("1) " + RelStatus.single.toString());
					System.out.println("2) " + RelStatus.inrel.toString());;
					System.out.println("3) " + RelStatus.open.toString());
					System.out.println("4) " + RelStatus.complicated.toString());
					System.out.println("5) " + RelStatus.married.toString());
					try {
						int relationshipNumber = Integer.parseInt(input.nextLine());
						RelStatus status = RelStatus.getRelById(relationshipNumber);
						currentUser.setRelStatus(status);
						System.out.println("You set your relationship to: " + status.toString());
					} catch(InputMismatchException e) {
						System.out.println("Please enter a number!");
					}
					break;

				case 4:
					System.out.println("Who would you like to add?");

					String addName = capWords(input.nextLine());
					if (personExists(addName)) {
						currentUser.addFriend(addName);
						System.out.println("You are now friends with " + capWords(addName) + ".");
					} else {
						System.out.println("Person does not exist.");
					}

					break;
				case 5:
					System.out.println("Who would you like to remove?");
					String remName = capWords(input.nextLine());
					if (currentUser.getFriends().contains(remName)) {
						currentUser.removeFriend(remName);
						System.out.println("Removed.");
					} else {
						System.out.println("Person is not on your friends list.");
					}
					break;
				case 6:
					System.out.println("Status Update: \n");
					try {
						currentUser.postStatus(input.nextLine());
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
					}
					break;
				case 7:
					System.out.println(currentUser.getProfile());
					break;
				case 8:
					System.out.println("Who would you like to view?");
					String viewName = capWords(input.nextLine());
					if (personExists(viewName)) {
						Person viewPerson = null;
						try {
							viewPerson = new Person(users.get(viewName));
						} catch (FileNotFoundException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
						if (viewPerson.getFriends().contains(name)) {
							try {
								System.out.println(new Person(users.get(viewName)).getProfile());
							} catch (Exception e) {
								System.out.println("Person does not exist.");
							}
						} else {
							System.out.println(viewName + " has not added you as a friend.");
						}
					} else {
						System.out.println("Person does not exist.");
					}
					break;
				case 9:
					System.out.println("Messages:");
					List<Message> msgs = currentUser.getMessages();
					int min = Math.min(10, msgs.size());
					for (int i = 1; i <= min; i++) {
						System.out.println(i + ") " + msgs.get(i - 1));
					}
					System.out.println((min + 1) + ") close inbox");
					int choice = Integer.parseInt(input.nextLine());
					if (choice < min + 1) {
						try {
							Person msgPerson = new Person(users.get(msgs.get(choice - 1).getSender()));
							System.out.println("What is your message?");
							msgPerson.sendMessage(input.nextLine(), currentUser.toString());
						} catch (FileNotFoundException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					break;
				case 10:
					loggedIn = false;
					break;
				default:
					System.out.println("Try again, this feature is not yet implemented.");
					break;
				}
			}
		}
	}
}
