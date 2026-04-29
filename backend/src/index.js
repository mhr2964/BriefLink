const { createApp } = require('./app');

const DEFAULT_PORT = 3000;
const parsedPort = Number.parseInt(process.env.PORT || '', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : DEFAULT_PORT;

const app = createApp();

app.listen(port, () => {
  console.log(`BriefLink backend listening on port ${port}`);
});