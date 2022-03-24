// Router & Dependencies
const router = require("express").Router();
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, get, child} = require('firebase/database')


// ENV Vars
const DB_API_KEY = process.env.DB_API_KEY
const PROJECT_ID =  process.env.PROJECT_ID
const DATABASE_NAME = process.env.DATABASE_NAME
const SENDER_ID = process.env.SENDER_ID
const APP_ID = process.env.APP_ID

// firebase
const firebaseConfig = {
    apiKey: DB_API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${DATABASE_NAME}.firebaseio.com`,
    projectId: PROJECT_ID,
    storageBucket: `${PROJECT_ID}.appspot.com`,
    messagingSenderId: SENDER_ID,
    appId: APP_ID,
}

const FireApp = initializeApp(firebaseConfig);
const database = getDatabase(FireApp);

// Score Routes

router.get('/', (req, res) =>{
    const dbRef = ref(database);
    get(child(dbRef, `/jetpack_score/leaderBoard`)).then((snapshot) => {
        if (snapshot.exists()){
            res.send(`${JSON.stringify(snapshot)}`)
        }else{
            res.send('no data found')
        }
    }).catch(err => {
        res.send(`${err}`)
    })
})

router.post('/',  (req, res) => {
    const dbRef = ref(database, '/jetpack_score/leaderBoard')
    if(Object.entries(req.body).length !== 0){
        set(dbRef, req.body)
    
        console.log(req.body)
        res.send(`successfully saved`)
    }else{
        res.send('No data received')
    }
})

// export

module.exports = router