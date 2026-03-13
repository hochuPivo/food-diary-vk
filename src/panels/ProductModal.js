import React from 'react';
import { ModalRoot, ModalCard, FormItem, Input, Button, Text, Flex, Box, Image, Search } from '@vkontakte/vkui';
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
    {/*окно выбора продукта*/}
    <ModalCard
      id="select"
      onClose={() => onClose('select')}
      header="Выберите продукт"
    >
      <Search 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск продуктов..."
        noPadding
      />
  
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

      {/*окно с информацией о продукте продукта*/}
      <ModalCard
      id="productCard"
      onClose={onCloseProductCard}
      header={selectedProduct?.name}
    >
      <Box style={{ width: '100%', marginBottom: 16 }}>
        <Image
           size={300}
           src={selectedProduct?.image}
           alt={selectedProduct?.name}
           style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
           objectFit="cover"
        />
      </Box>
  
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

      {/*окно для указание веса*/}
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

      {/*окно для редактирования веса*/}
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