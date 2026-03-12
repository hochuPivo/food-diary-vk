import React, { useState } from 'react';
import { 
  Epic,
  View,
  Panel,
  Alert
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';

//импорт констант
import { products, mealTitles, genderOptions } from './constants';

//импорт компонентов
import { Header, Footer } from './panels/HeaderFooter';
import { ProfilePanel } from './panels/ProfilePanel';
import { DiaryPanel } from './panels/DiaryPanel';
import { ProductsPanel } from './panels/ProductsPanel';
import { ProductModal } from './panels/ProductModal';

//импорт функций
import { useDiary } from './utils/functions/useDiary';

export const App = () => {
  const [activeStory, setActiveStory] = useState('profile');
  const [user, setUser] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  //данные профиля
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('female');
  const [norm, setNorm] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  });

  //хук с логикой дневника питания
  const {
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
  } = useDiary(user?.id);

  //получение данных пользователя VK
  React.useEffect(() => {
    bridge.send('VKWebAppGetUserInfo').then(data => {
      setUser(data);
    });
  }, []);

  //сохранение профиля в storage
  const saveProfileToStorage = async () => {
    if (!user?.id) return;
    const profileData = { weight, height, age, gender, norm };
    await bridge.send('VKWebAppStorageSet', {
      key: `profile_${user.id}`,
      value: JSON.stringify(profileData)
    });
  };

  //загрузка профиля из storage
  const loadProfileFromStorage = async () => {
    if (!user?.id) return;
    const data = await bridge.send('VKWebAppStorageGet', {
      keys: [`profile_${user.id}`]
    });
    const profileData = data.keys.find(k => k.key === `profile_${user.id}`)?.value;
    if (profileData) {
      const parsed = JSON.parse(profileData);
      setWeight(parsed.weight);
      setHeight(parsed.height);
      setAge(parsed.age);
      setGender(parsed.gender);
      setNorm(parsed.norm);
    }
  };

  //загрузка профиля при получении пользователя
  React.useEffect(() => {
    if (user) {
      loadProfileFromStorage();
    }
  }, [user]);

  //сохранение профиля при изменении параметров
  React.useEffect(() => {
    if (user) {
      saveProfileToStorage();
    }
  }, [weight, height, age, gender, norm]);

  //расчет нормы калорий
  React.useEffect(() => {
    const weightNum = Number(weight) || 0;
    const heightNum = Number(height) || 0;
    const ageNum = Number(age) || 0;
    
    if (weightNum && heightNum && ageNum) {
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
      } else {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
      }
      const calories = Math.round(bmr * 1.55);
      
      setNorm({
        calories: calories,
        protein: Math.round(weightNum * 1.5),
        fat: Math.round(weightNum * 1),
        carbs: Math.round((calories - weightNum*1.5*4 - weightNum*1*9) / 4)
      });
    }
  }, [weight, height, age, gender]);

  //функции для карточки продукта
  const openProductCard = (product) => {
    setSelectedProduct(product);
    setModalState(prev => ({ ...prev, productCardOpen: true }));
  };

  const closeProductCard = () => {
    setModalState(prev => ({ ...prev, productCardOpen: false }));
    setSelectedProduct(null);
  };

  //alert подтверждения удаления
  const deleteAlert = (
    <Alert
      actions={[
        {
          title: 'Удалить',
          mode: 'destructive',
          action: confirmDelete
        },
        {
          title: 'Отмена',
          mode: 'cancel',
          action: () => setAlertOpen(false)
        }
      ]}
      actionsLayout="horizontal"
      onClose={() => setAlertOpen(false)}
      title="Подтверждение"
      description={`Удалить ${itemNameToDelete} из ${itemMealToDelete}?`}
    />
  );

  return (
    <>
      <Epic 
        activeStory={activeStory} 
        tabbar={<Footer activeStory={activeStory} onStoryChange={setActiveStory} />}
      >
        <View id="profile" activePanel="profile">
          <Panel id="profile">
            <Header title="Профиль" />
            <ProfilePanel 
              user={user}
              weight={weight} setWeight={setWeight}
              height={height} setHeight={setHeight}
              age={age} setAge={setAge}
              gender={gender} setGender={setGender}
              norm={norm}
              genderOptions={genderOptions}
            />
          </Panel>
        </View>

        <View id="diary" activePanel="diary">
          <Panel id="diary">
            <Header title="Дневник питания" />
            <DiaryPanel 
              meals={meals}
              norm={norm}
              totalCalories={totalCalories}
              mealTitles={mealTitles}
              onAddProduct={openAddProduct}
              onEditProduct={openEditProduct}
              onDeleteProduct={openDeleteAlert}
            />
          </Panel>
        </View>

        <View id="products" activePanel="products">
          <Panel id="products">
            <Header title="Справочник продуктов" />
            <ProductsPanel 
              products={products}
              searchQuery={productSearch}
              setSearchQuery={setProductSearch}
              onProductClick={openProductCard}
              selectedProductId={selectedProduct?.id}
            />
          </Panel>
        </View>
      </Epic>

      <ProductModal 
        modalState={modalState}
        onClose={closeModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onProductSelect={handleProductSelect}
        productWeight={productWeight}
        onWeightChange={setProductWeight}
        onAddProduct={editingItem ? updateProductWeight : addProductWithWeight}
        onBackToSelect={handleBackToSelect}
        editingItem={editingItem}
        selectedProduct={selectedProduct}
        onShowProductCard={(product) => {
          setSelectedProduct(product);
          setModalState(prev => ({ ...prev, productCardOpen: true }));
        }}
        onCloseProductCard={closeProductCard}
      />

      {alertOpen && deleteAlert}
    </>
  );
};