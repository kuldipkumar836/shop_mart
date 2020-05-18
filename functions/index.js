const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const app = express();
var serviceAccount = require("./permission.json");
  var firebaseConfig = {
    apiKey: "AIzaSyCRQ27WymcsHo_hMSPgK2K7XWpeMIQHQCA",
    authDomain: "shopingzone-77ff1.firebaseapp.com",
    databaseURL: "https://shopingzone-77ff1.firebaseio.com",
    projectId: "shopingzone-77ff1",
    storageBucket: "shopingzone-77ff1.appspot.com",
    messagingSenderId: "801799086551",
    appId: "1:801799086551:web:75706387e7e7d0811f2b92",
    measurementId: "G-KJR3WEYXL2"
  };
  firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-api-9a206..firebaseio.com",

});

const db = admin.firestore();
app.use(cors({ origin:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
app.get('/helloWorld',(req,res) =>{
    return res.status(200).send('hello from firebase');
});
//
app.post('/api/file', (req, res) => {
const filename = req.files;
  console.log(filename);
  
  const bucket = admin.storage().bucket();
  const temp_filename = filename;
  const temp_filepath = path.join(os.tmpdir(), temp_filename);
   fs.outputFile(temp_filepath, req.data, {});

  // Upload.
   bucket.upload(temp_filepath, {destination: 'picture'})
    .then((val) => {retrieveUrl(temp_filename)})
    .catch((err) => {});
});
// create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
            let data = {
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                specification: req.body.specification,
                description: req.body.description
              }
          await db.collection('products').add(data)
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

  // read item
app.get('/api/read/:item_id', (req, res) => {
    (async () => {
        try {
            let response = []
            const document = db.collection('products').doc(req.params.item_id);
            let item = await document.get();
            let product = {
                     name: item.data().name,
                    price: item.data().price,
                    specification: item.data().specification,
                    quantity: item.data().quantity,
                    description: item.data().description
            };
            response.push(product);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// read all
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('products');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    specification: doc.data().specification,
                    quantity: doc.data().quantity,
                    description: doc.data().description
                };
                response.push(selectedItem);
            }
            });
             res.status(200).json(
                 response
             );
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// update
app.put('/api/update/:item_id', (req, res) => {
(async () => {
    try {
        const data ={
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            specification: req.body.specification,
            description: req.body.description
        }
        const document =  db.collection('products').doc(req.params.item_id);
        
        await document.update(data);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

// delete
app.delete('/api/delete/:item_id', (req, res) => {
(async () => {
    try {
        const document = db.collection('products').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});
// ------ user signUp ---------
app.post('/api/user/signup',(req,res) => { 
    let idToken;   
    const email = req.body.email;
    const password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    var user = firebase.auth().currentUser;
        console.log(user)
        .then({})
        .catch( error=>{
            console.log(error);
            
        })
        const document = db.collection('users').doc(user.uid);
        document.set({
           email: user.email
       })

       return res.status(200).send({
                userId: user.uid
            });
});

// ------user SignIn -------------
app.post('/api/user/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    var user ;
firebase.auth().signInWithEmailAndPassword(email, password)
 .then(  function(user){
     
    console.log(user.toJSON);
 })
        .catch( error=>{
            console.log(error);
            
        })    

});
///////////////////////// file Upload //////////////


exports.app = functions.https.onRequest(app);
/*----------------------------user-----------------------------------------*/

//  response.send("Hello from Firebase!");
// });
