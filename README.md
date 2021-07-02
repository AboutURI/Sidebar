# Sidebar

"npm start" to start the server

localhost:3004/populate to generate sample data and add it to a mongodb database (you may need to modify database.js depending on your mongodb installation)


Sidebar Service
- - - -


API
=============


Rest API runs at ‘http://localhost:3044’ with all of the following routes:

  * GET - `‘/price’` 
     * Returns the courseID, basePrice, discountPercentage, discountedPrice, saleEndDate, and saleOngoing for requested course
     ```   
     {
        "data": {
            "lookedUpPlatform": 1,
            "query": "Kasabian+Test+Transmission",
            "lookedUpItem": {
                "name": "Test Transmission",
                "artist": "Kasabian",
                "album": "Kasabian",
                "picture": null,
                "link": "http://open.spotify.com/track/5jhJur5n4fasblLSCOcrTp"
            }
        }
    }
    ```


  * GET - `‘/previewVideo’`
     * Returns a courseID and url of the preview video for requested course


  * GET - `‘/siderbar’`
     * Returns courseID, fullLifetimeAccess, accessTypes, assignments, certificationOfCompletion, and downloadableResources for requested course.
  

  * POST - `‘/course’`
     * Created a new course in database
     * Returns the created course on completion
  

  * DELETE - `‘/course/{id}’`
     * Deletes the specified courseID
     * Returns the deleted course on completion


  * PUT - `‘/course/{id}’`
     * Edits a single requested course  

