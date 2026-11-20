import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} showGithubButton />
    </View>
  );
};

export default SingleRepository;
