# FletNix

FletNix is a web application that allows users to browse and search for movies and TV shows available on Netflix. It provides features like authentication, pagination, search functionality, age restriction, filtering, and detailed item pages.

## Features

- *Authentication*: Users can register and login using their email, password, and age.
- *Pagination*: Paginated list of TV shows and movies with 15 items per page.
- *Search Functionality*: Users can search for movies and TV shows by title or cast.
- *Age Restriction*: Users below 18 years old cannot see "R" rated items.
- *Filter Functionality*: Users can filter between movies and TV shows.
- *Detail Page*: Detailed page for each item displaying all relevant information.

## Technologies Used

- Frontend: JavaScript Framework (React)
- Backend: Node.js

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- MongoDB installed and running.

### Installation

1. Clone the repository:

   bash
   git clone <repository_url>
   

2. Change to the project directory:

   bash
   cd frontend
   

3. Install the dependencies:

   bash
   npm install
   

4. Start the development server:

   bash
   npm start
   

5. Open your browser and visit `http://localhost:3000` to see the application.

## Testing
Here are some basic test cases you can consider for the given tasks:

1. *Authentication*:
   - Test that a user can successfully register with a valid email, password, and age.
   - Test that a user cannot register with an invalid email, password, or age.
   - Test that a user can successfully login with valid credentials.
   - Test that a user cannot login with invalid credentials.

2. *Paginated List of TV Shows/Movies*:
   - Test that the paginated list of TV shows/movies is displayed correctly on the frontend.
   - Test that the correct number of items (15 per page) are shown on each page.
   - Test that the pagination navigation is working correctly (e.g., clicking on page numbers, next/previous buttons).

3. *Search Functionality*:
   - Test that the search functionality correctly filters the TV shows/movies based on the title or cast.
   - Test that the search results are displayed properly on the frontend.
   - Test different search scenarios, such as searching for an exact title, partial title, or specific cast member.

4. *Age Restriction*:
   - Test that a user below 18 years old cannot see "R" rated items.
   - Test that a user above 18 years old can see all items, including "R" rated ones.
   - Test that the age restriction is properly enforced on the frontend.

5. *Filter Functionality*:
   - Test that the filter functionality correctly filters between movies and TV shows.
   - Test that the filtered results are displayed correctly on the frontend.
   - Test selecting both movies and TV shows simultaneously.

6. *Detail Page*:
   - Test that clicking on an item in the list takes the user to the detail page.
   - Test that the detail page displays all the relevant details of the selected item correctly.

These are just basic test case ideas to get you started. You can expand on them by including edge cases, testing error scenarios, and covering additional functionality specific to your application.

## Deployment

- *Netlify*: Deployed the frontend on Netlify, and use a cloud-based MongoDB service for the backend.

## Code Repository

You can find the code repository for this project on [GitHub](https://github.com/Chaitanyabhat08/shipthis). The repository contains the source code, including the frontend and backend code, as well as the necessary configuration files.

Please refer to the repository's README.md file for detailed instructions on running the application and any additional information.

Feel free to reach out if you have any questions or need further assistance. Enjoy using FletNix!