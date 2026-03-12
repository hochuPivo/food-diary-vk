import React from 'react';
import { Card, Text, Button, IconButton, Box, Flex } from '@vkontakte/vkui';
import { Icon28AddOutline, Icon28DeleteOutline, Icon28EditOutline } from '@vkontakte/icons';

export const MealCard = ({ 
  mealType, 
  title, 
  items, 
  onAdd, 
  onEdit, 
  onDelete,
  mealTitles 
}) => {
  return (
    <Card>
      <Box padding="l">
        <Flex justify="space-between" marginBottom="m">
          <Text weight="2">{title}</Text>
          <Text>{items.reduce((sum, item) => sum + item.calories, 0)} ккал</Text>
        </Flex>
        
        {items.length === 0 ? (
          <Text style={{ color: '#999', padding: '8px 0' }}>Нет записей</Text>
        ) : (
          items.map(item => (
            <Flex key={item.id} justify="space-between" align="center" marginBottom="s" style={{ 
              padding: '8px 0',
              borderBottom: '1px dashed #ddd'
            }}>
              <Box>
                <Text weight="2">{item.name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {item.weight}г | {item.calories} ккал | Б:{item.protein} Ж:{item.fat} У:{item.carbs}
                </Text>
              </Box>
              <Flex gap="l">
                <IconButton 
                  style={{ color: '#2688eb' }}
                  onClick={() => onEdit(item)}
                >
                  <Icon28EditOutline width={20} height={20} />
                </IconButton>
                <IconButton 
                  style={{ color: '#e64646' }}
                  onClick={() => onDelete(item, mealTitles[mealType].replace('🍳 ', '').replace('🍱 ', '').replace('🍽 ', '').replace('🍪 ', ''))}
                >
                  <Icon28DeleteOutline width={20} height={20} />
                </IconButton>
              </Flex>
            </Flex>
          ))
        )}
        
        <Button 
          mode="secondary" 
          stretched 
          before={<Icon28AddOutline />}
          onClick={() => onAdd(mealType)}
          style={{ marginTop: 12 }}
        >
          Добавить продукт
        </Button>
      </Box>
    </Card>
  );
};