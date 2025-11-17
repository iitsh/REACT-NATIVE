
import { View, Text, FlatList, Pressable } from 'react-native';
import styles from '../Style/style';

const Panier = ({ navigation, panier, setPanier }) => {

console.log (panier)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mon Panier</Text>
      <Pressable 
        style={{
          backgroundColor: 'red',
          padding: 10,
          margin: 10,
          borderRadius: 5,
          alignItems: 'center'
        }}
        onPress={() => {
          setPanier([]);
        }}
      >
        <Text style={{ color: 'white' }}>Vider le panier</Text>
      </Pressable>
      <FlatList
        data={panier}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({ item }) => (
          <Text style={styles.cartItem}>• {item.name} - {item.prix}</Text>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Panier ;
