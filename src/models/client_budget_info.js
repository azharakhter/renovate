const sequelizePaginate = require('sequelize-paginate');
module.exports= (sequelize,DataTypes) =>  {
  const clientBudgetInfo = sequelize.define(
    "client_budget_info",
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
      pre_approve_amount: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },  
      price_range: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      down_payment: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      up_front_budget: {
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
          name: "client_budget_info_index",
          using: "BTREE",
          fields: ["id"],
        },
      ],
      tableName: "client_budget_info",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  clientBudgetInfo.associate = function (models) {

    clientBudgetInfo.belongsTo(models.client_info, {
    foreignKey: 'client_id',
    as: 'client'
    });
  
  }

  sequelizePaginate.paginate(clientBudgetInfo);

  return clientBudgetInfo;
};
