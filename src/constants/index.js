import productsData from './products.json';

//продукты из JSON-файла
export const products = productsData;

//заголовки приемов пищи
export const mealTitles = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус'
};

//выбор пола
export const genderOptions = [
  { label: 'Женский', value: 'female' },
  { label: 'Мужской', value: 'male' }
];

//буквы КБЖУ
export const kbjuLetters = {
  calories: { letter: 'К', color: '#ff8c00' },
  protein: { letter: 'Б', color: '#4caf50' },
  fat: { letter: 'Ж', color: '#ffc107' },
  carbs: { letter: 'У', color: '#2196f3' }
};