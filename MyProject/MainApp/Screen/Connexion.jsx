import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styles from "../Style/authStyles";

const Connexion = ({ navigation }) => {
const [formData, setFormData] = useState({
        email: '',
        motDePasse: '',
    });

    const [erreurs, setErreurs] = useState({});

    const handleChange = (champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      [champ]: valeur
    }));
        // Efface l'erreur du champ quand l'utilisateur modifie
        if (erreurs[champ]) {
        setErreurs(prev => ({
            ...prev,
            [champ]: ''
        }));
        }
    };

    const validerFormulaire = () => {
        let nouvellesErreurs = {};


        if (formData.email.trim()==='') {
        nouvellesErreurs.email = 'L\'email est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                if (!emailRegex.test(formData.email.trim()) && formData.email.trim() !== "") { // Vérifie le format de l'email
                nouvellesErreurs.email = 'Le format de l\'email est invalide.';
            }

        
        if (formData.motDePasse.trim()==='') {
        nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
        }
        if (formData.motDePasse.trim().length < 12 && formData.motDePasse.trim().length > 0) { // Vérifie la longueur minimale du mot de passe
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères";
            }
        if(formData.motDePasse.trim().length > 25) { // Vérifie la longueur maximale du mot de passe
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 20 caractères";
        }
        const hasNumber = /\d/.test(formData.motDePasse.trim()); // Vérifie la présence d'un chiffre dans le mot de passe
            if (hasNumber === false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un chiffre";
            }
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.motDePasse.trim()); // Vérifie la présence d'un caractère spécial dans le mot de passe
            if (hasSpecialChar === false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un caractère spécial";
            }

        const hasUpperCase = /[A-Z]/.test(formData.motDePasse.trim()); 

            if (hasUpperCase === false && formData.motDePasse.trim() !== "") { // Vérifie la présence d'une majuscule dans le mot de passe
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
            }
            if (formData.motDePasse.trim().length > 25 && hasUpperCase === false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 20 caractères et une majuscule";
            }

            if(formData.motDePasse.trim().length <12 && hasUpperCase === false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères et une majuscule";
            }
        setErreurs(nouvellesErreurs);

        return Object.keys(nouvellesErreurs).length === 0;
    }
    
    const handleSubmit = () => {
        if (validerFormulaire()) {
            // Tout est correct → naviguer vers la page Catalogue
            navigation.replace('Catalogue');
            // Réinitialiser le formulaire
            setFormData({
                email: '',
                motDePasse: '',
            });
            setErreurs({});
        }
  };
    return (
    
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.champContainer}>
                        <Text style={{fontWeight:'bold', fontSize:40, marginBottom:10, marginLeft:60}}> Connexion</Text>
                    </View>
                                    
                    <View style={styles.champContainer}>
                        <Text style={styles.label}>Adresse email</Text>
                        <TextInput placeholder="Entrez votre adresse email" keyboardType="email-address" style={[styles.input, erreurs.email && styles.inputErreur]} value={formData.email} autoCapitalize="none" onChangeText={(valeur) => handleChange('email', valeur)} />
                        {erreurs.email && <Text style={styles.texteErreur}>{erreurs.email}</Text>}
                    </View>
                    
                    <View style={styles.champContainer}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput placeholder="Entrez votre mot de passe" secureTextEntry style={[styles.input, erreurs.motDePasse && styles.inputErreur]} value={formData.motDePasse} onChangeText={(valeur) => handleChange('motDePasse', valeur)} />
                        {erreurs.motDePasse && <Text style={styles.texteErreur}>{erreurs.motDePasse}</Text>}
                    </View>
    
                    
    
                    <View style={styles.champContainer}> 
                        <Pressable style={styles.bouton} onPress={handleSubmit}>
                            <Text style={styles.texteBouton}>Se connecter</Text>
                        </Pressable>
                    </View>

                    <View>
                    <Pressable onPress={() => navigation.replace('Inscription')}>
                        <Text style={{color:'blue', textAlign:'center', marginTop:10}}>Pas de compte ? Inscrivez-vous</Text>
                    </Pressable>
                    </View>
                        
            
                </ScrollView>
                </KeyboardAvoidingView>
        )
}
export default Connexion;