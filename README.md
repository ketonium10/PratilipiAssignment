This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

This project is developed for assessment for Pratilipi.

developed by: NAKUL BAGEJA

Deployed Link: https://pratilipi-assignment.netlify.app

## To run the project

In the project directory, you should run:

### `npm install`

Downloads all the required dependencies on your local machine.

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Understanding the code

### Technologies used

- React.js for front-end development
- Firebase firestore for back-end development
- Netlify for deployment

### React.js

- I have made use of only functional components, which are recommended over class components.
- Usage of Context API, rather than sending props to each component, I have made use of react context API which helps me to call the desired information from any component.

### Firebase

- I have made use of firebase's firestore for storing my backend data of users and stories.
- Users table maintains the users who have signed up on the website, by storing the username and an array of story's IDs he has visited.
- Stories table contains all the stories listed on the website. It stores the stories with their unique ID, each ID has the 'Content','title','total_read','cur_read' and 'image'.
- I'm making use of firebase authentication for signIn and signUp purpose.
