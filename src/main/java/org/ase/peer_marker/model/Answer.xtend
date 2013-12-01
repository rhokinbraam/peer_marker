package org.ase.peer_marker.model

import org.javalite.activejdbc.Model
import org.javalite.activejdbc.annotations.BelongsTo

@BelongsTo(foreignKeyName="student_id",parent=Student)
class Answer extends Model {
	def Student getStudent() {
	   parent(Student)
	}
}