const express = require("express");
const { Client } = require('pg');
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'crud_operation',
    password: 'postgres',
    port: 5432,
});

db.connect();

// List User details  ========
app.get("/api/user", (req, res) => {
    db.query("SELECT * FROM master_user", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    })
});


// Create User Details ===============
app.post("/api/user", async (req, res) => {
    const { name, email, mobile, city } = req.body;
    // const [name, email, mobile, city] = req.body;
    try {
        const maxRes = await db.query("SELECT COALESCE(MAX(u_id), 0) + 1 AS next_id FROM master_user");
        const nextId = maxRes.rows[0].next_id;

        const insertRes = await db.query(
            "INSERT INTO master_user (u_id, u_name, u_email, u_mobile, u_city) VALUES ($1, $2, $3, $4, $5) RETURNING *"
            , [nextId, name, email, mobile, city]
        );
        res.status(201).json(insertRes.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User by id =========================
app.get("/api/user/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM master_user WHERE u_id = $1", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});