'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './userpost.events';
import User from '../user/user.model';
import Post from '../post/post.model';

var UserpostSchema = new mongoose.Schema({
userid:{type: mongoose.Schema.Types.ObjectId,
            ref: 'User'},
postid:{type: mongoose.Schema.Types.ObjectId,
            ref: 'post'},
status:{
	type: Boolean,default:false
}
});

registerEvents(UserpostSchema);
export default mongoose.model('Userpost', UserpostSchema);
