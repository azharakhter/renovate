
import * as models from '../models';
import {
    Helper,
    Http
} from '../shared';
import { generateMessages } from '../utils/generate-message';
import bcrypt  from "bcryptjs";

class ClientService extends Helper {

    constructor(
        clientInfoRepository,
        clientBudgetInfoRepository,
        clientPaymentsRepository,
        clientPropertyInfoRepository,
        clientRenvoCalculatorInfoRepository,
        userRepository,
        renvateStatusRepository,
        docusmentsRepository
    ) {
        super();
        this._repo = clientInfoRepository;
        this._clientBudgetInfoRepo = clientBudgetInfoRepository;
        this._clientPaymentsRepo = clientPaymentsRepository;
        this._clientPropertyInfoRepo = clientPropertyInfoRepository;
        this._clientCalulatorInfoRepo = clientRenvoCalculatorInfoRepository;
        this._userRepo=userRepository;
        this._renvateStatusRepo=renvateStatusRepository;
        this._docusmentsRepo=docusmentsRepository;
        this._http = Http;
    }

    // get clientInfo
    async getClientInfo(query) {
        let {
            page, 
            per_page, 
            order, 
            order_by: orderBy, 
            paginate, 
            agent_id:agentId
        } = query;

        const include = [
            {
                model: models.client_budget_info,
                as: 'clientBudgetInfo',
                attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                required: false,
                where: { deleted_at: null },

            },
            {
                model: models.client_property_info,
                as: 'clientPropertyInfo',
                attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                required: false,
                where: { deleted_at: null },
            },
            
            {
                model: models.client_renvo_calculate_info,
                as: 'clientRenvoCalculateInfo',
                attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                required: false,
                where: { deleted_at: null },
            },


        ]

        if (paginate === "true") {

            const { docs, pages, total } = await this._repo.getPaginatedRecords(this._repo, page ? page : 1, per_page ? per_page : 10, order, orderBy, true, {user_id:agentId}, include);

            return {
                data: {
                    docs: this.shallowCopy(docs),
                    page: pages,
                    total: total    
                }
                
            }

        }
        return this.shallowCopy(await this._repo.findAll({ deleted_at: null }, { include }));

    }

    // get single client info
    async getSingleClientInfo(query) {
        const {
            id: clientId,
        } = query;

        const includeClause = {
            include: [
                {
                    model: models.client_budget_info,
                    as: 'clientBudgetInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },

                },
                {
                    model: models.client_property_info,
                    as: 'clientPropertyInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },

                },
                
                {
                    model: models.client_renvo_calculate_info,
                    as: 'clientRenvoCalculateInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },
                },
            ]
        };
        if (clientId) {
            const clientInfo = this.shallowCopy(await this._repo.findOne({ id: clientId, deleted_at: null }, { ...includeClause }));
            if (!clientInfo && !Object.keys(clientInfo)) {
                return {
                    status_code: 404,
                    error_message: "client form doest not exist..."
                }

            }

            return clientInfo;
        }
        return this.shallowCopy(await this._repo.findAll({ deleted_at: null }, { ...includeClause }));
    }

