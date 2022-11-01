import {UserService} from '../services';
import {
    sequelize
} from '../models';
class UserController {

    constructor() {
        this._service=UserService;
    }

    async userRegister(req,res,next) {
        try{
            const _transactionForCreation = await sequelize.transaction();
        try {
            const { body }=req;
       
            const response=await this._service.userRegister(body,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);
       
        } catch(err) {
            next(err);
        }
       }catch(err) {
        await _transactionForCreation.rollback();
        next(err);
       }
    }
    
    async userRegisterPlan(req,res,next) {
        try{
            const _transactionForCreation = await sequelize.transaction();
        try {
            const { body }=req;
            console.log("here contoller ",body)
       
            const response=await this._service.userRegisterPlan(body,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);
       
        } catch(err) {
            next(err);
        }
       }catch(err) {
        await _transactionForCreation.rollback();
        next(err);
       }
    }
    
    async userCheckoutSession(req,res,next) {
        try{
            const _transactionForCreation = await sequelize.transaction();
        try {
     
            const response=await this._service.userCheckoutSession(req,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);
       
        } catch(err) {
            next(err);
        }
       }catch(err) {
        await _transactionForCreation.rollback();
        next(err);
       }
    }


    async userLogin(req,res,next) {
        try {
            const { body }=req;
       
            const response=await this._service.userLogin(body);
            
            res.send(response);
       
        } catch(err) {
            next(err);
        }
        
    }
    
    async sendMail(req,res,next) {
        try{
            const _transactionForCreation = await sequelize.transaction();
        try {
            const { body }=req;
       
            const response=await this._service.sendMail(body,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);
       
        } catch(err) {
            next(err);
        }
        
       }catch(err) {
        await _transactionForCreation.rollback();
        next(err);
       }
    }
    
    async payments(req,res,next) {
        try{
            const _transactionForCreation = await sequelize.transaction();
        try {
            const { body }=req;
       
            const response=await this._service.payments(body,_transactionForCreation);
            await _transactionForCreation.commit();
            res.send(response);
       
        } catch(err) {
            next(err);
        }
        
       }catch(err) {
        await _transactionForCreation.rollback();
        next(err);
       }
    }

    
}

module.exports=UserController;