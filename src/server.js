// Assuming you have Express installed
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001; // Choose a port for your server

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Adjust the origin as needed
}));

// Endpoint to handle submission of new projects
app.post('/api/projects', (req, res) => {
    const { title, description, budget } = req.body;

    // Read existing projects from project.json file
    let projects = [];
    try {
        projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));
    } catch (error) {
        console.error('Error reading projects.json file:', error);
        return res.status(500).json({ message: 'Error submitting new project' });
    }

    // Add new project to the projects array
    const newProject = { title, description, budget };

    projects.push(newProject);

    // Write updated projects array back to project.json file
    try {
        fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projects, null, 2));
        res.status(200).json({ message: 'New project submitted successfully' });
    } catch (error) {
        console.error('Error writing to projects.json file:', error);
        res.status(500).json({ message: 'Error submitting new project' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
