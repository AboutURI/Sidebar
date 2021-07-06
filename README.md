# Sidebar
- - - -

"npm start" to start the server

localhost:3004/populate to generate sample data and add it to a mongodb database (you may need to modify database.js depending on your mongodb installation)



API
=============


Rest API runs at ‘http://localhost:3044’ with all of the following routes:

  * GET - `‘/price’` 
     * Returns the courseID, basePrice, discountPercentage, discountedPrice, saleEndDate, and saleOngoing for requested course
 
     ```   
        {
         courseId: Number,
         basePrice: Number,
         discountPercentage: Number,
         discountedPrice: Number,
         saleEndDate: Date,
         saleOngoing: Boolean
        }
    ```


  * GET - `‘/previewVideo’`
     * Returns a courseID and url of the preview video for requested course
 
     ```   
        {
         previewVideoUrl: String
        }
    ```


  * GET - `‘/siderbar’`
     * Returns courseID, fullLifetimeAccess, accessTypes, assignments, certificationOfCompletion, and downloadableResources for requested course.
 
     ```   
        {
         courseId: Number,
         fullLifetimeAccess: String,
         accessTypes: String,
         assignments: Boolean,
         certificateOfCompletion: Boolean,
         downloadableResources: Number
        }
    ```
  

  * POST - `‘/course/{id}’`
     * Created a new course in database
     * Returns the created course on completion
  

  * DELETE - `‘/course/{id}’`
     * Deletes the specified courseID
     * Returns the deleted course on completion


  * PUT - `‘/course/{id}’`
     * Edits a single requested course 
 
     ```   
        {
         Key: New/Edited Value
        }
    ```

