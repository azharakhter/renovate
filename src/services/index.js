import * as repositories from "../repositories";

/**
 * import other services
 */
import ClientService from "./client_services";
import UserService from "./users_services";

module.exports = {
  ClientService: new ClientService(
    repositories.clientInfoRepository,
    repositories.clientBudgetInfoRepository,
    repositories.clientPaymentsRepository,
    repositories.clientPropertyInfoRepository,
    repositories.clientRenvoCalculatorInfoRepository,
    repositories.userRepository,
    repositories.renvateStatusRepository,
    repositories.docusmentsRepository

  ),
  UserService: new UserService(
    repositories.userRepository,
    repositories.userRolesRepository,
    repositories.userRolesAssignRepository,
    repositories.userPaymentsRepository
  ),
};
