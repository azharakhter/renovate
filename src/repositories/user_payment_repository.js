import { user_payments } from  '../models';
import BaseRepository from '../shared/base-repository';


class UserPaymentsRepository extends BaseRepository {
   
    constructor() {
       super(user_payments);
    }
}

module.exports = UserPaymentsRepository;