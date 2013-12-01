package org.ase.peer_marker.model;

import org.ase.peer_marker.model.Student;
import org.javalite.activejdbc.Model;
import org.javalite.activejdbc.annotations.BelongsTo;

@BelongsTo(foreignKeyName = "student_id", parent = Student.class)
@SuppressWarnings("all")
public class Answer extends Model {
  public Student getStudent() {
    Student _parent = this.<Student>parent(Student.class);
    return _parent;
  }
}
