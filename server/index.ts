import app from './app';
import helper from './config/helper';
import config from './config/config'

const port = helper.normalizePort(process.env.PORT || config.port);

app.listen(port, () => {
  console.log(`success running at port ${port}`);
});
