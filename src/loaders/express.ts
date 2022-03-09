import bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import '../controllers';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandler';
import { withCors } from '../middlewares/withCors';
import { withMorgan } from '../middlewares/withMorgan';
import { Ok } from '../controllers/http/200/Ok';
// import controllers from '../controllers/index';

export default ({ container }: { container: Container }) => {

  let server = new InversifyExpressServer(container);

  server.setConfig((app => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
      Ok.send(res, {});
    });
    app.head('/status', (req, res) => {
      Ok.send(res, {});
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    app.use(withMorgan);
    app.use(withCors);

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());
  }));

  server.setErrorConfig((app) => {
    app.use(notFoundHandler);
    app.use(errorHandler);
  });


  let app = server.build();

  return { app };
};
