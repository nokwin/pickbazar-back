'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');

module.exports = {
  async find(ctx) {
    const entities = await strapi.services.products.find(ctx.query, ["category.parentCategory", "discount", "photos"]);
    const sanitizedEntities = entities.map(entity => cleanProduct(sanitizeEntity(entity, { model: strapi.models.products })));

    return sanitizedEntities.map(product => ({
      ...product,
      finalPrice: product.discount ? (product.price * (product.discount.amount / 100)) : product.price,
    }));
  }
};

const cleanProduct = (product) => ({
  ...product,
  category: {
    ...product.category,
    parentCategory: product.category.parentCategory ? {
      ...product.category.parentCategory,
      created_by: undefined,
      updated_by: undefined,
      created_at: undefined,
      updated_at: undefined,
      parentCategory: undefined
    } : null,
    created_by: undefined,
    updated_by: undefined,
    created_at: undefined,
    updated_at: undefined
  },
  discount: product.discount && product.discount.isEnabled ? {
    ...product.discount,
    created_by: undefined,
    updated_by: undefined,
    created_at: undefined,
    updated_at: undefined
  } : null,
  created_by: undefined,
  updated_by: undefined,
  created_at: undefined,
  updated_at: undefined,
  photos: product.photos.map(photo => ({
    ...photo,
    id: undefined,
    name: undefined,
    formats: {
      ...(_.reduce(photo.formats, (acc, val, key) => {
        return {
          ...acc,
          [key]: {
            ...val,
            name: undefined,
            ext: undefined,
            mime: undefined,
            size: undefined,
            path: undefined,
          }
        }
      }, {})),
    },
    ext: undefined,
    mime: undefined,
    size: undefined,
    previewUrl: undefined,
    provider: undefined,
    provider_metadata: undefined,
    created_by: undefined,
    updated_by: undefined,
    created_at: undefined,
    updated_at: undefined,
  }))
})
