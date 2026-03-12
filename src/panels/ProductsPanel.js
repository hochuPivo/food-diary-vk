import React from 'react';
import { Group, Box, Input, Flex } from '@vkontakte/vkui';
import { ProductCardItem } from './ProductCard';

export const ProductsPanel = ({ 
  products, 
  searchQuery, 
  setSearchQuery,
  onProductClick,
  selectedProductId 
}) => {
  //сортируем продукты по алфавиту
  const sortedProducts = [...products].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const filteredProducts = sortedProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Group style={{ padding: 16 }}>
      <Box style={{ marginBottom: 16 }}>
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск продуктов..."
        />
      </Box>
      
      <Flex direction="column" gap="s">
        {filteredProducts.map(product => (
          <ProductCardItem
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
            isSelected={selectedProductId === product.id}
          />
        ))}
      </Flex>
    </Group>
  );
};