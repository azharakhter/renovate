

require('dotenv').config({ path: '../.env' });
const Stripe = require('stripe')(process.env.SECRET_KEY);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/checkout-single-subscription",
      version: "0.0.1",
      url: "https://github.com/stripe-samples/checkout-single-subscription"
    }
  });
  
const nodemailer = require("nodemailer");

import {
    Helper,
    Http
} from '../shared';

import jwtToken from "jsonwebtoken";
import bcrypt  from "bcryptjs";
import { configKey } from '../config/auth.config';



class UserService extends Helper {

    constructor(
        userRepository,
        userRoleRepository,
        userRolesAssignRepository,
        userPaymentsRepository
    ) {
        super();
        this._repo=userRepository;
        this._userRoleRepo=userRoleRepository;
        this._userRoleAssignRepo=userRolesAssignRepository;
        this._userPaymentsRepo=userPaymentsRepository;
      
    }

    async userRegister(data,_transaction) {
        
        const {
            name,
            email,
            password,
            user_role_id = 2,
        } = data;

       
    
          const emailExist=await this._repo.findOne({email:email,deleted_at:null});
          
          
          if(emailExist && Object.keys(emailExist)) {
            if(emailExist.is_active) {
                return {
                    status_code: 600,
                    error_message:"Email alread exist But do not have paid account",
                    data: emailExist
                }    

            }
            return {
                status_code: 404,
                error_message:"Email already Exist and have an paid account"
            }
            

             
          }

       
        const encryptionPassword=bcrypt.hashSync(password);

        const newUser = this.shallowCopy(await this._repo.create({ name:name,email:email,password:encryptionPassword,is_active:1,user_role_id:user_role_id,created_by:1, created_at:new Date()},_transaction));
        
 
        if(!user_role_id && !newUser && !Object.keys(newUser)) {
            return {
                status_code:404,
                error_message:"User Role not defined"
            }
              
        }  
        return {
            data:[],
            status:200,
            message:"User are created successfully.."
        };
        
    }
    
    async userRegisterPlan(data,_transaction) {
        const domainURL = process.env.DOMAIN;
        const { product_id_basic } = data;
        try {
            const session = await stripe.checkout.sessions.create({
              mode: "subscription",
              line_items: [
                {
                  price: product_id_basic,
                  quantity: 1,
                },
              ],
              // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
              success_url: `${domainURL}/registration/payment-success/session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${domainURL}/registration/payment-failure`,
              // automatic_tax: { enabled: true }
            });

            return  {
               session: session
              }
              
    
          } catch (e) {
            res.status(400);
            
            return {
                error: {
                    message: e.message,
                  }
                  
            }
        
          }
         
        
        
    }
    
    async userCheckoutSession(data,_transaction) {
        const { sessionId } = req.query;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.send(session);
    }



    async userLogin(data) {
     
    const {
         email,
         password
    } = data;
      

    const userExist=this.shallowCopy(await this._repo.findOne({email:email,deleted_at:null}));

    if(!userExist) {
        return {
            accessToken: null,
            message: "User Not found."
        }   
    }

    const passwordIsValid=bcrypt.compareSync(
        password,
        userExist.password
    );

    if(!passwordIsValid){
        return {
            accessToken: null,
            message: "Invalid Password!"
        }         
    }

    const token =jwtToken.sign({id:userExist.id},configKey,{
        expiresIn: 86400 
    });

    const userRole=this.shallowCopy(await this._userRoleRepo.findOne({id:userExist.user_role_id,deleted_at:null}));

    return {
        data:{
            id:userExist.id,
            name:userExist.name,
            email:userExist.email,
            roles:userRole,
            accessToken:token    
        },
        status:200,
        message:"user login sucessfully"
    }

    }

    async sendMail(data) {
    try {
        const {
            email,
            agent_id
        } = data;

       
            let transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"ayeshaazhar1010@gmail.com",
                    pass:"frbkuavwjwgglcma"
                }         
             });
        
            const agentId=agent_id ? agent_id : 1 ; 
    
           var mailOptions = {
               from: '<ayeshaazhar1010@gmail.com>', // sender address
               to: `${email}`, // list of receivers
               subject: 'Welcome! Renograte Builders',
               template: 'email', // the name of the template file i.e email.handlebars
               html: '<p>Click <a href="http://localhost:3000/renovatorForm/' + agentId + '">OPEN A LINK </a> open form </p>',
               context:{
                   name: "Adebola", // replace {{name}} with Adebola
                   company: 'My Company' // replace {{company}} with My Company
               }
           };
             
    
           // trigger the sending of the E-mail
           const result = await transporter.sendMail(mailOptions);
          
           if(result !== undefined) {
               return { 
                   status:200,
                   message:"A mail is send to client",
                   result: JSON.stringify(result.response, null, 4)
               }               
           }else {
            
              return { 
                   status:400,
                   message:"some internal issue please try again",
                   result: null
               }   
           }

        } catch(e) {
            throw e
        }
            
       
  
    }
    
    async payments(data) {
        let status, error;
        const { token, amount } = data;
        try {
          await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
          });
          status = 'success';
        } catch (error) {
          console.log(error);
          status = 'Failure';
        }
        res.json({ error, status });
            
       
  
    }

}


module.exports = UserService;