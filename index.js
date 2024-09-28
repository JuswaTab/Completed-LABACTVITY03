// Import the Express library
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const users = [];


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


app.get('/users', (req, res) => {
    console.log('GET /users endpoint was accessed');
    res.status(200).json(users);
});

// Route to handle POST requests
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;


    if (!name || name.length < 3) {
        return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
    }


    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'A valid email is required.' });
    }


    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password is required and must be at least 10 characters long.' });
    }


    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists.' });
    }

    
    
    users.push({ name, email, password });
    console.log(`POST /register endpoint was accessed ${JSON.stringify(users)}`);
    res.status(201).json({ message: 'User registered successfully' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 