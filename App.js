import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const apiKey = `d5579d3776be14b967cb5539c2795b27`;
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=SãoPaulo,BR&appid=${apiKey}`;
  const [temperatura, setTemperatura] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [cidadeEscolhida, setCidadeEscolhida] = useState('');



const api = axios.create({
  baseURL: endpoint
});
  const getWeather = () => {
    api.get().then((response) => {
      const lista = response.lista[0];
      setTemperatura(lista.main.temp);
      setCidade(lista.name);
      setTipo(lista.weather[0].main);
    });
  };

  const onChangeText = (cidadeEscolhida) => {
    setCidadeEscolhida(cidadeEscolhida);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuctwBTEZTPMxGWWJl0JN_ZwKg_1K_T1HUzA&usqp=CAU',
      }}
      style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.localizacao}>{cidade}</Text>
        <Text style={styles.tipo}>{tipo}</Text>
        <Text style={styles.temperatura}>
                    {Math.round(temperatura) + '°C'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          onSubmitEditing={getWeather}
          clearButtonMode={'always'}
          clearTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          returnKeyType={'search'}
          placeholder="Search any city"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
  },
  temperatura: {
    fontSize: 30,
    fontWeight: '100',
    margin: 3,
    color: '#fff',
  },
  localizacao: {
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 10,
    color: '#fff',
  },
  tipo: {
    fontSize: 40,
    fontWeight: '100',
    color: '#fff',
    marginBottom: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    paddingHorizontal: 10,
  },
});
