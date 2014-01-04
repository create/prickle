package com.prickle;

public class Message {
	private String sender;
	private String message;
	public Message(String sender, String message) {
		this.sender = sender;
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	@Override
	public String toString() {
		return message + " - " + sender;
	}
	
}
