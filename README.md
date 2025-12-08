# Reelio
**Social Media App For Movie Reviews** 

<img width="1899" height="868" alt="home" src="https://github.com/user-attachments/assets/e3740381-1cc8-48e4-8248-8f739754cef9" />


## Overview
Reelio is a frontend application built as a part of the graduation project Integrated with Backend and TMDB API. A social platform that allows users to rate movies, write reviews, create lists and search for movies while also allowing them to interact with a community of like-minded movie enthusiasts by following them, liking and commenting on their reviews.


## Features
- SignUp & Login & Onboarding Forms.
- Share Posts(Reviews) and Rate Movies.
- Like/Unlike Posts(Reviews).
- Suggest Users/Movies.
- Follow/Unfollow Users.
- Bookmark Reviews.
- Create a list for Favourite Movies.
- Comment on Posts(Reviews).
- Search for any movie.
- Notifications & Activity pages.
- Profile Page For Each User.
- Update/Edit Profile Page.
- Responsive Design to fit all screens with Modern UIUX.
- Implemented scalable and maintainable reusable components.

## Tech stack
- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- shadCN
- Redux Toolkit for state management + RTK Query for handling API calls and caching
- Zod for validations
- React-Hook-Form
- UploadThing for image hosting



## Getting Started

  

To run this project you must setup php server (Backend) using Laragon
clone this repo and start it
https://github.com/AmirHafez33/Relioo

then follow this steps to run Frontend:

1. Clone the repo

  

```bash

git clone https://github.com/AhmedElmarghany/Reelio.git

cd reelio

```

  

2. Install dependencies

  

```bash

npm install

```

  

3. Setup environment variables .env.local

  

```env


UPLOADTHING_TOKEN = "your uploadThing token"

NEXT_PUBLIC_TMDB_BASE_URL = https://api.themoviedb.org/3

NEXT_PUBLIC_TMDB_API_KEY = "your tmdb api key"

NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN = "your tmdb token"

PHP_API_BASE = http://localhost/Relioo/api

NEXT_PUBLIC_CLIENT_BASE = http://localhost:3000/api


```

4. Run dev server

  

```bash

npm run dev

```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

