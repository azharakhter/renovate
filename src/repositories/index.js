/**
 * import repository 
 */

import ClientInfoRepository from './client_info_repository';
import clientBudgetInfoRepository from './client_budget_info_repository';
import ClientPaymentsRepository from './client_payment_repository';
import ClientPropertyInfoRepository from './client_property_info_repository';
import UserPaymentsRepository from './user_payment_repository';
import UserRepository from './user_repository';
import UserRolesRepository from './user_roles_repository';
import UserRolesAssignRepository from './user_roles_assign_repository';
import ClientRenvoCalculatorInfoRepository from './client_renvo_calculate_info_repository';
import RenvateStatusRepository from './renvate_status_repository';
import DocusmentsRepository from "./docusments_repository";

module.exports = {
    clientInfoRepository: new ClientInfoRepository(),
    clientBudgetInfoRepository: new clientBudgetInfoRepository(),
    clientPaymentsRepository: new ClientPaymentsRepository(),
    clientPropertyInfoRepository: new ClientPropertyInfoRepository(),
    userPaymentsRepository: new UserPaymentsRepository(),
    userRepository: new UserRepository(),
    userRolesRepository: new UserRolesRepository(),
    userRolesAssignRepository: new UserRolesAssignRepository(),
    clientRenvoCalculatorInfoRepository: new ClientRenvoCalculatorInfoRepository(),
    renvateStatusRepository : new RenvateStatusRepository(),
    docusmentsRepository : new DocusmentsRepository()
}