import express from 'express'
import mongoose from 'mongoose'
import Message from './../../models/Message'
import User from './../../models/User'
import messagesUser from './messages_user'
const ObjectId = mongoose.Types.ObjectId;

let messages = express.Router();

// Route avec le prefix /user (ex: get messages from one user)
// Placée avant '/:id' pour donner la priorité
messages.use('/user', messagesUser)

// Route pour récuperer tous les messages
// On utilise la méthode find() du modèle mongoose 'Message' qui renvoi ici tous les messages
messages.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else res.status(200).json({success: true, message: 'Here is the list of messages!', content: messages});
  })
})

// Route pour enregister un message avec l'id d'un user
messages.post('/', (req, res) => {
  let _userId = req.body.userId;
  let _message = req.body.message;
  if (_userId && _message) {
    // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
    if (ObjectId.isValid(_userId)) {
      // On verifie que l'utilisateur existe
      User.findById(_userId, function (err, user) {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          // on créé le nouveau message puis on l'enregistre
          let newMessage = new Message({
            userId: _userId,
            message: _message
          });
          newMessage.save(function (err, message) {
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              res.status(200).json({success: true, message: 'New message saved!', content: message})
            }
          })
        }
      })
    } else {
      res.status(404).json({success: false, message: 'User not found..'})
    }
  } else {
    res.status(400).json({success: false, message: 'Data is missing..'})
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

// Route pour update un message, on trouve le message avec findById puis on l'edit&save
messages.put('/:id', (req, res) => {
  if (req.body && req.body.message) {
    if (ObjectId.isValid(req.params.id)) {
      Message.findById(req.params.id, function (err, message) {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          message.message = req.body.message;
          message.save(function (err, updatedMessage) {
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              res.status(200).json({success: true, message: 'Message updated!', content: updatedMessage})
            }
          })
        }
      })
    } else {
      res.status(404).json({success: false, message: 'Message not found..'})
    }
  } else {
    res.status(400).json({success: false, message: 'Data is missing..'})
  }
})

// Route pour delete un message, on utilise la méthode remove() du modele mongoose ezpz
messages.delete('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Message.findById(req.params.id, function (err, message) {
      if (err) {
        res.status(500).json({success: false, message: err.message})
      } else if (!message) {
        res.status(404).json({success: false, message: 'Message not found..'})
      } else {
        Message.remove({ _id: req.params.id }, function (err) {
          if (err) res.status(500).json({success: false, message: err.message})
          else {
            res.status(200).json({success: true, message: 'The message has been deleted!'})
          }
        })
      }
    })
  } else {
    res.status(404).json({success: false, message: 'message not found..'})
  }
})

export default messages
