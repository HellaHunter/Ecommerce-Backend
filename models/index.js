// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, 
  {foreignKey: 'category_id'},
  {onDelete: 'cascade'}
);

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, 
  { through: ProductTag }, 
  { onDelete: "cascade" }
);

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
