const sequelizePaginate = require('sequelize-paginate');

module.exports= (sequelize,DataTypes) => {
    const clientInfo=sequelize.define("client_info",{
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
          type:DataTypes.INTEGER,
          allowNull:true
          },
        c_id: {
          type:DataTypes.INTEGER,
          allowNull:true
          },

        first_name: {
            type: DataTypes.STRING(250),
            allowNull: false
          },
        last_name: {
            type: DataTypes.STRING(250),
            allowNull: false
          },
          
        email: {
            type: DataTypes.STRING(250),
            allowNull: false
          },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('current_timestamp')
          },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('current_timestamp')
          },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
          },
        created_by: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
          },
        updated_by: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
          }
    },
    {
      indexes: [
        {
          name: 'client_info_index',
          using: 'BTREE',
          fields: ['id']
        }
      ],
      tableName: 'client_info',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    })

    clientInfo.associate = function (models) {
      clientInfo.hasOne(models.client_property_info, {
        foreignKey: 'client_id',
        as: 'clientPropertyInfo'
      });
      
      clientInfo.hasOne(models.client_renvo_calculate_info, {
        foreignKey: 'client_id',
        as: 'clientRenvoCalculateInfo'
      });

      clientInfo.hasOne(models.client_budget_info, {
        foreignKey: 'client_id',
        as: 'clientBudgetInfo'
      });

      clientInfo.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'agent'
      });
    
    }

    sequelizePaginate.paginate(clientInfo);

    return clientInfo;
}
