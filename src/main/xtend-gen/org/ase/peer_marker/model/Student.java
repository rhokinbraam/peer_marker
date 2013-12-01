package org.ase.peer_marker.model;

import org.javalite.activejdbc.Model;

@SuppressWarnings("all")
public class Student extends Model {
  private String _type = "student";
  
  public String getType() {
    return this._type;
  }
  
  public void setType(final String type) {
    this._type = type;
  }
}
