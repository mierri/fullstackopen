import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 8,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  languageText: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    marginBottom: 5,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  githubButtonText: {
    color: '#ffffff',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const RepositoryItem = ({ item, showGithubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.name}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statCount}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statCount}>
            {formatCount(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statCount}>
            {formatCount(item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statCount}>
            {formatCount(item.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {showGithubButton && item.url ? (
        <Pressable
          style={styles.githubButton}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text fontWeight="bold" style={styles.githubButtonText}>
            Open in GitHub
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
