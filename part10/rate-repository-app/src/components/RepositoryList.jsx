import { useState } from 'react';
import { FlatList, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onSelectRepository,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
  onEndReached,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        setSelectedOrder ? (
          <RepositoryListHeader
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        ) : null
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectRepository?.(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const getOrderVariables = (order) => {
  switch (order) {
    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const variables = {
    first: 8,
    ...getOrderVariables(selectedOrder),
    searchKeyword: debouncedSearchKeyword,
  };

  const { repositories, fetchMore } = useRepositories(variables);
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={(id) => navigate(`/${id}`)}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryList;
