const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const JWT_SECRET = 'ekerheim_super_secret_key_2026';

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../web/public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Serve the uploads folder globally so GitHub pages can fetch your local images
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const db = new sqlite3.Database('./projects.db', (err) => {
  if (err) console.error("Could not connect to database", err);
  else console.log("Connected to SQLite database");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    images TEXT, 
    location TEXT,
    area TEXT,
    scope TEXT,
    year TEXT,
    status TEXT DEFAULT 'completed'
  )`);

  // Try to add status column if it doesn't exist (for existing DBs)
  db.run(`ALTER TABLE projects ADD COLUMN status TEXT DEFAULT 'completed'`, (err) => {
    // Ignore error if column already exists
  });

  // Insert default admin if not exists
  db.get(`SELECT * FROM admin WHERE username = ?`, ['admin'], (err, row) => {
    if (!row) {
      bcrypt.hash('password123', 10, (err, hash) => {
        db.run(`INSERT INTO admin (username, password) VALUES (?, ?)`, ['admin', hash]);
      });
    }
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM admin WHERE username = ?`, [username], (err, admin) => {
    if (err || !admin) return res.status(401).json({ error: "Invalid credentials" });

    bcrypt.compare(password, admin.password, (err, result) => {
      if (!result) return res.status(401).json({ error: "Invalid credentials" });
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    });
  });
});

// Image Upload API (Protected)
app.post('/api/upload', authenticateToken, upload.array('images', 10), (req, res) => {
  try {
    const urls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Projects API (Public Read)
app.get('/api/projects', (req, res) => {
  db.all(`SELECT * FROM projects`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const processed = rows.map(r => {
      const parsedImgs = JSON.parse(r.images || '[]');
      return { ...r, images: parsedImgs };
    });
    res.json(processed);
  });
});

// Projects API (Protected Write)
app.post('/api/projects', authenticateToken, (req, res) => {
  const { name, description, images, location, area, scope, year, status } = req.body;
  const imgs = JSON.stringify(images || []);
  const projectStatus = status || 'completed';
  db.run(`INSERT INTO projects (name, description, images, location, area, scope, year, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [name, description, imgs, location, area, scope, year, projectStatus], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, description, images, location, area, scope, year, status: projectStatus });
  });
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const { name, description, images, location, area, scope, year, status } = req.body;
  const imgs = JSON.stringify(images || []);
  const projectStatus = status || 'completed';
  db.run(`UPDATE projects SET name = ?, description = ?, images = ?, location = ?, area = ?, scope = ?, year = ?, status = ? WHERE id = ?`,
    [name, description, imgs, location, area, scope, year, projectStatus, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
  });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  db.run(`DELETE FROM projects WHERE id = ?`, req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
