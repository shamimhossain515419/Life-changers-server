const express = require('express')
const cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.soyhs2b.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});
async function run() {

     // Connect the client to the server	(optional starting in v4.7)
     await client.connect();

     const UserCollection = client.db("LifeChangers").collection("Users");
     const PostJobCollection = client.db("LifeChangers").collection("PostJob");
     const LoanCollection = client.db("LifeChangers").collection("Loan");
     const FeedbackCollection = client.db("LifeChangers").collection("feedback");
     const applyJobCollection = client.db("LifeChangers").collection("applyJob");


     // UserCollection  related api 
     app.post('/users', async (res, req) => {
          const body = req.body;
          const result = await UserCollection.insertOne(body);
          res.send(result);
     })

     app.get('/users', async (req, res) => {
          const email = { email: req.query.email };
          const result = await UserCollection.findOne(email);
          res.send(result)

     })
     app.get('/users', async (req, res) => {
          const result = await UserCollection.find().toArray();
          res.send(result)

     })

     app.patch('/users-update', async (req, res) => {
          const updateUser = req.body;
          const filter = { id: new ObjectId(res.query.id) }
          const users = await UserCollection.findOne(filter);
          const updateDoc = {
               $set: {
                    email: updateUser.email ? updateUser.email : users?.email,
                    name: updateUser.name ? updateUser.name : users?.name,
                    address: updateUser.address ? updateUser.address : users?.address,
                    country: updateUser.country ? updateUser.country : users?.country,
                    phone: updateUser.phone ? updateUser.phone : users?.phone,
                    post: updateUser.post ? updateUser.post : users?.post,
                    loan: updateUser.loan ? updateUser.loan : users?.loan,
                    money: updateUser.money ? updateUser.money : users?.money,
                    NID: updateUser.NID ? updateUser.NID : users?.NID,
                    loanStatus: updateUser.loanStatus ? updateUser.loanStatus : users?.loanStatus,
                    paidLoan: updateUser.paidLoan ? updateUser.paidLoan : users?.paidLoan,
                    account: updateUser.account ? updateUser.account : users?.account,
                    interest: updateUser.interest ? updateUser.interest : users?.interest,

               }
          };
          const result = await UserCollection.updateOne(filter, updateDoc);
          res.send(result)
     })

     // PostJobCollection related api 
     app.post('/post-jobs', async (res, req) => {
          const body = req.body;
          const result = await PostJobCollection.insertOne(body);
          res.send(result);
     })

     app.get('/post-jobs-by-id', async (res, req) => {
          const id = req.query.id;
          const result = await PostJobCollection.findOne(id);
          res.send(result);
     })

     app.delete('/delete-by-post-id', async (res, req) => {
          const id = { id: new ObjectId(res.query.id) }
          const result = await PostJobCollection.deleteOne(id);
          res.send(result)
     })
     app.put('/update-by-post-id', async (res, req) => {
          const updatepost = req.body;
          const filter = { id: new ObjectId(res.query.id) }
          const job = await PostJobCollection.findOne(filter);
          const updateDoc = {
               $set: {
                    name: updatepost.name ? updatepost.name : job?.name,
                    description: updatepost.description ? updatepost.description : job?.description,
                    image: updatepost.image ? updatepost.image : job?.image,
                    level: updatepost.level ? updatepost.level : job?.level,
                    salary: updatepost.salary ? updatepost.salary : job?.salary,
                    skills: updatepost.skills ? updatepost.skills : job?.skills,
                    location: updatepost.location ? updatepost.location : job?.location,
                    experience: updatepost.experience ? updatepost.experience : job?.experience,
               }
          };
          const result = await PostJobCollection.updateOne(filter, updateDoc);
          res.send(result)
     })


     // LoanCollection related api 
     app.post('/apply', async (res, req) => {
          const body = req.body;
          const result = await LoanCollection.insertOne(body);
          res.send(result);
     });

     app.delete('/apply-delete', async (res, req) => {
          const id = { id: new ObjectId(res.query.id) }
          const result = await PostJobCollection.deleteOne(id);
          res.send(result)
     })

     // applyJobCollection   related api  ;

     app.post('apply-job', async (res, req) => {
          const body = req.body;
          const result = await applyJobCollection.insertOne(body);
          res.send(result);
     });
     app.patch('/apply-job-update', async (res, req) => {
          const updateApply = req.body;
          const filter = { id: new ObjectId(res.query.id) }
          const apply = await applyJobCollection.findOne(filter);
          const updateDoc = {
               $set: {
                    name: updateApply.name ? updateApply.name : apply?.name,
                    description: updateApply.description ? updateApply.description : apply?.description,
                    resume: updateApply.resume ? updateApply.resume : apply?.resume,

               }
          };
          const result = await applyJobCollection.updateOne(filter, updateDoc);
          res.send(result)
     })


     // FeedbackCollection   related api  
     app.post('/feedback', async (res, req) => {
          const body = req.body;
          const result = await FeedbackCollection.insertOne(body);
          res.send(result);
     });
     app.get('/feedback', async (res, req) => {
          const result = await FeedbackCollection.find(body).toArray();
          res.send(result);
     })



     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);


app.get('/', function (req, res,) {
     res.send("hello world")
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})