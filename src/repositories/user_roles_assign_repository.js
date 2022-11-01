import {user_roles_assign} from '../models';
import BaseRepository from '../shared/base-repository';


class UserRolesAssignRepository extends BaseRepository {
    constructor() {
       super(user_roles_assign);
    }
}

module.exports = UserRolesAssignRepository;