
module.exports= (sequelize,DataTypes) =>  {
    const dcouments = sequelize.define(
      "dcouments",
      {
        id: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
            type:DataTypes.INTEGER,
            allowNull:true
        },    
        name: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        category: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        status: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        image_url: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        image_url_small: {
          type: DataTypes.STRING(250),
          allowNull: true
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
            name: "dcouments_index",
            using: "BTREE",
            fields: ["id"],
          },
        ],
        tableName: "dcouments",
        timestamps: true,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
      }
    );
    dcouments.associate = function (models) {
  
    dcouments.hasOne(models.client_renvo_calculate_info, {
      foreignKey: 'status_id',
      as: 'clientRenvoCalculateInfo'
      });
    
    }
  
  
    return dcouments;
  };
  