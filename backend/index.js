const express = require('express');
const meetingsRoutes = require('./routes/meetings');
const app = express();
const port = 8000;

app.use(express.json());

app.use('/meetings', meetingsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
