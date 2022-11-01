import { ClientService } from '../services';
import {
    sequelize
} from '../models';


class ClientController {

    constructor() {
        this._service = ClientService;
    }

    async getClientInfo(req, res, next) {
        try {

            const { query } = req;
            const response = await this._service.getClientInfo(query);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    
    async getclientRenvateInfoSingle(req, res, next) {
        try {

            const { query } = req;
            const response = await this._service.getclientRenvateInfoSingle(query);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    async getclientRenvateInfoSingle1(req, res, next) {
        try {

            const { query } = req;
            const response = await this._service.getclientRenvateInfoSingle1(query);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    
    
    async getclientRenvateInfo(req, res, next) {
        try {

            const { query } = req;
            const response = await this._service.getclientRenvateInfo(query);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }



    async getSingleClientInfo(req, res, next) {
        try {
            const { query } = req;

            const response = await this._service.getSingleClientInfo(query);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    
    async clientRenvateInfo(req, res, next) {
        try {
            const { body } = req;

            const response = await this._service.clientRenvateInfo(body);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    
    async uploadFiles(req, res, next) {
        try {
            const { body } = req;

            const response = await this._service.uploadFiles(body);
            res.send(response);

        } catch (err) {
            next(err);

        }
    }
    
    async getclientRenvateInfoUpdate(req, res, next) {
       try{
        const _transactionForCreation = await sequelize.transaction();
            
        try {
            const { body } = req;

            const response = await this._service.getclientRenvateInfoUpdate(body,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);

        } catch (err) {
            next(err);

        }
        

       }catch (err){
        await _transactionForCreation.rollback();
            
        next(err);

       }
        
    }

    

    async clientPropertyInfo(req, res, next) {
        try {
            const _transactionForCreation = await sequelize.transaction();
            
            try {
                const { body } = req;

                const response = await this._service.clientPropertyInfo(body,_transactionForCreation);
                await _transactionForCreation.commit();
                res.send(response);

            } catch (err) {
                next(err);

            }
        } catch (err) {
            await _transactionForCreation.rollback();
            
            next(err);


        }
    }
}

module.exports = ClientController;