import React from 'react';
import { Card, Text, Progress, Box, Flex } from '@vkontakte/vkui';
import { kbjuLetters } from '../constants';

export const ProgressBars = ({ totals, norm }) => {
  const { totalCalories, totalProtein, totalFat, totalCarbs } = totals;

  return (
    <Card>
      <Box padding="l">
        <Text weight="2">Прогресс дня</Text>
        
        {/*калории*/}
        <Box style={{ marginTop: 16, marginBottom: 12 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
            <Text>Калории</Text>
            <Text>{totalCalories} / {norm.calories}</Text>
          </Flex>
          <Progress 
            value={norm.calories ? (totalCalories / norm.calories) * 100 : 0} 
            appearance="#ff8c00"
            height={8}
          />
        </Box>

        {/*белки*/}
        <Box style={{ marginBottom: 12 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
            <Text>Белки</Text>
            <Text>{totalProtein.toFixed(1)} / {norm.protein} г</Text>
          </Flex>
          <Progress 
            value={norm.protein ? (totalProtein / norm.protein) * 100 : 0} 
            appearance="#4caf50"
            height={8}
          />
        </Box>

        {/*жиры*/}
        <Box style={{ marginBottom: 12 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
            <Text>Жиры</Text>
            <Text>{totalFat.toFixed(1)} / {norm.fat} г</Text>
          </Flex>
          <Progress 
            value={norm.fat ? (totalFat / norm.fat) * 100 : 0} 
            appearance="#ffc107"
            height={8}
          />
        </Box>

        {/*углеводы*/}
        <Box style={{ marginBottom: 12 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
            <Text>Углеводы</Text>
            <Text>{totalCarbs.toFixed(1)} / {norm.carbs} г</Text>
          </Flex>
          <Progress 
            value={norm.carbs ? (totalCarbs / norm.carbs) * 100 : 0} 
            appearance="#2196f3"
            height={8}
          />
        </Box>
      </Box>
    </Card>
  );
};