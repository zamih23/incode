import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {fetchHeroes} from '../../api/fetchHeroes';
import {PaginatedList} from '../../components/PaginatedList';
import styles from './styles';
import {Favourites, Hero, Response} from '../../utils/types';
import {fetchByLink} from '../../api/fetchByLink';

export const Home: FC = () => {
  const [pageData, setPageData] = useState<Response<Hero[]>>();
  const [favourites, setFavourites] = useState<Favourites[]>([]);

  const fetchData = async () => {
    const data = await fetchHeroes();
    setPageData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const femaleLiked = useMemo(
    () => favourites.filter(i => i.gender === 'female').length,
    [favourites],
  );
  const maleLiked = useMemo(
    () => favourites.filter(i => i.gender === 'male').length,
    [favourites],
  );
  const othersLiked = useMemo(
    () =>
      favourites.filter(i => i.gender !== 'male' && i.gender !== 'female')
        .length,
    [favourites],
  );

  const handleReset = useCallback(() => {
    setFavourites([]);
  }, []);

  const isLastPage = useMemo(() => !pageData?.next, [pageData]);

  const loadMore = async () => {
    if (pageData && !isLastPage) {
      const data = await fetchByLink(pageData?.next);
      setPageData({
        ...data,
        results: [...pageData?.results, ...data.results],
      });
    }
  };

  return (
    <SafeAreaView>
      {pageData && (
        <View style={styles.container}>
          <View style={styles.dasboardContainer}>
            <View>
              <Text>{femaleLiked}</Text>
              <Text>Female</Text>
            </View>

            <View>
              <Text>{maleLiked}</Text>
              <Text>Male</Text>
            </View>

            <View>
              <Text>{othersLiked}</Text>
              <Text>Others</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleReset} style={styles.button}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
          <PaginatedList
            data={pageData.results}
            favourites={favourites}
            setFavourites={setFavourites}
            onLoadMore={loadMore}
            isLastPage={isLastPage}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
