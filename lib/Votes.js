const redisClient = require('../redis');

function Users() {
  this.client = redisClient;
}

module.exports = new Users();

Users.prototype.upsert = function (key, val) {
  this.client.set(key, val, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

Users.prototype.incr = function (key) {
  this.client.incr(key, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// Users.prototype.get = function (key, callback) {
//   this.client.get('online', function (err) {
//     if (err) {
//       console.error(err);
//       return callback([]);
//     }

//     return callback(data);
//   });
// };
