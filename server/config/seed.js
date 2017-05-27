/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import config from './environment/';
import Post from '../api/post/post.model';
export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {

    Post.find({}).remove()
      .then(() => {
        Post.create({
        name:"Hiring Manager",
        info:"Gotta Hire them all",
        maxapp:3
      },{
        name:"HR",
        info:"Human Resource",
        maxapp:5
      },{
        name:"Pune",
        info:"Should i describe it",
        maxapp:0
      },{
        name:"CEO",
        info:"Iron Throne is mine",
        maxapp:1
      },{
        name:"Software Engineer",
        info:"I Can't Say Right!!!",
        maxapp:4
      })
        .then(() => console.log('finished populating Post'))
        .catch(err => console.log('error populating Post', err));
       });
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
