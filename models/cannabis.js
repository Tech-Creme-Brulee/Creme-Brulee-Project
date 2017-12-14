// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our Cannabis model
module.exports = function(sequelize, DataTypes) {
  var Cannabis = sequelize.define("Cannabis", {
    // The ucpc cannot be null, and must be a proper email before creation
    ucpc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     
    }
  });

  Cannabis.associate = function(models) {
    // Associating Cannabis with Comments
    // When an Cannabis is deleted, also delete any associated Comments
    Cannabis.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
};

return Cannabis;
}