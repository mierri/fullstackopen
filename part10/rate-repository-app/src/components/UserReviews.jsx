import { useQuery, useMutation } from '@apollo/client/react';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  viewButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d73a4a',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (loading || !data?.me) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item}>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.viewButton}
              onPress={() => navigate(`/${item.repositoryId}`)}
            >
              <Text fontWeight="bold" style={styles.buttonText}>
                View repository
              </Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text fontWeight="bold" style={styles.buttonText}>
                Delete review
              </Text>
            </Pressable>
          </View>
        </ReviewItem>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
