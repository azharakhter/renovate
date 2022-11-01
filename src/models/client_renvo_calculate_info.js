const sequelizePaginate = require('sequelize-paginate');
module.exports= (sequelize,DataTypes) =>  {
  const client_renvo_calculate_info = sequelize.define(
    "client_renvo_calculate_info",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status_id: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        references: {
          model: 'renvate_status',
          key: 'id'
        }

      },
      client_id: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        references: {
          model: 'client_info',
          key: 'id'
        }
        
      },
      current_home_value: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      after_renovated_value: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      total_acquistion_and_renovation_ratio: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      agent_commission: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      closing_fee: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      }, 
      seller_fee: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      admin_fee: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      other_fee: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      tara: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      and_mortage: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      second_mortage: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      third_mortage: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      seller_payback_program: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      seller_fee_of_mortage: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      other_fee_mortage: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      total_liens: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      renovation_allowance: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      client_signature: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      agent_signature: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          name: "client_renvo_calculate_info_index",
          using: "BTREE",
          fields: ["id"],
        },
      ],
      tableName: "client_renvo_calculate_info",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  client_renvo_calculate_info.associate = function (models) {

    client_renvo_calculate_info.belongsTo(models.client_info, {
    foreignKey: 'client_id',
    as: 'client'
    });
    
    client_renvo_calculate_info.belongsTo(models.renvate_status, {
    foreignKey: 'status_id',
    as: 'renvateStatus'
    });

  
  }

  sequelizePaginate.paginate(client_renvo_calculate_info);

  return client_renvo_calculate_info;
};
