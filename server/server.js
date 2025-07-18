const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// User Register === 
app.post(`/api/register`, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(`The vlue of registers : ${req.body}`);
    try {
        const maxSrno = await db.query("SELECT COALESCE(MAX(uinfo_srno), 0) + 1 AS next_srno FROM user_info");
        const nextSrno = maxSrno.rows[0].next_srno;
        const insertRes = await db.query("INSERT INTO user_info(uinfo_srno, uinfo_first_name, uinfo_last_name, uinfo_email, uinfo_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nextSrno, firstName, lastName, email, password]
        );
        res.status(201).json(insertRes.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// user Login === 
app.get(`api/userLogin`, (req, res) => {
    const { userEmail, userPass } = req.body;
    const fetQuery = db.query("SELECT COUNT(*) FROM user_info WHERE uinfo_email = $1, uinfo_password = $2 RETURNING *",
        [userEmail, userPass],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.rows.length !== 0) {
                result.rows[0]
            }
        }
    );
})

// List User details  ========
app.get("/api/user", (req, res) => {
    db.query("SELECT * FROM master_user ORDER BY u_id", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    })
});

// Create User Details ===============
app.post("/api/userPost", async (req, res) => {
    const { name, email, mobile, city } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        const maxRes = await db.query("SELECT COALESCE(MAX(u_id), 0) + 1 AS next_id FROM master_user");
        const nextId = maxRes.rows[0].next_id;

        const insertRes = await db.query(
            "INSERT INTO master_user (u_id, u_name, u_email, u_mobile, u_city, u_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
            , [nextId, name, email, mobile, city, imagePath]
        );
        res.status(201).json(insertRes.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User by id =========================
app.get("/api/userEdit/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM master_user WHERE u_id = $1", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    });
});

// Updating user by id =======================
app.put("/api/userUpdate/:id", (req, res) => {
    const { name, email, mobile, city } = req.body;
    const id = req.params.id;
    db.query(
        "UPDATE master_user SET u_name = $2, u_email = $3, u_mobile = $4, u_city = $5 WHERE u_id = $1 RETURNING *",
        [id, name, email, mobile, city],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

            res.status(200).json(result.rows[0]);
        }
    )
});

app.delete("/api/userDelete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM master_user WHERE u_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});