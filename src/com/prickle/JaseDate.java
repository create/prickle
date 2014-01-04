package com.prickle;


public class JaseDate {
	public enum Month {
		January(1),
		Febuary(2),
		March(3),
		April(4),
		May(5),
		June(6),
		July(7),
		August(8),
		September(9),
		October(10),
		November(11),
		December(12);
		private int id;
		Month(int id) {
			this.id = id;
		}
		public static Month getMonthById(int id) {
			for (Month m : values()) {
				if (id == m.id) {
					return m;
				}
			}
			throw new IllegalArgumentException();
		}
	}
	private int year;
	private int month;
	private int day;
	public JaseDate(int year, int month, int day) {
		if (year < 1900 || year > 2013 || month > 12 || month < 0 || day > 31 || day < 0) {
			throw new IllegalArgumentException();
		}
		this.year = year;
		this.month = month;
		this.day = day;
	}
	public int getDay() {
		return day;
	}
	public int getMonth() {
		return month;
	}
	public int getYear() {
		return year;
	}
	public String toString() {
		return Month.getMonthById(month).toString() + " " + day + ", " + year;
	}
	public String storeString() {
		return year + " " + month + " " + day;
	}
}
