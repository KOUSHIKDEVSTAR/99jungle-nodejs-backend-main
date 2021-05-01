const QUERY_ROLES = {};

// model imports
const ROLE = require('../../models/roles');



QUERY_ROLES.findItemFromRoleTable = async (querydata) => {
    return await ROLE.find(querydata).exec();
}


QUERY_ROLES.createItemForRoleTable = async (createdata) => {
    return await ROLE.create(createdata);
}


module.exports = QUERY_ROLES;