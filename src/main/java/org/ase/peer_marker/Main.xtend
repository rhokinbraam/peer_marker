package org.ase.peer_marker

import spark.servlet.SparkApplication

import static com.tobykurien.sparkler.Sparkler.*

class Main implements SparkApplication {
   
   override init() {
      // these are optional initializers, must be set before routes
      //setPort(4567) // port to bind on startup, default is 4567
      //externalStaticFileLocation("/var/www/public") // external static files (css, js, jpg)
      
      // Homepage
      get("/") [req, res|
         render("views/index.html", #{})
      ]
   }
   
   def static void main(String[] args) {
      new Main().init();
   }
}
