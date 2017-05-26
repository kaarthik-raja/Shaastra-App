'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  name: String,
  info:String,
  state:{type:Boolean,default:true},
  maxapp: Number,
  applied:[{applicant:String}]
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
