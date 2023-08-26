const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');


const app = express();
const port = 3006;

const validCredentials = {
  admin: {
    username: 'admin',
    password: 'password123',
    isAdmin: true,
  },
  user: {
    username: 'user',
    password: 'password456',
    isAdmin: false,
  },
};


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'codebrew',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(bodyParser.json());
app.use(cors());

const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

app.use((req, _, next) => {
  log(`Incoming HTTP Request - ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  log(`Error occurred during ${req.method} request for ${req.url}: ${err.stack}`);
  res.status(500).send('Something broke!');
});

// Endpoint for customer registration (signup)
app.post('/customer/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
      if (error) {
        console.error('Error adding new user:', error);
        res.status(500).json({ status: 'Failed', error: 'Error adding new user' });
      } else {
        newUser.id = results.insertId;
        console.log(`[User Added] ${new Date().toISOString()} - Data:`, newUser);
        res.json({ status: 'Success', data: newUser });
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ status: 'Failed', error: 'Error hashing password' });
  }
});

// Endpoint for customer login
app.post('/customer/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === validCredentials.admin.email && password === validCredentials.admin.password) {
      // Admin login successful
      console.log('[Admin Login] Successful');
      res.json({ status: 'Success', token: 'your-jwt-token', isAdmin: true });
      return;
  }

  // Check if the user with the given email exists in the database
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
          console.error('Error checking user:', error);
          res.status(500).json({ status: 'Failed', error: 'Error checking user' });
      } else {
          if (results.length === 0) {
              res.status(401).json({ status: 'Failed', error: 'User not found' });
          } else {
              const user = results[0];
              const passwordMatch = await bcrypt.compare(password, user.password);

              if (!passwordMatch) {
                  res.status(401).json({ status: 'Failed', error: 'Incorrect password' });
              } else {
                  res.json({ status: 'Success', token: 'your-jwt-token', isAdmin: user.isAdmin });
              }
          }
      }
  });
});

app.get('/staff', (req, res) => {
  connection.query('SELECT * FROM staff', (error, results) => {
    if (error) {
      log('Error fetching staff data:', error);
      return res.status(500).json({ error: 'Error fetching staff data' });
    }

    log('Successfully fetched staff data from database');
    res.json(results);
  });
});

app.post('/staff', (req, res) => {
  const newStaff = req.body;
  connection.query('INSERT INTO staff SET ?', newStaff, (error, results) => {
    if (error) {
      console.error('Error adding new staff:', error);
      res.status(500).json({ error: 'Error adding new staff' });
    } else {
      newStaff.id = results.insertId;
      console.log(`[Staff Added] ${new Date().toISOString()} - Data:`, newStaff);
      res.json({ status: 'Success', data: newStaff });
    }
  });
});

app.put('/staff/:id', (req, res) => {
  const { id } = req.params;
  const updatedStaff = req.body;
  updatedStaff.id = id;

  connection.query('UPDATE staff SET ? WHERE id = ?', [updatedStaff, id], (error, results) => {
    if (error) {
      console.error(`[Database Error] ${new Date().toISOString()} - Error updating staff ID: ${id}:`, error);
      res.status(500).json({ error: 'Error updating staff' });
    } else {
      console.log(`[Staff Updated] ${new Date().toISOString()} - Data:`, updatedStaff);
      res.json({ status: 'Updated', data: updatedStaff });
    }
  });
});

app.delete('/staff/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM staff WHERE id = ?', [id], (selectError, results) => {
    if (selectError) {
      console.error(`[Database Error] ${new Date().toISOString()} - Fetching staff details for ID: ${id}`, selectError);
      res.status(500).json({ error: 'Failed to fetch staff details' });
      return;
    }

    if (results && results.length > 0) {
      const staffDetails = results[0];

      console.log(`[Staff Deleted] ${new Date().toISOString()} - Data:`, {
        name: staffDetails.name,
        email: staffDetails.email,
        phoneNumber: staffDetails.phoneNumber,
        address: staffDetails.address,
        id: staffDetails.id
      });

      connection.query('DELETE FROM staff WHERE id = ?', [id], (deleteError) => {
        if (deleteError) {
          console.error(`[Database Error] ${new Date().toISOString()} - Deleting staff ID: ${id}`, deleteError);
          res.status(500).json({ error: 'Failed to delete staff' });
          return;
        }
        res.json({ status: 'Deleted' });
      });

    } else {
      res.status(404).json({ error: 'Staff not found' });
    }
  });
});

app.get('/', (_, res) => {
  log('Root endpoint accessed');
  res.send('Hello, Express!');
});

app.listen(port, () => {
  log(`Server Running on http://localhost:${port}`);
});
