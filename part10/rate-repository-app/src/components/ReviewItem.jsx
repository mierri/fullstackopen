import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
  text: {
    marginTop: 4,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'dd.MM.yyyy')
    : '';

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.username}>
          {review.user?.username}
        </Text>
        <Text color="textSecondary" style={styles.date}>
          {formattedDate}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
