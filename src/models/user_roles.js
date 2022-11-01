module.exports= (sequelize,DataTypes) => {
    const user_roles=sequelize.define("user_role",{
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
          name: 'user_role_index',
          using: 'BTREE',
          fields: ['id']
        }
      ],
      tableName: 'user_role',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    });
    user_roles.associate = function (models) {
      user_roles.hasOne(models.user, {
        foreignKey: 'user_role_id',
        as: 'user'
      });
    }  

    return user_roles;
}
