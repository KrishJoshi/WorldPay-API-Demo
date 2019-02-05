# WorldPay API Demo

Sample project using a mock version of WorldPay API to make calls to authorise and settle a transaction.

### How it Works
Project uses React, because of familiarity with the framework and it's simplicity.
 
To create the mock backend project uses Express(node) to expose endpoints. I like that API uses HAL 
which meant the API was triversable on the front-end without hard coding endpoints. 

For future enhancement I've made the project pass the data through Index.js. If Redux was used in the 
future, it would mean only one connection needs to be changed and rest of the application should remain mostly the same.
 
For Testing Jest was used, Snapshots used to Regression testing, tests were written mostly 
before (but edited as I progressed) 

The CSS lives closest to the component using it. If it might be used globally, it's in index.css.

#### How I made it
- 10% - Understanding the API
- 5% - Deciding the tools
- 20% - Designing how it will work
- 60% - Writing the code
The API took some time to get my head around and then designing of application tool maybe 


### What I would do differently 

- Might have not used a framework  
  - In hindsight it might have added to the complexity of the project.
- I would use SASS instead of CSS
- Use Atomic design, instead of keeping all the components in 1 folder.

### Assumptions

I've assumed, as this was a POC:
- The API and Front-End is lacking error handling, in case API returns an error. 
  - Including form validation
- The company using this project follows the rules of compliance of API. As private data will be 
sent via HTTP to 3rd party containing financial information.
- I didn't have to follow strict security guidelines when taking card payment
- Data for card is hardcoded on to front end
  - It can easily be converted by passing in correct props

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Starts the mock server and 

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.
