
import { View, Text, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Style/style';

const Panier = ({ navigation, panier, setPanier }) => {

console.log (panier)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={[styles.title, { marginLeft: 8 }]}>🛒 Mon Panier</Text>
      </View>
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
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={({ item }) => (
          <Text style={styles.cartItem}>• {item.nom} - {item.prix}- {item.stock}</Text>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Panier ;
