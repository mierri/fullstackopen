import { StyleSheet } from 'react-native';
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

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
