const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const port = 3000;


const db = new sqlite3.Database('dev.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
        "It is never too late to be what you might have been. - George Eliot",
        "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
    ];

    const stmt = db.prepare("INSERT INTO quotes (text) VALUES (?)");
    quotes.forEach(quote => {
        stmt.run(quote);
    });
    stmt.finalize();
});

const app = express();

app.get('/quotes', (req, res) => {
    db.all("SELECT * FROM quotes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/quotes/random', (req, res) => {
    db.all("SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
});