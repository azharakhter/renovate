import {client_info} from '../models';
import BaseRepository from '../shared/base-repository';


class ClientInfoRepository extends BaseRepository {
    constructor() {
       super(client_info);
    }
}

module.exports = ClientInfoRepository;