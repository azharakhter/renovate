import * as models from '.';
const sequelizePaginate = require('sequelize-paginate');
module.exports= (sequelize,DataTypes) => {
  const clientPropertyInfo = sequelize.define(
    "client_property_info",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
      },
      
      pro_address: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      pro_other_address: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      move_in_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }, 
      time_frame: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      other_dec_maker: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      pro_type: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      bedrooms_type: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      pro_conditions: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      other_question: {
        type: DataTypes.STRING(250),
        allowNull: true,
      }, 
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
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
          name: "client_property_info_index",
          using: "BTREE",
          fields: ["id"],
        },
      ],
      tableName: "client_property_info",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  clientPropertyInfo.associate = function (models) {
  clientPropertyInfo.belongsTo(models.client_info, {
    foreignKey: 'client_id',
    as: 'client'
  });
}  


sequelizePaginate.paginate(clientPropertyInfo);
  return clientPropertyInfo;
};
