# Getting Started

First, clone this repository to your local machine.

Once you are in the project directory...

Run this command to start the proxy server
### `node src/server.js`

Then, run this command to start the app up in development mode
### `npm start`

You should automatically be able to open up http://localhost:3000 and view the project in the browser


# In the time allotted, I successfully...
* Set up a working proxy server to avoid CORS errors
* Made API requests to a variety of endpoints
* Integrated typeahead for searching complaints, companies, and zip codes
* Displayed API data in React components
* Created React components
* Used React hooks efficiently to manage state and side effects
* Applied modern, minimalist, and responsive styling to all components
* Provided meaningful feedback to users, such as loading indicators and error messages
* Created and integrated useful TypeScript interfaces which become essentially built in documentation (yay TypeScript!) to provide clarity on structure of data
* Created navigation bar with anchor links
* Using the smooth-scroll package, implemented smooth scrolling when clicking in anchor links and logo in navigation bar

# If I had more time, I would have...
* Created a single main search bar with a dropdown menu for the user to select search criteria
    * Dynamically fetched and displayed complaint details based on the selected search criteria and user input
    * Displayed ComplaintDetails below the search bar based on the selected suggestion or input
    * Incorporated typeahead endpoints into this main search bar, enabling users to click on a suggestion and have that generate all complaints tied to that query
* Fetched to trends endpoint
* Created helpful charts and visualizations using Recharts or Chart.js
* Used more images and animations to make the application more visually appealing
* Further refined and polished UI
* Written unit and integration tests
* Ensured the application was accessible (to those who are color blind, neurodivergent, among other disabilities)