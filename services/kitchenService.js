const recipes = [
  { id: 1, name: 'Spaghetti Carbonara', ingredients: ['spaghetti', 'eggs', 'bacon', 'cheese'] },
  { id: 2, name: 'Tomato Soup', ingredients: ['tomato', 'onion', 'garlic', 'cream'] }
];

function getRecipes() {
  return recipes;
}

module.exports = {
  getRecipes
};
