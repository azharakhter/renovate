import express  from 'express';

/**
 * import other routes of module
 */
import clientRouter from './client_route';
import userRouter from './user_route';



const router = express.Router();


router.use('/client',clientRouter);
router.use('/user',userRouter);



module.exports = router;

