import {user} from '../models';
import BaseRepository from '../shared/base-repository';

console.log("user",user)
class UserRepository extends BaseRepository {
    constructor() {
       super(user);
    }
}

module.exports = UserRepository;