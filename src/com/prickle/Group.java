package com.prickle;

import java.util.Set;

public class Group {
	private String name;
	private String description;
	private Set<String> members;
	public Group(String name, String description) {
		this.name = name;
		this.description = description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setName(String name){
		this.name = name;
	}
	public String getName(){
		return this.name;
	}
	public String getDescription(){
		return this.description;
	}
	public void addMember(String memberName) {
		members.add(memberName);
	}
	@Override
	public String toString() {
		String result = name + ": " + description + " Members: ";
		for (String member : members) {
			result += member + ", ";
		}
		return result.substring(0, result.length() - 3);
	}
}