     // post client propertyInfo & client form
    async clientPropertyInfo(data, _transaction) {
   
        const {
            client_info: clientInfo,
            client_budget_info: clientBudgetInfo,
            client_property_info: clientPropertyInfo,
            agent_id,
            password
        } = data;
        
        
        // email check find client also have account 
        const checkEmail = this.shallowCopy(await this._userRepo.findOne({ email: clientInfo.email, deleted_at: null }));
        
        if (checkEmail && Object.keys(checkEmail)) {
                return {
                    status_code: 404,
                    error_message: "This email already found in you account"
                }

            }
        
        const encryptionPassword=bcrypt.hashSync(password ? password : "123");

        const user = this.shallowCopy(await this._userRepo.create({ name:clientInfo.first_name,email:clientInfo.email,is_active:1,user_role_id:3,password:encryptionPassword,created_by: agent_id, created_at: new Date() }, _transaction));
      
        const newClient = this.shallowCopy(await this._repo.create({ ...clientInfo, user_id: agent_id,c_id:user.id, created_by: agent_id, created_at: new Date() }, _transaction));
    
        if (!newClient && !Object.keys(newClient) && !user && !Object.keys(user)) {
            return {
                status_code: 404,
                error_message: "Some interal Issue please try again later"
            }
        }

        const newClientBudgetInfo = this.shallowCopy(await this._clientBudgetInfoRepo.create({ ...clientBudgetInfo, client_id: newClient.id, created_by: agent_id, created_at: new Date() }, _transaction));
   
        const newClientPropertyInfo = this.shallowCopy(await this._clientPropertyInfoRepo.create({ ...clientPropertyInfo, client_id: newClient.id, createds_by: agent_id, created_at: new Date() }, _transaction));

        return {
            data: {
                client: {
                    ...newClient,
                    ...newClientBudgetInfo,
                    ...newClientPropertyInfo
                },
            },
            message: "Your form are submitted thank you for precious time ",
            status_code: 200,
        }

    }

    // calcultor renvoate info post
    async clientRenvateInfo(data) {

        const {
            client_id,
            ...otherAttributies
        } = data;
        
        if (client_id) {

            const clientExist = await this._repo.findOne({ id: client_id, deleted_at: null });

            if (!clientExist && Object.keys(!clientExist)) {
                return {
                    status_code: 404,
                    error_message: "client does not exist in our system"
                }

            }

            let homeRenvateCalculateValue = this.shallowCopy(await this._clientCalulatorInfoRepo.create({ ...otherAttributies,status_id:1, client_id: client_id, createds_by: 1, created_at: new Date() }));
       
            return {
                result: {
                    ...homeRenvateCalculateValue
                },
                status_code: 200,
                message:"calcultore value are saved "
            }

        }
        return {
            status_code: 404,
            error_message: "client id does not provider"
        }

    }
    async uploadFiles(req) {
        const {user_id,name,category,image_url_small} =req;
        const {files} = req.body;

        if(!files){
            return {
                status:404,
                message:"some internal issue please try again"
            }
        }

     const filesDate=files.map((file)=>{
            return {
              user_id:user_id ? user_id : 1,
              name:file.filename,
              category:category ? category : "docs",
              image_url:file?.path,
              image_url_small:image_url_small ? image_url_small : "",
              created_by: user_id ? user_id : 1,
            }
        })


        await this.shallowCopy(await this._docusmentsRepo.bulkCreate(filesDate, transaction));

        
        return {
              data:[],
              status:200,
              message:"Files are uploaded successfully"
        };
        
     
    }

 
    // single client calcultore value from info 
    async getclientRenvateInfoSingle(query) {
        const {
            id: clientId,   
        } = query;

        const includeClause = {
            include: [
                {
                    model: models.client_info,
                    as: 'client',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },
                    include:[
                        {
                            model: models.client_budget_info,
                            as: 'clientBudgetInfo',
                            attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                            required: false,
                            where: { deleted_at: null },
        
                        },
                        {
                            model: models.client_property_info,
                            as: 'clientPropertyInfo',
                            attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                            required: false,
                            where: { deleted_at: null },
        
                        },
                        
                 ],

                },
                {
                    model: models.renvate_status,
                    as: 'renvateStatus',
                    required: false,
                },


                
            ]
        };


        if (clientId) {

            const clientExist = await this._repo.findOne({ id: clientId, deleted_at: null });
          
            if (!clientExist && Object.keys(!clientExist)) {
                return {
                    status_code: 404,
                    error_message: "client does not exist in our system"
                }

            }

            const clientRenoCalculInfo = this.shallowCopy(await this._clientCalulatorInfoRepo.findOne({ client_id: clientId, deleted_at: null }, { ...includeClause }));
          
            if (!clientRenoCalculInfo && Object.keys(!clientRenoCalculInfo)) {
                return {
                    status_code: 404,
                    error_message: "No Calulcation found againt this client"
                }

            }
            return {
                result:clientRenoCalculInfo,
                status:200,
            }
        }
        
