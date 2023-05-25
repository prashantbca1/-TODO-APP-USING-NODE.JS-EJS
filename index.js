const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const  Task  = require('./models/task');

const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/tododb";
//const userModel = require('./config/mongoose');
// the set flag to false if we want to ovveride the current strictqury behavior and pre
//prare for the new elease.
mongoose.set("strictQuery", false);


mongoose.connect(mongoDB, {
},).then(() => console.log('connected'))
    .catch((err) => { console.log(err); });
/*userModel({
    name: "kaju",
    email: "payalsingh142006@gmail.com",
    mobile: 3330039478
}).save((err, db) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log(`userdata:${db}`)
    }
});
// now how to find material regadrds database data
//mongoose.set('strictQuery', true);
setTimeout(() => {
    userModel.findOne({ name: "kaju" }, (err, db) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log(`find data:${db}`)
        }
    })
},1000)*/
app.use(express.static("./views"));
// to use encrypted data
//app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back');
});


// to soleve this pb i installed "npm install mongoose@6.10.0"
app.listen(8000,()=>{
    console.log("server is running on port:8000");
})
// OUTPUT
/**server is running on port:4000
connected
userdata:{
  name: 'KAJU',
  email: 'payalsingh142006@gmail.com',
  mobile: 3330039478,
  _id: new ObjectId("643e5e89bb20464e4d8aca3f"),
  __v: 0
}
 */
