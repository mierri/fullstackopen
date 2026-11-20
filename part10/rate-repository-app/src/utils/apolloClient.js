import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const defaultUri = Platform.select({
  android: 'http://10.0.2.2:4000/graphql',
  default: 'http://localhost:4000/graphql',
});

const uri =
  process.env.EXPO_PUBLIC_APOLLO_URI ||
  Constants.expoConfig?.extra?.apolloUri ||
  defaultUri;

const httpLink = new HttpLink({
  uri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
