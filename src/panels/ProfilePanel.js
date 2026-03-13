import React from 'react';
import { Group, Card, Text, FormItem, Input, Select, Box, Flex } from '@vkontakte/vkui';
import { kbjuLetters } from '../constants';

export const ProfilePanel = ({ 
  user, 
  weight, setWeight,
  height, setHeight,
  age, setAge,
  gender, setGender,
  norm,
  genderOptions 
}) => {
  return (
    <Group style={{ padding: 16 }}>
      <Flex direction="column" gap="m">
        {/*приветственная карточка*/}
        <Card>
          <Box padding="l">
            <Text weight="2">Привет, {user?.first_name || 'гость'}!</Text>
            <Text>Введите ваши параметры</Text>
          </Box>
        </Card>
        
        {/*карточка с формой*/}
        <Card>
          <Box padding="l">
            <FormItem top="Вес (кг)">
              <Input 
                type="number"
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormItem>
            
            <FormItem top="Рост (см)">
              <Input 
                type="number"
                value={height} 
                onChange={(e) => setHeight(e.target.value)}
              />
            </FormItem>
            
            <FormItem top="Возраст">
              <Input 
                type="number"
                value={age} 
                onChange={(e) => setAge(e.target.value)}
              />
            </FormItem>
            
            <FormItem top="Пол">
              <Select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                options={genderOptions}
                placeholder="Выберите пол"
              />
            </FormItem>
          </Box>
        </Card>

        {/*карточка с нормой*/}
        <Card>
          <Box padding="l">
            <Text weight="2">Ваша норма на день:</Text>
            <Flex direction="column" gap="s" style={{ marginTop: 8 }}>
              <Flex align="center" gap="s">
                <Text weight="2">Калории:</Text>
                <Text>{norm.calories} ккал</Text>
              </Flex>
              <Flex align="center" gap="s">
                <Text weight="2">Белки:</Text>
                <Text>{norm.protein} г</Text>
              </Flex>
              <Flex align="center" gap="s">
                <Text weight="2">Жиры:</Text>
                <Text>{norm.fat} г</Text>
              </Flex>
              <Flex align="center" gap="s">
                <Text weight="2">Углеводы:</Text>
                <Text>{norm.carbs} г</Text>
              </Flex>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Group>
  );
};