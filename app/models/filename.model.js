module.exports = (sequelize, Sequelize) => {
  const Filename = sequelize.define("filename", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fn: {
      type: Sequelize.STRING
    }
  }, {
	  indexes: [
    // Create a unique index on fn
    {
      unique: true,
      fields: ['fn']
    }],
	  tableName: 'filename', timestamps: false});

  return Filename;
};
