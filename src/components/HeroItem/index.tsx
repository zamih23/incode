import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Row from '../Row';
import {fetchByLink} from '../../api/fetchByLink';
import {ActiveHeartIcon, HeartIcon} from '../Icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeRouteNames,
  HomeStackParams,
} from '../../navigation/HomeStack/types';
import {Favourites} from '../../utils/types';

interface HeroItemProps {
  name: string;
  dateOfBirth: string;
  gender: string;
  homeWorldLink: string;
  speciesLink: string[];
  heroLink: string;
  favourites: Favourites[];
  setFavourites: (v: Favourites[]) => void;
}

const HeroItem: FC<HeroItemProps> = ({
  name,
  dateOfBirth,
  gender,
  homeWorldLink,
  speciesLink,
  heroLink,
  favourites,
  setFavourites,
}) => {
  const [homeWorld, setHomeWorld] = useState('');
  const [species, setSpecies] = useState<string[]>([]);

  const navigation = useNavigation<NavigationProp<HomeStackParams>>();

  const fetchHomeWorld = async (link: string) => {
    const data = await fetchByLink(link);
    setHomeWorld(data.name);
  };

  const fetchSpecies = async (link: string[]) => {
    const data = await Promise.all(link.map(i => fetchByLink(i)));
    const formattedData = data.map(i => i.classification);
    setSpecies(formattedData);
  };

  useEffect(() => {
    if (homeWorldLink) {
      fetchHomeWorld(homeWorldLink);
    }
  }, [homeWorldLink]);

  useEffect(() => {
    if (speciesLink) {
      fetchSpecies(speciesLink);
    }
  }, [speciesLink]);

  const isLiked = useMemo(
    () => favourites.find(i => i.url === heroLink),
    [heroLink, favourites],
  );

  const handleLike = useCallback(() => {
    if (isLiked) {
      setFavourites(favourites.filter(i => i.url !== heroLink));
    } else {
      setFavourites([...favourites, {gender, url: heroLink}]);
    }
  }, [isLiked, favourites, heroLink, gender]);

  const handleHeroPress = () => {
    navigation.navigate(HomeRouteNames.Hero, {query: heroLink});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoContainer} onPress={handleHeroPress}>
        <Row title="Name" value={name} />
        <Row title="Date of birth" value={dateOfBirth} />
        <Row title="Gender" value={gender} />
        <Row title="Home World" value={homeWorld} />

        {species && <Row title="Species" value={species} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLike}>
        {isLiked ? <ActiveHeartIcon /> : <HeartIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default HeroItem;
