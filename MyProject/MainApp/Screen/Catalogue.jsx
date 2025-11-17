import { SafeAreaView} from 'react-native-safe-area-context';
import {Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import styles from '../Style/style';
import { produits } from '../Data/Data';
import Articles from '../Composant/Article';
import { View } from 'react-native';

const Catalogue = ({navigation, panier, setPanier}) => {

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => [...prev, produit]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <TouchableOpacity
            style={styles.cartBadge}
            onPress={() => navigation.navigate('Panier')}
          >
            <Text style={styles.cartText}>🛒 {panier.length}</Text>
          </TouchableOpacity>
        <TextInput placeholder="🔍    Rechercher..." style={{backgroundColor: 'white', padding: 10, marginLeft:65, borderRadius:10, width:'70%'}} />
      </View>

      <FlatList
        data={produits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Articles item={item} onAddToCart={() => ajouterAuPanier(item)} />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default Catalogue;
