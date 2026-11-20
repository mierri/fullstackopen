import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  header: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data?.repository) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const repository = data.repository;
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id: reviewId }) => reviewId}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <RepositoryItem item={repository} showGithubButton />
        </View>
      )}
    />
  );
};

export default SingleRepository;
