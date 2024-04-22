import {FC, useCallback} from 'react';
import {FlatList, Text} from 'react-native';
import HeroItem from '../HeroItem';
import {Favourites, Hero, Response} from '../../utils/types';

interface PaginatedListProps {
  data: Hero[];
  favourites: Favourites[];
  setFavourites: (v: Favourites[]) => void;
  onLoadMore: () => void;
  isLastPage: boolean;
}

export const PaginatedList: FC<PaginatedListProps> = ({
  data,
  favourites,
  setFavourites,
  onLoadMore,
  isLastPage,
}) => {
  const renderItem = useCallback(
    ({item}: any) => (
      <HeroItem
        name={item.name}
        dateOfBirth={item.birth_year}
        gender={item.gender}
        homeWorldLink={item.homeworld}
        speciesLink={item.species}
        heroLink={item.url}
        favourites={favourites}
        setFavourites={setFavourites}
      />
    ),
    [favourites],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      ListFooterComponent={() => !isLastPage && <Text>Loading...</Text>}
    />
  );
};
