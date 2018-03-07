import express from 'express'
import mongoose from 'mongoose'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let users = express.Router();

// Route pour récuperer tous les utilisateurs
// On utilise la méthode find() du modèle mongoose 'User' qui renvoi ici tous les users
users.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else res.status(200).json({success: true, message: 'Here is the list of users!', content: users});
  })
})

// Route pour recuperer le profil d'un utilisateur en particulier
// on peut utiliser findById avec l'id en parametre
users.get('/:id', (req, res) => {
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        user.hash_password = undefined
        user.__v = undefined
        res.status(200).json({success: true, message: 'Here is the user profile!', content: user})
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})

export default users
