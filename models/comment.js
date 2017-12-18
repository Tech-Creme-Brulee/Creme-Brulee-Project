module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Comment.associate = function (models) {
    // We're saying that a Comment should belong to an Author
    // A Comment can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.Cannabis, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return Comment;
};