const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Helper function to find the highest lowercase alphabet
function findHighestLowercaseAlphabet(alphabetArray) {
    let highest = '';
    alphabetArray.forEach(char => {
        if (char >= 'a' && char <= 'z') {
            if (char > highest) {
                highest = char;
            }
        }
    });
    return highest ? [highest] : [];
}

// POST method endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input data"
        });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = findHighestLowercaseAlphabet(alphabets);

    // Response structure
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",  // Modify this to dynamically generate based on your logic if needed
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.status(200).json(response);
});

// GET method endpoint for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
