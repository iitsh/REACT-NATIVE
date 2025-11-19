import { openDB } from "./db";

export const InsertUser = async (nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe) => {
    const db = await openDB();
    const result = await db.runAsync(
        'INSERT INTO users (nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe) VALUES (?, ?, ?, ?, ?, ?)', 
        [nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe]
    );
    console.log('Utilisateur inséré avec succès:', result);
    return result;
};

export const verifyUser = async (email, mot_de_passe) => {
    const db = await openDB();
    const result = await db.getAllAsync(
        'SELECT id, nom, prenom, email FROM users WHERE email = ? AND mot_de_passe = ?', 
        [email, mot_de_passe]
    );
    return result.length > 0 ? result[0] : null;
};
