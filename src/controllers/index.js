
/**
 *  other controller import here
 */

import ClientController from './client_controller';
import UserController from './user_controller';

module.exports={
    ClientController: new ClientController(),
    UserController: new UserController()
}
