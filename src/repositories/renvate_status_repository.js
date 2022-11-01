import { renvate_status } from  '../models';
import BaseRepository from '../shared/base-repository';

console.log("reb",renvate_status)
class RenvateStatusRepository extends BaseRepository {
   
    constructor() {
       super(renvate_status);
    }
}

module.exports = RenvateStatusRepository;