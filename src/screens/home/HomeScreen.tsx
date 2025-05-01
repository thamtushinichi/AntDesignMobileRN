import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {
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

  // Đơn giản hóa tabs
  const tabs = [
    {title: 'Theme'},
    {title: 'Todo Example'},
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ThemeExampleComponent/>;
      case 1:
        return <TodoExample/>;
      default:
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

      {/* Tự tạo custom tab bar thay vì dùng component Tabs */}
      <View style={styles.customTabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                {color: activeTab === index ? antColors.brand_primary : antColors.color_text_secondary}
              ]}
            >
              {tab.title}
            </Text>
            {activeTab === index && (
              <View
                style={[
                  styles.tabIndicator,
                  {backgroundColor: antColors.brand_primary}
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  customTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    // Active tab styling
  },
  tabText: {
    fontSize: 16,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
  },
});

export default HomeScreen;
