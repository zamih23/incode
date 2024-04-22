import {useRoute} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {fetchByLink} from '../../api/fetchByLink';
import Row from '../../components/Row';
import {HeroParams} from '../../navigation/HomeStack/types';
import {Hero as HeroType} from '../../utils/types';
import styles from './styles';

const Hero: FC = () => {
  const [heroData, setHeroData] = useState<HeroType>();
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);

  const route = useRoute();

  const {query} = route.params as HeroParams;

  const fetchFilms = async (link: string[]) => {
    const data = await Promise.all(link.map(i => fetchByLink(i)));
    const formattedData = data.map(i => i.title);
    setFilms(formattedData);
  };

  const fetchSpecies = async (link: string[]) => {
    const data = await Promise.all(link.map(i => fetchByLink(i)));
    const formattedData = data.map(i => i.classification);
    setSpecies(formattedData);
  };

  const fetchVehicles = async (link: string[]) => {
    const data = await Promise.all(link.map(i => fetchByLink(i)));
    const formattedData = data.map(i => i.name);
    setVehicles(formattedData);
  };

  const fetchStarships = async (link: string[]) => {
    const data = await Promise.all(link.map(i => fetchByLink(i)));
    const formattedData = data.map(i => i.name);
    setStarships(formattedData);
  };

  const fetchHero = async () => {
    const data = await fetchByLink(query);
    await fetchFilms(data.films);
    await fetchSpecies(data.species);
    await fetchVehicles(data.vehicles);
    await fetchStarships(data.starships);
    setHeroData(data);
  };

  useEffect(() => {
    if (query) {
      fetchHero();
    }
  }, [query]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {heroData && (
          <>
            <Row title="Name" value={heroData.name} />
            <Row title="Height" value={heroData.height} />
            <Row title="Mass" value={heroData.mass} />
            <Row title="Hair color" value={heroData.hair_color} />
            <Row title="Skin color" value={heroData.skin_color} />
            <Row title="Eye color" value={heroData.eye_color} />
            <Row title="Birth date" value={heroData.birth_year} />
            <Row title="Gender" value={heroData.gender} />
            <Row title="Home world" value={heroData.homeworld} />

            <Row title="Films" value={films} />
            <Row title="Species" value={species} />
            <Row title="Vehicles" value={vehicles} />
            <Row title="Starships" value={starships} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Hero;
