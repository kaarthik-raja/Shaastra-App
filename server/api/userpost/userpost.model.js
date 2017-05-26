'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './userpost.events';

var UserpostSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(UserpostSchema);
export default mongoose.model('Userpost', UserpostSchema);
