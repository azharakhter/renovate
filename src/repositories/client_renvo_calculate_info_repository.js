import { client_renvo_calculate_info } from  '../models';
import BaseRepository from '../shared/base-repository';


class ClientRenvoCalculatorInfoRepository extends BaseRepository {
   
    constructor() {
       super(client_renvo_calculate_info);
    }
}

module.exports = ClientRenvoCalculatorInfoRepository;