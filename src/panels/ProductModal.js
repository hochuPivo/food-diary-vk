import React from 'react';
import { ModalRoot, ModalCard, FormItem, Input, Button, Text, Flex, Box, Avatar } from '@vkontakte/vkui';
import { kbjuLetters } from '../constants';
import { ProductCardItem } from './ProductCard';

export const ProductModal = ({ 
  modalState,
  onClose,
  searchQuery,
  onSearchChange,
  products,
  onProductSelect,
  productWeight,
  onWeightChange,
  onAddProduct,
  onBackToSelect,
  editingItem,
  selectedProduct,
  onShowProductCard,
  onCloseProductCard
}) => {
  const { selectModalOpen, addWeightModalOpen, editWeightModalOpen, productCardOpen } = modalState;

  //сортируем продукты по алфавиту
  const sortedProducts = [...products].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <ModalRoot activeModal={
      selectModalOpen ? 'select' : 
      addWeightModalOpen ? 'addWeight' :
      editWeightModalOpen ? 'editWeight' :
      productCardOpen ? 'productCard' : null
    }>
      {/*окно выбора продукта - используем ProductCardItem*/}
      <ModalCard
        id="select"
        onClose={() => onClose('select')}
        header="Выберите продукт"
      >
        <FormItem top="Поиск">
          <Input 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
        </FormItem>
        
        <Box style={{ marginTop: 16, maxHeight: 400, overflowY: 'auto' }}>
          {sortedProducts
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(product => (
              <ProductCardItem
                key={product.id}
                product={product}
                onClick={() => onProductSelect(product)}
                isSelected={selectedProduct?.id === product.id}
              />
            ))}
        </Box>
      </ModalCard>

      {/*карточка продукта - детальная информация*/}
      <ModalCard
        id="productCard"
        onClose={onCloseProductCard}
        header={selectedProduct?.name}
      >
        <Avatar size={150} src={selectedProduct?.image} style={{ margin: '0 auto 16px auto' }} />
        
        <Text weight="2" style={{ textAlign: 'center', marginBottom: 8 }}>{selectedProduct?.name}</Text>
        
        <Text style={{ marginBottom: 16, textAlign: 'center' }}>{selectedProduct?.description}</Text>
        
        <Box style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <Text weight="2" style={{ textAlign: 'center', marginBottom: 8 }}>Пищевая ценность на 100г</Text>
          <Flex justify="space-around">
            <Box style={{ textAlign: 'center' }}>
              <Text weight="2" style={{ color: kbjuLetters.calories.color }}>{kbjuLetters.calories.letter}</Text>
              <Text style={{ color: '#666' }}>{selectedProduct?.calories}</Text>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <Text weight="2" style={{ color: kbjuLetters.protein.color }}>{kbjuLetters.protein.letter}</Text>
              <Text style={{ color: '#666' }}>{selectedProduct?.protein}г</Text>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <Text weight="2" style={{ color: kbjuLetters.fat.color }}>{kbjuLetters.fat.letter}</Text>
              <Text style={{ color: '#666' }}>{selectedProduct?.fat}г</Text>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <Text weight="2" style={{ color: kbjuLetters.carbs.color }}>{kbjuLetters.carbs.letter}</Text>
              <Text style={{ color: '#666' }}>{selectedProduct?.carbs}г</Text>
            </Box>
          </Flex>
        </Box>
      </ModalCard>

      {/*остальные окна без изменений...*/}
      <ModalCard
        id="addWeight"
        onClose={() => onClose('addWeight')}
        header="Укажите вес"
      >
        <FormItem top="Вес (граммы)">
          <Input 
            type="number"
            value={productWeight}
            onChange={(e) => onWeightChange(e.target.value)}
            min={1}
            max={1000}
          />
        </FormItem>
        
        <Flex gap="m" style={{ marginTop: 16 }}>
          <Button stretched onClick={onAddProduct}>
            Добавить
          </Button>
          <Button 
            mode="secondary" 
            stretched 
            onClick={onBackToSelect}
          >
            Назад
          </Button>
        </Flex>
      </ModalCard>

      <ModalCard
        id="editWeight"
        onClose={() => onClose('editWeight')}
        header="Изменить вес"
      >
        <FormItem top="Вес (граммы)">
          <Input 
            type="number"
            value={productWeight}
            onChange={(e) => onWeightChange(e.target.value)}
            min={1}
            max={1000}
          />
        </FormItem>
        
        <Flex gap="m" style={{ marginTop: 16 }}>
          <Button stretched onClick={onAddProduct}>
            Сохранить
          </Button>
          <Button 
            mode="secondary" 
            stretched 
            onClick={() => onClose('editWeight')}
          >
            Отмена
          </Button>
        </Flex>
      </ModalCard>
    </ModalRoot>
  );
};