        return this.shallowCopy(await this._clientCalulatorInfoRepo.findAll({ deleted_at: null }, { ...includeClause }));
    }
    async getclientRenvateInfoSingle1(query) {
        const {
            id: clientId,   
        } = query;

        const includeClause = {
            include: [
                {
                    model: models.client_budget_info,
                    as: 'clientBudgetInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },

                },
                {
                    model: models.client_property_info,
                    as: 'clientPropertyInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },

                },
                
                {
                    model: models.user,
                    as: 'agent',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at','password','user_role_id','is_active'] },
                    required: false,
                    where: { deleted_at: null },
                },
                {
                    model: models.client_renvo_calculate_info,
                    as: 'clientRenvoCalculateInfo',
                    attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                    required: false,
                    where: { deleted_at: null },
                    include:[
                        {
                            model: models.renvate_status,
                            as: 'renvateStatus',
                            required: false,
                        },        
                    ]

                },
            ]   
        };

        if (clientId) {

            const clientExist = await this._repo.findOne({ c_id: clientId, deleted_at: null },{...includeClause});
          
            if (!clientExist && Object.keys(!clientExist)) {
                return {
                    status_code: 404,
                    error_message: "client does not exist in our system"
                }

            }

            return {
                result:this.shallowCopy(clientExist),
                status:200,
            } 

        }
        
        return this.shallowCopy(await this._repo.findAll({ deleted_at: null }, { ...includeClause }));
    }

    // list all calcultore value from info with pagination
    async getclientRenvateInfo(query) {
        
        let {
            page, 
            per_page, 
            order, 
            order_by,
            paginate,
            agent_id:agentId
        } = query;

        const include = [
            {
                model: models.client_info,
                as: 'client',
                attributes: { exclude: ['updated_by', 'created_by', 'created_at', 'updated_at', 'deleted_at'] },
                required: true,
                where: { deleted_at: null,user_id:agentId },
            },
            {
                model: models.renvate_status,
                as: 'renvateStatus',
                required: false,
            },
        ]

        if (paginate === "true") {
            const { docs, pages, total } = this.shallowCopy( await this._clientCalulatorInfoRepo.getPaginatedRecords(this._clientCalulatorInfoRepo, page ? page : 1, per_page ? per_page : 10, order, order_by, null, null, include));    
            return {
                data: 
                {
                docs: docs,
                page: pages,
                total: total
                }
                
            }
        }
    try{
        return this.shallowCopy(await this._clientCalulatorInfoRepo.findAll({ deleted_at: null }, { include }));
        
    }catch(e){
      console.log("E",e)
    }

        
    }

    // update the calculty value of single client
    async getclientRenvateInfoUpdate(body,transactionForCreation) {
        let {
            id,
            client_id:clientId,
            renvate_info:renvateInfo
        } = body;


        if (clientId && id) {
            const clientExist = await this._repo.findOne({ id: clientId, deleted_at: null });
            
            if (!clientExist && Object.keys(!clientExist)) {
                return {
                    status_code: 404,
                    error_message: "client does not exist in our system"
                }

            }
            
            const clientRenoCalculInfo = this.shallowCopy(await this._clientCalulatorInfoRepo.findOne({id:id, client_id: clientId, deleted_at: null }));
            

            
            if (!clientRenoCalculInfo && Object.keys(!clientRenoCalculInfo)) {
                return {
                    status_code: 404,
                    error_message: "No Calulcation found againt this client"
                }

            }
        
            return this.shallowCopy(await this._clientCalulatorInfoRepo.update(clientRenoCalculInfo.id, {...renvateInfo} ,transactionForCreation));;
            
            
        }

    }

    

}


module.exports = ClientService;