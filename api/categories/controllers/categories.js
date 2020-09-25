'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find() {
    const entities = await strapi.services.categories.find();
    const sanitizedEntities = entities.map(entity => cleanCategory(sanitizeEntity(entity, { model: strapi.models.categories })));
    const parentCategories = sanitizedEntities.filter(entity => entity.parentCategory === null);
    return parentCategories.map((category) => {
      const childCategories = sanitizedEntities.filter((entity) => {
        if(entity.parentCategory) {
          return entity.parentCategory.id === category.id;
        }

        return false;
      }).map(childCategory => ({
        ...childCategory,
        parentCategory: undefined
      }));

      return {
        ...category,
        parentCategory: undefined,
        childCategories,
      }
    })
  }
};

const cleanCategory = category => ({
  ...category,
  created_by: undefined,
  updated_by: undefined,
  created_at: undefined,
  updated_at: undefined,
  products: undefined
})
