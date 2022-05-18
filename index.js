const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// using middletier
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://todo-user:lfWlplLC7qRiWKRb@cluster0.uucsy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("todolist").collection("works");

        app.get('/posts', async (req, res)=>{
            const query = {};
            const cursor = todoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})