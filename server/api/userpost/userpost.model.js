'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './userpost.events';

var UserpostSchema = new mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
  postid: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'},
  status: {
    type: Boolean, default: false }
});

registerEvents(UserpostSchema);
export default mongoose.model('Userpost', UserpostSchema);
