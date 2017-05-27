'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  name: { type:String, required:true }, 
  info:{ type:String , default:"Apply for this Job!" }, 
  maxapp: { type:Number, required:true }, 
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
