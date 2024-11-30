const express = require('express');
const bodyParser = require('body-parser');

const orderRoutes = require('./routes/orders');
const routeRoutes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

app.use('/orders', orderRoutes);
app.use('/routes', routeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});