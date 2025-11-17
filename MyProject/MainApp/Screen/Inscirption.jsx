import { TextInput, View, StyleSheet, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { useState, useEffect } from "react";
import styles from "../Style/authStyles";
const Inscription = ({navigation}) => {

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        numero: '',
        email: '',
        motDePasse: '',
        confirmerMotDePasse: ''
    });

    const [erreurs, setErreurs] = useState({});

    // Vérification en temps réel de la correspondance des mots de passe
    useEffect(() => {
        if (formData.motDePasse && formData.confirmerMotDePasse) {
            if (formData.motDePasse !== formData.confirmerMotDePasse) {
                setErreurs(prev => ({
                    ...prev,
                    confirmerMotDePasse: 'Les mots de passe correspondent pas'
                }));
            } else {
                setErreurs(prev => ({
                    ...prev,
                    confirmerMotDePasse: ''
                }));
            }
        }
    }, [formData.motDePasse, formData.confirmerMotDePasse]);

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

        // Validation du nom
        if (formData.nom.trim()==='') {
        nouvellesErreurs.nom = 'Le nom est obligatoire';
        }
        if (/\s/.test(formData.nom.trim())) { // Vérifie si le nom contient des espaces
                nouvellesErreurs.nom = "Le nom ne doit pas contenir d'espaces";
            }
        
        
        if (formData.prenom.trim()==='') {
        nouvellesErreurs.prenom = 'Le prénom est obligatoire';
        }
        if (/\s/.test(formData.prenom.trim())) { // Vérifie si le nom contient des espaces
                nouvellesErreurs.prenom = "Le nom ne doit pas contenir d'espaces";
            }

        if (formData.numero.trim()==='') {
        nouvellesErreurs.numero = 'Le numéro est obligatoire';
        }

        if (formData.email.trim()==='') {
        nouvellesErreurs.email = 'L\'email est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                if (!emailRegex.test(formData.email.trim()) && formData.email.trim() !== "") { // Vérifie le format de l'email
                nouvellesErreurs.email = 'Le format de l\'email est invalide.';
            }

        if(/^\d+$/.test(formData.numero.trim()) === false && formData.numero.trim() !== "") { // Vérifie si le numéro contient uniquement des chiffres
                nouvellesErreurs.numero = "Le numéro doit contenir uniquement des chiffres";
            }
        if(formData.numero.trim().length !== 10 && formData.numero.trim() !== "") { // Vérifie la longueur du numéro
                nouvellesErreurs.numero = "Le numéro doit contenir exactement 10 chiffres";
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
        if (formData.confirmerMotDePasse.trim()==='') {
        nouvellesErreurs.confirmerMotDePasse = 'La confirmation du mot de passe est obligatoire';
        }
        if(formData.motDePasse.trim() !== formData.confirmerMotDePasse.trim()) {
            nouvellesErreurs.confirmerMotDePasse = "Les mots de passe ne correspondent pas";
        }

        const hasUpperCase = /[A-Z]/.test(formData.motDePasse.trim()); 

            if (hasUpperCase === false && formData.motDePasse.trim() !== "") { // Vérifie la présence d'une majuscule dans le mot de passe
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
            }
            if (formData.motDePasse.trim().length > 25 && hasUpperCase === false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 20 caractères et une majuscule";
            }
            if(formData.motDePasse.trim().length <12 && hasUpperCase === false && hasSpecialChar=== false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères, une majuscule et un caractère spécial";
            }

            if(formData.motDePasse.trim().length <12 && hasUpperCase === false && hasUpperCase === true && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères et une majuscule";
            }
            if(formData.motDePasse.trim().length <12 && hasUpperCase === true && hasSpecialChar=== false && hasNumber===false && formData.motDePasse.trim() !== "") {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères, un caractère spécial et un chiffre";
            }

        setErreurs(nouvellesErreurs);

        return Object.keys(nouvellesErreurs).length === 0;
    }
    
    const handleSubmit = () => {
        if (validerFormulaire()) {
        navigation.replace('Catalogue'); // Tout est correct → naviguer vers la page Catalogue
        // Réinitialiser le formulaire
        setFormData({
            nom: '',
            prenom: '',
            numero: '',
            email: '',
            motDePasse: '',
            confirmerMotDePasse: ''
        });
        setErreurs({});
        }
  };
    

    return (

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} >
                <View style={styles.champContainer}>
                    <Text style={{fontWeight:'bold', fontSize:40, marginBottom:10}}> Inscription</Text>
                    <Text style={{fontSize:20, marginBottom:10}}>Créez votre compte</Text>
                </View>
                
                <View style={styles.champContainer}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput placeholder="Entrez votre nom" style={[styles.input, erreurs.nom && styles.inputErreur]} value={formData.nom} autoCapitalize="words" onChangeText={(valeur) => handleChange('nom', valeur)} />
                    {erreurs.nom && <Text style={styles.texteErreur}>{erreurs.nom}</Text>} 
                </View>

                <View style={styles.champContainer}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput placeholder="Entrez votre prénom" style={[styles.input, erreurs.prenom && styles.inputErreur]} value={formData.prenom} autoCapitalize="words" onChangeText={(valeur) => handleChange('prenom', valeur)} />
                    {erreurs.prenom && <Text style={styles.texteErreur}>{erreurs.prenom}</Text>}
                </View>

                <View style={styles.champContainer}>
                    <Text style={styles.label}>Numéro</Text>
                    <TextInput placeholder="Entrez votre numéro" keyboardType="numeric" style={[styles.input, erreurs.numero && styles.inputErreur]} value={formData.numero} onChangeText={(valeur) => handleChange('numero', valeur)} />
                    {erreurs.numero && <Text style={styles.texteErreur}>{erreurs.numero}</Text>}
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
                    <Text style={styles.label}>Confirmer mot de passe</Text>
                    <TextInput placeholder="Confirmez votre mot de passe" secureTextEntry style={[styles.input, erreurs.confirmerMotDePasse && styles.inputErreur]} value={formData.confirmerMotDePasse} onChangeText={(valeur) => handleChange('confirmerMotDePasse', valeur)} />
                    {erreurs.confirmerMotDePasse && <Text style={styles.texteErreur}>{erreurs.confirmerMotDePasse}</Text>}
                </View>

                <View style={styles.champContainer}> 
                    <Pressable style={styles.bouton} onPress={handleSubmit}>
                        <Text style={styles.texteBouton}>S'inscrire</Text>
                    </Pressable>
                </View>
                
                <View>
                    <Pressable onPress={() => navigation.replace('Connexion')}>
                        <Text style={{color:'blue', textAlign:'center', marginTop:10}}>Déjà un compte ? Connectez-vous</Text>
                    </Pressable>
                </View>
                    
        
            </ScrollView>
            </KeyboardAvoidingView>
    )
}


export default Inscription