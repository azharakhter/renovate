
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import httpLogs from 'morgan';
import xss from 'xss-clean';
import dotenv from 'dotenv';
import db from './config/db';
import cors from 'cors';
import timeout from 'connect-timeout'; //express v4
import routes from './routes/routes';
const path = require('path');



/**
 * authenticate Database connection
 */
db.authenticate()
  .then(()=>console.log('%s Database connected successfully!'))
  .catch((error)=>{
    console.error('Database authentication error...');
    process.exit();
  })


/**
 * load env file 
 */

dotenv.config({path:".env"});

/**
 * create express server
 */
const app = express();

app.use(express.static(path.join(__dirname, './public')));


  /**
 * Timeout confg
 */
// app.use(timeout(12000000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
  }

/**
 * express configuration
 */
app.set('host',process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0')
app.set('port',process.env.PORT || 8080);
app.use(httpLogs('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(helmet());
app.use(xss());



/**
 * CORS enable 
 * */
 app.use(cors());

/**
 * Routes.
 */
 app.use('/api', routes);
 app.post("/webhook", async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});


const server=http.createServer(app);



server.listen(app.get('port'),()=>{
    console.log('%App is running at http://localhost:%d in %s mode',app.get('port'));
    console.log('Press CTRL-C to stop\n');
})


