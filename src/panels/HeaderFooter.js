import React from 'react';
import { PanelHeader, Tabbar, TabbarItem } from '@vkontakte/vkui';
import {
  Icon28Profile,
  Icon28HomeOutline,
  Icon28ListOutline
} from '@vkontakte/icons';

export const Header = ({ title }) => {
  return <PanelHeader>{title}</PanelHeader>;
};

export const Footer = ({ activeStory, onStoryChange }) => {
  return (
    <Tabbar>
      <TabbarItem
        onClick={() => onStoryChange('profile')}
        selected={activeStory === 'profile'}
        text="Профиль"
      >
        <Icon28Profile />
      </TabbarItem>
      <TabbarItem
        onClick={() => onStoryChange('diary')}
        selected={activeStory === 'diary'}
        text="Дневник"
      >
        <Icon28HomeOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onStoryChange('products')}
        selected={activeStory === 'products'}
        text="Справочник"
      >
        <Icon28ListOutline />
      </TabbarItem>
    </Tabbar>
  );
};