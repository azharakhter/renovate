module.exports= (sequelize,DataTypes) => {
    const user_roles_assign=sequelize.define("user_roles_assign",{
        user_role_id: {
            type: DataTypes.STRING(250),
            allowNull: false,
            primaryKey: true,
          },
        user_id: {
            type: DataTypes.STRING(250),
            allowNull: false,
            primaryKey: true
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
          name: 'user_roles_assign',
          using: 'BTREE',
          fields: ['id']
        }
      ],
      tableName: 'user_roles_assign',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    });


    return user_roles_assign;
}
