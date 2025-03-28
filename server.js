const express = require('express');
const fs = require("fs");

const app = express();

app.use(express.static('Public'));
app.use(express.text());

app.post('/update', (req, res) => {
  const receivedText = req.body;
  console.log('Received tex: ', receivedText);
  res.send('Text received successfully')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.json());

// GET the database
app.get("/api/database", (req, res) => {
  fs.readFile("./Public/Data/database.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Could not read data");
    res.json(JSON.parse(data));
  });
});

// POST to update student comment on a violation
app.post("/api/violation-comment", (req, res) => {
  const { email, assignmentId, violationId, studentComment } = req.body;

  fs.readFile("./Public/Data/database.json", "utf8", (err, rawData) => {
    if (err) return res.status(500).send("Error reading file");

    const db = JSON.parse(rawData);
    const user = db.users[email];
    if (!user) return res.status(404).send("User not found");

    const violations = user.assignments[assignmentId]?.violations || [];
    const violation = violations.find(v => v.id === violationId);
    if (!violation) return res.status(404).send("Violation not found");

    console.log(`Updating comment for ${email}, assignment ${assignmentId}, violation ${violationId}`);
    violation.studentComment = studentComment;

    fs.writeFile("./Public/Data/database.json", JSON.stringify(db, null, 2), err => {
      if (err) return res.status(500).send("Failed to update");
      res.status(200).send("Comment saved");
    });
  });
});

