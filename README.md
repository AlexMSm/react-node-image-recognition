# react-express-image-recognition

Source Code of Image Recognition App for this [YouTube video](https://youtu.be/YZTlxyTXcug)

<img src="./thumbnail.png" width="320" height="180" />

## Running the App

### Backend

DO THIS IN THE ROOT FOLDER

```
npm install
npm run start:dev ** didn't work for me - I ran the app.js manually using 'run without debugging'
```

Backend server will run on localhost:8080

-

### Add .env file -- IGNORE THIS, I have left mine in there

- Create a .env file inside the root folder -- ignore this
- In .env file add in CLARIFAI_KEY=<your_clairifai_key>, you can get a key by registing an account at https://www.clarifai.com/

### Frontend

```
cd frontend
npm install
npm run start
```

Frontend app will run on localhost:3000

Click 'capture photo' then 'submit'
