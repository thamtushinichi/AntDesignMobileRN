import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import {
  List,
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
  Icon,
  Toast,
} from '@ant-design/react-native';
import {useAuthStore, useThemeStore} from '../../store/zustand';

const ProfileScreen: React.FC = () => {
  const {theme, isDarkMode, setThemeType} = useThemeStore();
  const {user, logout} = useAuthStore();
  const {antColors} = theme;
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleDarkModeToggle = (value: boolean) => {
    setThemeType(value ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await logout();
      Toast.success('Logged out successfully', 1);
    } catch (error) {
      console.error('Logout error:', error);
      Toast.fail('Logout failed', 1);
    } finally {
      setLogoutModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: antColors.card_background}]}>
      <StatusBar
        barStyle={antColors.card_background === '#ffffff' ? 'dark-content' : 'light-content'}
        backgroundColor={antColors.card_background}
      />
      <ScrollView style={styles.scrollView}>
        <WhiteSpace size="lg"/>
        <WingBlank size="lg">
          <View style={styles.profileHeader}>
            <View style={[styles.avatarPlaceholder, {backgroundColor: antColors.brand_primary}]}>
              <Text style={styles.avatarText}>
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={[styles.username, {color: antColors.color_text_base}]}>
              {user?.username || 'User'}
            </Text>
            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          </View>
        </WingBlank>

        <WhiteSpace size="lg"/>

        <List renderHeader="Account Settings">
          <List.Item
            extra={<Switch value={isDarkMode} onValueChange={handleDarkModeToggle}/>}>
            Dark Mode
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Edit Profile pressed', 1)}>
            Edit Profile
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Change Password pressed', 1)}>
            Change Password
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Notifications pressed', 1)}>
            Notifications
          </List.Item>
        </List>

        <WhiteSpace size="lg"/>

        <List renderHeader="App Information">
          <List.Item arrow="horizontal" onPress={() => Toast.info('About pressed', 1)}>
            About
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Help pressed', 1)}>
            Help & Support
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Privacy Policy pressed', 1)}>
            Privacy Policy
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => Toast.info('Terms of Service pressed', 1)}>
            Terms of Service
          </List.Item>
        </List>

        <WhiteSpace size="lg"/>

        <WingBlank size="lg">
          <Button
            type="warning"
            onPress={() => setLogoutModalVisible(true)}>
            Logout
          </Button>
        </WingBlank>

        <WhiteSpace size="xl"/>
      </ScrollView>

      <Modal
        popup
        visible={logoutModalVisible}
        animationType="slide-up"
        onClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalContent}>
          <Icon name="question-circle" size="lg" color={antColors.warning_color}/>
          <Text style={[styles.modalTitle, {color: antColors.color_text_base}]}>
            Confirm Logout
          </Text>
          <Text style={styles.modalSubtitle}>
            Are you sure you want to logout?
          </Text>
          <WhiteSpace size="lg"/>
          <View style={styles.modalButtons}>
            <Button
              type="ghost"
              style={styles.modalButton}
              onPress={() => setLogoutModalVisible(false)}>
              Cancel
            </Button>
            <Button
              type="warning"
              style={styles.modalButton}
              onPress={handleLogout}>
              Logout
            </Button>
          </View>
        </View>
      </Modal>
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
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#999',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ProfileScreen;
