/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/userposts              ->  index
 * POST    /api/userposts              ->  create
 * GET     /api/userposts/:id          ->  show
 * PUT     /api/userposts/:id          ->  upsert
 * PATCH   /api/userposts/:id          ->  patch
 * DELETE  /api/userposts/:id          ->  destroy
 * GET     /api/userposts/post/:id     ->  showpost 
 * GET     /api/userposts/user/:id     ->  showuser
 * Get     /api/userposts/postuser/:userid/:postid -> showit
 * DELETE  /api/userposts/user/:id     ->  deleteall  
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Userpost from './userpost.model';
import User from '../user/user.model';
import Post from '../post/post.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Userposts
export function index(req, res) {
  return Userpost.find().populate('userid ','_id name email role ').populate('postid','_id maxapp name').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Userpost from the DB
export function show(req, res) {
  return Userpost.findById(req.params.id).populate('userid','_id name email role').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//Gets All post applicants by post:_id
export function showuser(req, res) {
  return Userpost.find({postid:req.params.id}).populate('userid','_id name email role').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//Gets All user post requests by user:_id
export function showpost(req, res) {
  return Userpost.find({userid:req.params.id}).populate('postid').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
   } 

 //Gets Both User and Post
export function showit(req, res) {
  return Userpost.find({userid:req.params.userid,postid:req.params.postid}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
   }  
 // Creates a new Userpost in the DB
export function create(req, res) {
  return Userpost.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Userpost in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Userpost.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Userpost in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Userpost.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Userpost from the DB
export function destroy(req, res) {
  return Userpost.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Delete all user for a filled post from the DB
// export function deleteall(req, res){
//   return Userpost.find({postid:req.params.id}).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }