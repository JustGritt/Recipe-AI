const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Recepy extends Model {
    static associate(models) {
        Recepy.hasMany(models.Ingredient, { foreignKey: 'recepyId' });
    }
  }

  Recepy.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    saison: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize: connection,
    tableName: 'recepies',
  });

  return Recepy;
};