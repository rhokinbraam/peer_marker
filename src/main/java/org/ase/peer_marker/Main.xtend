package org.ase.peer_marker

import com.tobykurien.sparkler.db.DatabaseManager
import com.tobykurien.sparkler.transformer.JsonTransformer
import org.ase.peer_marker.model.Student
import org.javalite.activejdbc.Model
import spark.servlet.SparkApplication

import static com.tobykurien.sparkler.Sparkler.*

class Main implements SparkApplication {
   
   override init() {
      // these are optional initializers, must be set before routes
      //setPort(4567) // port to bind on startup, default is 4567
      //externalStaticFileLocation("/var/www/public") // external static files (css, js, jpg)
      
      DatabaseManager.init(Student.package.name) // init db with package containing db models
      val student = Model.with(Student)
      
      // Homepage
      get("/") [req, res|
         render("views/index.html", #{})
      ]
            
      get(new JsonTransformer("/students") [req, res|
      	student.all;
      ])
   }
   
   def static void main(String[] args) {
      new Main().init();
   }
}
