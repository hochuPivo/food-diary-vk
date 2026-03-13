import React from 'react';
import { Group, Flex, Box } from '@vkontakte/vkui';
import { ProgressBars } from './ProgressBars';
import { MealCard } from './MealCard';

export const DiaryPanel = ({ 
  meals, //объект с приемами пищи
  norm, //нормы кбжу на день
  totalCalories, //общие калории за день
  mealTitles, //названия приемов пищи
  onAddProduct, //функция добавления
  onEditProduct, //функция редактирования
  onDeleteProduct //функция удаления
}) => {
  //считаем суммарные белки за день
  const totalProtein = Object.values(meals).reduce((sum, meal) => 
    sum + meal.reduce((mealSum, item) => mealSum + item.protein, 0), 0
  );
  //считаем суммарные жиры за день
  const totalFat = Object.values(meals).reduce((sum, meal) => 
    sum + meal.reduce((mealSum, item) => mealSum + item.fat, 0), 0
  );
  //считаем суммарные углеводы за день
  const totalCarbs = Object.values(meals).reduce((sum, meal) => 
    sum + meal.reduce((mealSum, item) => mealSum + item.carbs, 0), 0
  );

  //собираем все итоги для прогресс-баров
  const totals = {
    totalCalories,
    totalProtein,
    totalFat,
    totalCarbs
  };

  return (
    <Group style={{ padding: 16 }}>
      <ProgressBars totals={totals} norm={norm} />
      
      <Flex direction="column" gap="m" style={{ marginTop: 16 }}>
        {/*проходим по всем приемам пищи (завтрак, обед, ужин, перекус)*/}
        {Object.entries(meals).map(([mealType, items]) => (
          <MealCard
            key={mealType}
            mealType={mealType}
            title={mealTitles[mealType]}
            items={items}
            onAdd={onAddProduct}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
            mealTitles={mealTitles}
          />
        ))}
      </Flex>
    </Group>
  );
};