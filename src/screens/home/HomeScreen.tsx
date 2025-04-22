import React, {useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import {
  Tabs,
  WhiteSpace,
  WingBlank,
  Card,
} from '@ant-design/react-native';
import {useThemeStore, selectTheme} from '../../store/zustand';
import TodoExample from '../../components/examples/TodoExample';
import {ThemeExampleComponent} from '../../components/common';

const HomeScreen: React.FC = () => {
  const {antColors} = useThemeStore(selectTheme);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {title: 'Theme'},
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ThemeExampleComponent/>;
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: antColors.fill_body}]}>
      <WhiteSpace size="lg"/>

      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="Zustand + Immer Examples"
            extra={<Text style={{color: antColors.color_link}}>State Management</Text>}
          />
          <Card.Body>
            <Text style={{color: antColors.color_text_base, padding: 10}}>
              These examples showcase how to use Zustand with Immer for state management in React Native.
              Browse through the tabs to see different implementations.
            </Text>
          </Card.Body>
        </Card>
      </WingBlank>

      <WhiteSpace size="lg"/>

      <Tabs
        tabs={tabs}
        page={activeTab}
        onChange={(tab, index) => setActiveTab(index)}
        tabBarBackgroundColor={antColors.fill_base}
        tabBarActiveTextColor={antColors.brand_primary}
        tabBarInactiveTextColor={antColors.color_text_secondary}
        tabBarUnderlineStyle={{backgroundColor: antColors.brand_primary}}
      />

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen;
