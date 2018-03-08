import express from 'express'
import mongoose from 'mongoose'
import Message from './../../models/Message'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let messagesUser = express.Router();

messagesUser.get('/', (req, res) => {
  let _userId = req.anas._id;
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(_userId)) {
    // On verifie que l'utilisateur existe
    User.findById(_userId, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        // On va chercher tout ses messages
        Message.find({ userId: _userId }, (err, messages) => {
          if (err) res.status(500).json({success: false, message: err.message})
          else res.status(200).json({success: true, message: 'Here is your messages!', content: messages});
        })
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})

// Route pour récuperer les messages d'un utilisateur
// Comme elle se situe AVANT la route pour récupérer un message par /:id
// il n'y a pas de conflit entre les deux.
messagesUser.get('/:userId', (req, res) => {
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(req.params.userId)) {
    // On verifie que l'utilisateur existe
    User.findById(req.params.userId, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        // On va chercher tout ses messages
        Message.find({ userId: req.params.userId }, (err, messages) => {
          if (err) res.status(500).json({success: false, message: err.message})
          else res.status(200).json({success: true, message: 'Here is the list of user ' + user.email + ' messages!', content: messages});
        })
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})

export default messagesUser