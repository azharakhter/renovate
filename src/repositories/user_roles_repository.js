import {user_role} from '../models';
import BaseRepository from '../shared/base-repository';


class UserRolesRepository extends BaseRepository {
    constructor() {
       super(user_role);
    }
}

module.exports = UserRolesRepository;