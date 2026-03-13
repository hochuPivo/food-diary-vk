import React from 'react';
import { Card, Text, Flex } from '@vkontakte/vkui';
import { kbjuLetters } from '../constants';

export const ProductCardItem = ({ product, onClick, isSelected }) => {
  return (
    <Card 
      onClick={onClick}
      style={{ 
        cursor: 'pointer', 
        marginBottom: 8, 
        padding: 12
      }}
    >
      <Text weight="2" style={{ marginBottom: 8 }}>{product.name}</Text>
      <Flex gap={16} style={{ marginTop: 4 }}>
        <Flex gap={8} align="center">
          <Text style={{ fontSize: 12, color: kbjuLetters.calories.color }}>{kbjuLetters.calories.letter}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{product.calories}</Text>
        </Flex>
        <Flex gap={8} align="center">
          <Text style={{ fontSize: 12, color: kbjuLetters.protein.color }}>{kbjuLetters.protein.letter}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{product.protein}</Text>
        </Flex>
        <Flex gap={8} align="center">
          <Text style={{ fontSize: 12, color: kbjuLetters.fat.color }}>{kbjuLetters.fat.letter}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{product.fat}</Text>
        </Flex>
        <Flex gap={8} align="center">
          <Text style={{ fontSize: 12, color: kbjuLetters.carbs.color }}>{kbjuLetters.carbs.letter}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{product.carbs}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};