module.exports= (sequelize,DataTypes) => {
    const user=sequelize.define("user",{
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
        email: {
            type: DataTypes.STRING(250),
            allowNull: false
          },
        is_active: {
          type:DataTypes.INTEGER,
          allowNull:true
          },
        user_role_id: {
            type: DataTypes.INTEGER(255),
            allowNull: true,
            references: {
              model: 'user_role',
              key: 'id'
            }
          },
          
        password: {
            type:DataTypes.INTEGER,
            allowNull:true
          },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
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
          name: 'user_index',
          using: 'BTREE',
          fields: ['id']
        }
      ],
      tableName: 'user',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    });

    user.associate = function (models) {
    

      user.hasMany(models.client_info, {
        foreignKey: 'user_id',
        as: 'clientsInfo'
      });
    }  
    return user;
}
