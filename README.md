# Gains Over Time (GOT)

## About

I created this app to record and track my workout progression over time. I'm typically a busy person and can usually only make it to the gym 1-2 times a week. With so much time between workouts, I'd forget how much weight and how many reps I had last done. This made it difficult to progress because I couldn't push myself to surpass my previous workout. 

My solution to this problem was Gains Over Time. This app records your custom workouts and allows the user to record all of their sets and associated weight used. Users can track their workouts between exercises and see their real time progression which will hopefully give them the push they need to improve a little bit every time they go to the gym. 

This web app was designed with a mobile first mindset. It is fully responsive and will work excellently on both desktop and mobile devices. The goal was to provide users with an intuitive and visually appealing tool to record their workouts. Usability was at the forefront of my mind during development. 

## Getting Started Locally

First, clone this repo to your local machine. 

Then cd into the root project directory and run the following:

```bash
npm ci
docker-compose up -d
cp .env.sample .env #edit the new .env file with your local DB credentials
npx prisma generate
npx prisma migrate reset #seeds the db as well
npm run dev
```
