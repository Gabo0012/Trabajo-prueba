const Users = require('./auth.controllet');
module.exports = (router)=> {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);


}
