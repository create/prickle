package com.prickle;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeSet;

public class Person implements Comparable<Person> {
	private int id;
	private	String firstName;
	private String lastName;
	private JaseDate birthDate;
	private String picture;
	private String statusUpdates;
	private String messages;
	private String info;
    private RelStatus relationStatus;
    private Set<String> friends;
    
	// new user creation
	public Person(int id, String firstName, String lastName, JaseDate birthDate) {
		this.id = id;
		setPaths();
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.friends = new TreeSet<String>();
		this.relationStatus = RelStatus.single;
		updateInfoFile();
	}
	
	//load user info from file
	public Person(int id) throws FileNotFoundException {
		this.id = id;
		setPaths();
		Scanner input = new Scanner(new File(info));
		this.firstName = input.nextLine();
		this.lastName = input.nextLine();
		String[] dateNums = input.nextLine().split(" ");
		this.birthDate = new JaseDate(Integer.parseInt(dateNums[0]), Integer.parseInt(dateNums[1]), Integer.parseInt(dateNums[2]));
		String f = input.nextLine();
		String[] strings = f.split(",");
		this.friends = new TreeSet<String>();
		for (String s : strings) {
			if (s.length() > 4) {
				friends.add(s);
			}
		}
		int relStatus = Integer.parseInt(input.nextLine());
		this.relationStatus = RelStatus.getRelById(relStatus);
	}
	private void setPaths() {
		this.messages = id + "/messages.txt";
		this.statusUpdates = id + "/statuses.txt";
		this.picture = id + "/picture.jpg";
		this.info = id + "/info.txt";
	}
	public JaseDate getBirthday() {
		return birthDate;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setRelStatus(RelStatus rel) {
		relationStatus = rel;
	}
	public void setPic(String pic) {
		this.picture = pic;
	}
	public void setName(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public void sendMessage(String msg, String sender) throws FileNotFoundException {
		addToFile(messages, sender + "\n" + msg);
	}
	public void postStatus(String status) throws FileNotFoundException {
		addToFile(statusUpdates, status);	
	}
	public List<String> getStatuses() {
		return readStringDataFile(statusUpdates);
	}
	public List<Message> getMessages() {
		List<Message> data = new ArrayList<Message>();
		Scanner input = null;
		try {
			input = new Scanner(new File(messages));
			while (input.hasNext()) {
				String sender = input.nextLine();
				String message = input.nextLine();
				data.add(new Message(sender, message));
			}
			input.close();
		} catch (FileNotFoundException e) {
			//do nothing, no statuses
		}
		return data;
	}
	private List<String> readStringDataFile(String filename) {
		List<String> data = new ArrayList<String>();
		Scanner input = null;
		try {
			input = new Scanner(new File(filename));
			while (input.hasNext()) {
				data.add(input.nextLine());
			}
			input.close();
		} catch (FileNotFoundException e) {
			//do nothing, no statuses
		}
		return data;
	}
	private void addToFile(String fileName, String msg) {
		addToFile(fileName, msg, false);
	}
	private void addToFile(String fileName, String msg, boolean overwrite) {
		PrintStream msgStream = null;
		String result = "";
		try {
			if (!overwrite) {
				Scanner f = new Scanner(new File(fileName));
				while (f.hasNext()) {
					result += f.nextLine() + "\n";
				}
				f.close();
			}
			msgStream = new PrintStream(fileName);
		} catch (FileNotFoundException e) {
			try {
				msgStream = new PrintStream(new File(fileName));
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			}
		}
		msgStream.println(msg);
		msgStream.print(result);
	}
	public void addFriend(String name) {
		friends.add(name);
		updateInfoFile();
	}
	public int getFriendCount() {
		return friends.size();
	}
	public void removeFriend(String name) {
		friends.remove(name);
		updateInfoFile();
	}
	public void updateInfoFile() {
		File dir = new File(id + "");
		dir.mkdir();
		addToFile(info, firstName + "\n" + lastName + "\n" + birthDate.storeString() + "\n" + friends.toString().substring(1, friends.toString().length() - 1) + "\n" + relationStatus.getId());
	}
	@Override
	public String toString() {
		return firstName + " " + lastName;
	}
	public String getProfile() {
		String result = toString() + "\nBirthday: " + getBirthday().toString() + "\nRelationship status: " + relationStatus + "\nNumber of friends: " +
	getFriendCount() + "\nFriends: " + friends.toString().substring(1, friends.toString().length() - 1) + "\nStatus Updates: ";
		for (String s : getStatuses()) {
			result += s + "\n";
		}
		return result;
	}
	public Set<String> getFriends() {
		return friends;
	}
	
	@Override
	public int compareTo(Person o) {
		return toString().compareTo(o.toString());
	}
	
}
