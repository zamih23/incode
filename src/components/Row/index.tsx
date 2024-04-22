import {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

interface RowProps {
  title: string;
  value: string[] | string;
}

const Row: FC<RowProps> = ({title, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      {Array.isArray(value) ? (
        <View style={styles.valueContainer}>
          {value.map((i, index) => (
            <Text key={index}>{i}</Text>
          ))}
        </View>
      ) : (
        <Text>{value}</Text>
      )}
    </View>
  );
};

export default Row;
