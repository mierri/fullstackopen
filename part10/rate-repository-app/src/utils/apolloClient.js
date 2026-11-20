import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const uri =
  process.env.EXPO_PUBLIC_APOLLO_URI ||
  Constants.expoConfig?.extra?.apolloUri ||
  'http://localhost:4000/graphql';

const httpLink = new HttpLink({
  uri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
