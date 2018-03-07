import express from 'express'
import mongoose from 'mongoose'
import Message from './../../models/Message'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let messages = express.Router();

// Route pour récuperer tous les messages
// On utilise la méthode find() du modèle mongoose 'Message' qui renvoi ici tous les messages
messages.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else res.status(200).json({success: true, message: 'Here is the list of messages!', content: messages});
  })
})

// Route pour récuperer les messages d'un utilisateur
// Comme elle se situe AVANT la route pour récupérer un message par /:id
// il n'y a pas de conflit entre les deux.
messages.get('/user/:userId', (req, res) => {
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

// Route pour enregister un message avec l'id d'un user
messages.post('/user/:userId', (req, res) => {
    // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
    if (ObjectId.isValid(req.params.userId)) {
      // On verifie que l'utilisateur existe
      User.findById(req.params.userId, function (err, user) {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          if (req.body && req.body.data) {
            // on créé le nouveau message puis on l'enregistre
            let newMessage = new Message({
              userId: req.params.userId,
              message: req.body.data
            });
            newMessage.save(function (err, message) {
              if (err) {
                res.status(400).json({success: false, message: err.message})
              } else {
                res.status(200).json({success: true, message: 'New message saved successfuly!', content: message})
              }
            })
          } else {
            res.status(500).json({success: false, message: 'Data is missing..'})
          }
        }
      })
    } else {
      res.status(404).json({success: false, message: 'User not found..'})
    }
})

// Route pour recuperer un message en particulier
// on peut utiliser findById avec l'id en parametre
messages.get('/:id', (req, res) => {
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(req.params.id)) {
    Message.findById(req.params.id, function (err, message) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        res.status(200).json({success: true, message: 'Here is the message!', content: message})
      }
    })
  } else {
    res.status(404).json({success: false, message: 'Message not found..'})
  }
})

export default messages
