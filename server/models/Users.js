module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("Users",{
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false
        },
    })
    User.associate = (models) => {
        User.hasMany(models.Likes, {
          onDelete: "cascade",
        });
      };

    return User;
}