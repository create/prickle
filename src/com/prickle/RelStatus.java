package com.prickle;

public enum RelStatus {

	single("Single", 1),
	inrel("In a Relationship", 2),
	open("Open Relationship", 3),
	complicated("Complicated Relationship", 4),
	married("Married", 5);
	
	private String status;
	private int id;

	RelStatus(String status, int id) {
		this.status = status;
		this.id = id;
	}
	@Override
	public String toString() {
		return this.status;
	}
	public int getId(){
		return this.id;
	}
	public static RelStatus getRelById(int id){
		for(RelStatus rel : values()){
			if (id == rel.id){
				return rel;
			}
		}
		return single;

	}
}
