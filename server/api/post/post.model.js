'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  name: {type:String,required:true},
  info:{type:String ,default:"Apply for this Job!"},
  state:{type:Boolean,default:true},
  maxapp: {type:Number,required:true},
  applied:[{applicant:String}]
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
