package org.ase.peer_marker

import com.tobykurien.sparkler.db.DatabaseManager
import org.ase.peer_marker.model.Answer
import org.ase.peer_marker.model.Assignment
import org.ase.peer_marker.model.Student
import org.ase.peer_marker.transformer.JsonTransformer
import org.javalite.activejdbc.Base
import org.javalite.activejdbc.Model
import org.json.JSONObject
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
            if (req.session(true).attribute("student") == null) {
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
         Base.open(DatabaseManager.newDataSource)
         try {

            var username = req.queryParams("username")

            // create user
            var Student ret
            var s = student.find("username =?", username)
            if (s.length == 0) {
               ret = student.createIt(
                  "username",
                  username
               )
            } else {
               ret = s.get(0)
            }

            req.session(true).attribute("student", ret)
            res.redirect("/")
            ""
         } finally {
            Base.close
         }
      ]

      get(
         new JsonTransformer("/api/assignments") [ req, res |
            assignment.all
         ])

      get("/api/user") [ req, res |
         var user = req.session.attribute("student") as Student
         if(user.get("username").equals("teacher")) user.type = "teacher"
         '''{ "name": "«user.get("username")»", "type" : "«user.type»"}'''
      ]

      get(
         new JsonTransformer("/api/answers") [ req, res |
            var user = req.session.attribute("student") as Student
            answer.find("student_id = ?", user.id).include(Student)
         ])

      get(
         new JsonTransformer("/api/answers/:id") [ req, res |
            answer.findById(req.params("id"))
         ])

      post(
         new JsonTransformer("/api/answer") [ req, res |
            var j = new JSONObject(req.body)
            var st = req.session.attribute("student") as Student
            var ans = answer.find("student_id = ? and assignment_id = ?",
                           st.id, j.getLong("assignment"))
            if (ans.length == 0) {
               // add answer
               answer.createIt(
                  "student_id", st.id,
                  "assignment_id", j.getLong("assignment"),
                  "content", j.getString("answer")
               )
            } else {
               ans.get(0).set(
                  "student_id", st.id,
                  "assignment_id", j.getLong("assignment"),
                  "content", j.getString("answer")
               )
               ans.get(0).saveIt
            }               

            '''{"success": true}'''
         ])

      post(
         new JsonTransformer("/api/assignment") [ req, res |
            // remove existing editing assignment
            assignment.find("status = ?", "EDITING")?.forEach [ a |
               a.set("status", "DONE")
               a.saveIt()
            ]
            var j = new JSONObject(req.body)
            assignment.createIt(
               "name",
               j.getString("name"),
               "question",
               j.getString("question"),
               "status",
               j.getString("status")
            )
         ])

      put(
         new JsonTransformer("/api/assignment/:id") [ req, res |
            var j = new JSONObject(req.body)
            assignment.update(
               "name",
               j.getString("name"),
               "question",
               j.getString("question")
            )
         ])

      get(
         new JsonTransformer("/api/assignment") [ req, res |
            var assigns = assignment.find("status = ?", "EDITING")
            if (assigns.length > 0) {
               assigns.get(0)
            } else {
               #{}
            }
         ])
         
      get("/api/marking") [req, res|
         res.type("application/json")
         '''[{"answers": 5, "evaluations": 0}, {"answers": 1, "evaluations": 1} ]'''
      ]

   }

   def static void main(String[] args) {
      new Main().init();
   }
}
