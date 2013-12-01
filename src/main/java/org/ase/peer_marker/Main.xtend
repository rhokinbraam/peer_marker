package org.ase.peer_marker

import com.tobykurien.sparkler.db.DatabaseManager
import com.tobykurien.sparkler.transformer.JsonTransformer
import org.ase.peer_marker.model.Answer
import org.ase.peer_marker.model.Assignment
import org.ase.peer_marker.model.Student
import org.javalite.activejdbc.Model
import spark.servlet.SparkApplication

import static com.tobykurien.sparkler.Sparkler.*

class Main implements SparkApplication {

	override init() {

		// these are optional initializers, must be set before routes
		//setPort(4567) // port to bind on startup, default is 4567
		//staticFileLocation("/var/www/public") // external static files (css, js, jpg)
		DatabaseManager.init(Student.package.name) // init db with package containing db models
		val student = Model.with(Student)
		val assignment = Model.with(Assignment)
		val answer = Model.with(Answer)
		
		var workingDir = System.getProperty("user.dir")
		externalStaticFileLocation(workingDir + "/views/app")

		before [ req, res, filter |
			if (!req.pathInfo.startsWith("/login")) {
				if (req.session(true).attribute("username") == null) {
					res.redirect("/login")
					filter.haltFilter(401, "Unauthorised")
				}
			}
		]

		// Homepage
		get("/") [ req, res |
			render("views/app/index.html", #{})
		]

		get(
			new JsonTransformer("/api/students") [ req, res |
				student.all;
			])

		get("/login") [ req, res |
			render("views/app/login.html", #{})
		]

		post("/login") [ req, res |
			req.session(true).attribute("username", "toby")
			res.redirect("/")
			""
		]
		
		get(
			new JsonTransformer("/api/assignments") [ req, res |
				assignment.all
			])
		
      get(
         new JsonTransformer("/api/assignment") [ req, res |
            // TODO - return the current assignment for this student, else return blank {}
         ])

		get("/api/user") [ req, res |
			'''{ "name": "toby"}'''
		]
		
		get(
			new JsonTransformer("/api/answers") [ req, res |
				answer.all.include(Student).toMaps
			])
			
		get(
			new JsonTransformer("/api/answers/:id") [ req, res |
				answer.findById(req.params("id"))
			])
			
	}

	def static void main(String[] args) {
		new Main().init();
	}
}
