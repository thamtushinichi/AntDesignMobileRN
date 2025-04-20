import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Card,
  WhiteSpace,
  WingBlank,
  Carousel,
  Grid,
  Icon,
} from '@ant-design/react-native';
import {useTheme} from '../../store/context/ThemeContext';
import {useAuth} from '../../store/context/AuthContext';

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const {user} = useAuth();

  // Sample data for grid
  const data = Array.from(new Array(8)).map((_val, i) => ({
    icon: <Icon
      name={['home', 'user', 'bell', 'audit', 'contacts', 'container', 'up', 'down'][i % 8]}
      size="md"/>,
    text: `Option ${i + 1}`,
  }));

  // Sample data for carousel
  const carouselData = [
    {
      title: 'Feature 1',
      description: 'Amazing features at your fingertips',
      color: '#1890ff',
    },
    {
      title: 'Feature 2',
      description: 'Discover new possibilities',
      color: '#52c41a',
    },
    {
      title: 'Feature 3',
      description: 'Easy to use and intuitive',
      color: '#faad14',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={colors.background === '#ffffff' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <ScrollView style={styles.scrollView}>
        <WhiteSpace size="lg"/>
        <WingBlank size="lg">
          <Text style={[styles.welcomeText, {color: colors.text}]}>
            Welcome, {user?.username || 'User'}!
          </Text>
        </WingBlank>
        <WhiteSpace size="lg"/>

        {/* Carousel */}
        <Carousel
          style={styles.carousel}
          autoplay
          infinite
          dotStyle={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
          dotActiveStyle={{backgroundColor: colors.primary}}>
          {carouselData.map((item, index) => (
            <View
              key={index}
              style={[styles.carouselItem, {backgroundColor: item.color}]}>
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselDescription}>{item.description}</Text>
            </View>
          ))}
        </Carousel>

        <WhiteSpace size="lg"/>

        {/* Grid Options */}
        <WingBlank size="lg">
          <Card>
            <Card.Header title="Quick Actions"/>
            <Card.Body>
              <Grid
                data={data}
                columnNum={4}
                hasLine={false}
                renderItem={(dataItem) => (
                  <View style={styles.gridItem}>
                    {dataItem.icon}
                    <Text style={[styles.gridItemText, {color: colors.text}]}>
                      {dataItem.text}
                    </Text>
                  </View>
                )}
              />
            </Card.Body>
          </Card>
        </WingBlank>

        <WhiteSpace size="lg"/>

        {/* Recent Activity */}
        <WingBlank size="lg">
          <Card>
            <Card.Header title="Recent Activity"/>
            <Card.Body>
              <View style={styles.activityItem}>
                <Text style={{color: colors.text}}>You logged in successfully</Text>
                <Text style={styles.activityTime}>Just now</Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={{color: colors.text}}>Account created</Text>
                <Text style={styles.activityTime}>Today</Text>
              </View>
            </Card.Body>
          </Card>
        </WingBlank>

        <WhiteSpace size="lg"/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  carousel: {
    height: 150,
  },
  carouselItem: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  carouselDescription: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  gridItem: {
    alignItems: 'center',
    padding: 8,
  },
  gridItemText: {
    fontSize: 12,
    marginTop: 4,
  },
  activityItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default HomeScreen;
