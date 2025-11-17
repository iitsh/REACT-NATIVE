import { Image, Text, View, Pressable } from "react-native";
import styles from '../Style/style';


// Composant pour afficher un produit
 const Articles = ({item, onAddToCart}) => (

   <View style={styles.articleCard}>
    <Image source={{ uri: item.image}} style={styles.articleImage}/>
    <View style={styles.articleInfo}>
      <View style={styles.articleHeader}>
        <Text style={styles.articleTitle}>{item.name}</Text>
        <Text style={styles.articlePrice}>{item.prix}</Text>
      </View>
      <Text style={styles.articleDetails} numberOfLines={2}>
        {item.description || 'Ingrédients frais pour un goût authentique.'}
      </Text>
      <Pressable style={styles.articleButton} onPress={onAddToCart}>
        <Text style={styles.articleButtonText}>+ Ajouter au panier</Text>
      </Pressable>
    </View>
  </View>
);

export default Articles