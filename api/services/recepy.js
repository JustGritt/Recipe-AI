const { Recepy, Ingredient } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Recepy.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
      include: [{ model: Ingredient, as: 'Ingredients' }],
    });
  },
  findById: async function (id) {
    return Recepy.findByPk(id, {
      include: [{ model: Ingredient, as: 'Ingredients' }],
    });
  },
  create: async function (data) {
    try {
      return await Recepy.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, recepies = []] = await Recepy.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, recepies);
      return recepies;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Recepy.destroy({
      where: criteria,
    });
  },
};