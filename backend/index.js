const express = require('express');
const authRoutes = require('./routes/auth');
const meetingsRoutes = require('./routes/meetings');
const app = express();
const port = 8000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/meetings', meetingsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
