import { client_budget_info } from  '../models';
import BaseRepository from '../shared/base-repository';


class clientBudgetInfoRepository extends BaseRepository {
   
    constructor() {
       super(client_budget_info);
    }
}

module.exports = clientBudgetInfoRepository;