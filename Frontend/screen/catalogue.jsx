import { useEffect, useState } from "react";
import {View, Text, FlatList, TextInput} from "react-native";
import {styles} from '../styles/Catalogue.styles';
import { SafeAreaView } from "react-native-safe-area-context";


export const catalogue = () => {
    const [produits, setProduits] = useState([]);
    const [erreur, setErreur] = useState(null);
    const [recherche, setRecherche] = useState('');

    useEffect (() =>{
        const chargerProduits = async () => {
            try{
                const res = await fetch('http://172.16.18.230:3000/api/produits');
                if(!res.ok){
                    throw new Error('Echec de chargement des produits');
                }
                const data = await res.json();
                setProduits(data);
            }
            catch(error){
                setErreur(error.message);
            }
            finally{

            }
        }
        chargerProduits();
    }, []);
      if (erreur) return <Text style={styles.erreur}>Erreur : {erreur}</Text>;
        const produitsFiltres = produits.filter(p =>
         p.nom.toLowerCase().includes(recherche.toLowerCase())
            );
      

            return (
        <SafeAreaView>
        <View>

        <TextInput
        placeholder="Rechercher un produit..."
        value={recherche}
        onChangeText={setRecherche}
        style={{
          borderWidth: 1,
          borderColor: '#110404ff',
          borderRadius: 5,
          padding: 8,
          marginBottom: 10,
        }}
      />

        <FlatList
            // data={produits}
            data={produitsFiltres}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
        <View style={styles.container}>
        <Text style={styles.nomProduit}>{item.nom}</Text>
        <Text style={styles.detailsProduit}>
                    {item.categorie} - {item.prix} €
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.stock}>
                    Stock : {item.stock} | Disponible : {item.disponible ? 'Oui' : 'Non'}
        </Text>
        </View>
            )}
            />

        </View>
        </SafeAreaView>
        
        
            
        );
     
}