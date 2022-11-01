import { dcouments } from  '../models';
import BaseRepository from '../shared/base-repository';


class DocusmentsRepository  extends BaseRepository {
   
    constructor() {
       super(dcouments);
    }
}

module.exports = DocusmentsRepository;