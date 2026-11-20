import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  text: {
    color: '#ffffff',
  },
});

const AppBarTab = ({ text, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
          {text}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
