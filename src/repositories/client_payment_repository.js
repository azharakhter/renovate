import { client_payments } from  '../models';
import BaseRepository from '../shared/base-repository';


class ClientPaymentsRepository extends BaseRepository {
    
    constructor() {
       super(client_payments);
    }
    
}

module.exports = ClientPaymentsRepository;