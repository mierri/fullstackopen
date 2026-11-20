import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.headerContainer}>
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
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        setSelectedOrder ? (
          <RepositoryListHeader
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
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
  const variables = getOrderVariables(selectedOrder);
  const { repositories } = useRepositories(variables);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={(id) => navigate(`/${id}`)}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
