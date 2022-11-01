import { client_property_info } from  '../models';
import BaseRepository from '../shared/base-repository';


class ClientPropertyInfoRepository extends BaseRepository {
   
    constructor() {
       super(client_property_info);
    }

}

module.exports = ClientPropertyInfoRepository;