const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Ingredient extends Model {
    static associate(models) {
      Ingredient.belongsTo(models.Recepy, { foreignKey: 'recepyId' });
    }
  }

  Ingredient.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: connection,
    tableName: 'ingredients', 
  });

  return Ingredient;
};
