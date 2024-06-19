module.exports=(sequelize,DataTypes)=>{
    const Services=sequelize.define("Services",{
        icon:{
            type:DataTypes.STRING,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        body:{
            type:DataTypes.STRING,
            allowNull:false
        },
        color:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    Services.associate = (models) => {
        Services.hasMany(models.Comments, {
          onDelete: "cascade",
        });
        Services.hasMany(models.Likes, {
            onDelete: "cascade",
          });
      };
    return Services;
}