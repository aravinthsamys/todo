require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI || `mongodb+srv://captcha486:indian2@cluster0.rnpikpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// TODO Schema and Model
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Add TODO API
app.post('/api/todos', (req, res) => {
    const newTodo = new Todo({
        title: req.body.title
    });

    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json({ error: 'Unable to add this todo' }));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
