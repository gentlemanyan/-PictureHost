import app from './app';
import helper from './config/helper';

/**
 * Get port from environment and store in koa.
 */

const port = helper.normalizePort(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`success running at port ${port}`);
});
