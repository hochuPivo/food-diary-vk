import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { products } from '../../constants';

export const useDiary = (userId) => {
  //данные для разных приемов пищи
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  });
  
  //состояние модальных окон
  const [modalState, setModalState] = useState({
    selectModalOpen: false,
    addWeightModalOpen: false,
    editWeightModalOpen: false,
    productCardOpen: false
  });
  
  const [alertOpen, setAlertOpen] = useState(false);
  
  //поиск и выбор продуктов
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMeal, setCurrentMeal] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productWeight, setProductWeight] = useState(100);
  const [editingItem, setEditingItem] = useState(null);
  
  //удаление
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemNameToDelete, setItemNameToDelete] = useState('');
  const [itemMealToDelete, setItemMealToDelete] = useState('');

  //загрузка данных из VK Storage
  useEffect(() => {
    if (userId) {
      loadFromStorage();
    }
  }, [userId]);

  const loadFromStorage = async () => {
    try {
      const data = await bridge.send('VKWebAppStorageGet', {
        keys: [`meals_${userId}`, `lastDate_${userId}`]
      });
      
      const mealsData = data.keys.find(k => k.key === `meals_${userId}`)?.value;
      const lastDateData = data.keys.find(k => k.key === `lastDate_${userId}`)?.value;
      
      const today = new Date().toLocaleDateString('ru-RU');
      
      //если сегодня новый день - обнуляем
      if (lastDateData !== today) {
        const emptyMeals = {
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: []
        };
        setMeals(emptyMeals);
        await bridge.send('VKWebAppStorageSet', {
          key: `meals_${userId}`,
          value: JSON.stringify(emptyMeals)
        });
        await bridge.send('VKWebAppStorageSet', {
          key: `lastDate_${userId}`,
          value: today
        });
      } else if (mealsData) {
        setMeals(JSON.parse(mealsData));
      }
    } catch (error) {
      console.error('ошибка загрузки:', error);
    }
  };

  //сохранение данных в VK Storage
  const saveToStorage = async (newMeals) => {
    try {
      await bridge.send('VKWebAppStorageSet', {
        key: `meals_${userId}`,
        value: JSON.stringify(newMeals)
      });
    } catch (error) {
      console.error('ошибка сохранения:', error);
    }
  };

  //добавление продукта
  const addProductWithWeight = async () => {
    if (!selectedProduct || !currentMeal) return;
    
    const ratio = productWeight / 100;
    const newItem = {
      ...selectedProduct,
      id: Date.now(),
      weight: productWeight,
      calories: Math.round(selectedProduct.calories * ratio),
      protein: Math.round(selectedProduct.protein * ratio * 10) / 10,
      fat: Math.round(selectedProduct.fat * ratio * 10) / 10,
      carbs: Math.round(selectedProduct.carbs * ratio * 10) / 10
    };
    
    const newMeals = {
      ...meals,
      [currentMeal]: [...meals[currentMeal], newItem]
    };
    
    setMeals(newMeals);
    await saveToStorage(newMeals);
    
    setModalState(prev => ({ ...prev, addWeightModalOpen: false }));
    setSelectedProduct(null);
    setProductWeight(100);
    setCurrentMeal('');
  };

  //обновление веса продукта
  const updateProductWeight = async () => {
    if (!editingItem) return;
    
    const baseProduct = products.find(p => p.name === editingItem.name);
    if (!baseProduct) return;
    
    const ratio = productWeight / 100;
    const updatedItem = {
      ...editingItem,
      weight: productWeight,
      calories: Math.round(baseProduct.calories * ratio),
      protein: Math.round(baseProduct.protein * ratio * 10) / 10,
      fat: Math.round(baseProduct.fat * ratio * 10) / 10,
      carbs: Math.round(baseProduct.carbs * ratio * 10) / 10
    };
    
    let newMeals = { ...meals };
    
    for (const mealType of Object.keys(meals)) {
      if (meals[mealType].some(item => item.id === editingItem.id)) {
        newMeals = {
          ...meals,
          [mealType]: meals[mealType].map(item => 
            item.id === editingItem.id ? updatedItem : item
          )
        };
        break;
      }
    }
    
    setMeals(newMeals);
    await saveToStorage(newMeals);
    
    setModalState(prev => ({ ...prev, editWeightModalOpen: false }));
    setEditingItem(null);
    setProductWeight(100);
  };

  //подтверждение удаления
  const confirmDelete = async () => {
    if (itemToDelete) {
      let newMeals = { ...meals };
      
      for (const mealType of Object.keys(meals)) {
        if (meals[mealType].some(item => item.id === itemToDelete)) {
          newMeals = {
            ...meals,
            [mealType]: meals[mealType].filter(item => item.id !== itemToDelete)
          };
          break;
        }
      }
      
      setMeals(newMeals);
      await saveToStorage(newMeals);
      
      setItemToDelete(null);
      setItemNameToDelete('');
      setItemMealToDelete('');
      setAlertOpen(false);
    }
  };

  //открыть добавление продукта
  const openAddProduct = (mealType) => {
    setCurrentMeal(mealType);
    setSelectedProduct(null);
    setEditingItem(null);
    setModalState(prev => ({ ...prev, selectModalOpen: true }));
  };

  //открыть редактирование
  const openEditProduct = (item) => {
    setEditingItem(item);
    setProductWeight(item.weight);
    setModalState(prev => ({ ...prev, editWeightModalOpen: true }));
  };

  //открыть удаление
  const openDeleteAlert = (item, mealName) => {
    setItemToDelete(item.id);
    setItemNameToDelete(item.name);
    setItemMealToDelete(mealName);
    setAlertOpen(true);
  };

  //закрытие модальных окон
  const closeModal = (type) => {
    if (type === 'select') {
      setModalState(prev => ({ ...prev, selectModalOpen: false }));
      setSearchQuery('');
    } else if (type === 'addWeight') {
      setModalState(prev => ({ ...prev, addWeightModalOpen: false }));
      setSelectedProduct(null);
      setProductWeight(100);
    } else if (type === 'editWeight') {
      setModalState(prev => ({ ...prev, editWeightModalOpen: false }));
      setEditingItem(null);
      setProductWeight(100);
    }
  };

  //выбор продукта
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setModalState(prev => ({ 
      ...prev, 
      selectModalOpen: false, 
      addWeightModalOpen: true 
    }));
    setSearchQuery('');
  };

  //возврат к выбору продукта
  const handleBackToSelect = () => {
    setModalState(prev => ({ 
      ...prev, 
      addWeightModalOpen: false, 
      selectModalOpen: true 
    }));
    setProductWeight(100);
  };

  //подсчет общих калорий за день
  const totalCalories = Object.values(meals).reduce(
    (sum, meal) => sum + meal.reduce((mealSum, item) => mealSum + item.calories, 0), 
    0
  );

  return {
    meals,
    modalState,
    setModalState,
    alertOpen, setAlertOpen,
    searchQuery, setSearchQuery,
    productWeight, setProductWeight,
    editingItem,
    itemNameToDelete,
    itemMealToDelete,
    totalCalories,
    addProductWithWeight,
    updateProductWeight,
    confirmDelete,
    openAddProduct,
    openEditProduct,
    openDeleteAlert,
    closeModal,
    handleProductSelect,
    handleBackToSelect
  };
};