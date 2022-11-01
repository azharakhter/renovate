
module.exports= (sequelize,DataTypes) =>  {
  const renvateStatus = sequelize.define(
    "renvate_status",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
    },
    {
      indexes: [
        {
          name: "renvate_status_index",
          using: "BTREE",
          fields: ["id"],
        },
      ],
      tableName: "renvate_status",
      timestamps: true,
      paranoid: false,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  renvateStatus.associate = function (models) {

    renvateStatus.hasOne(models.client_renvo_calculate_info, {
    foreignKey: 'status_id',
    as: 'clientRenvoCalculateInfo'
    });
  
  }


  return renvateStatus;
};
