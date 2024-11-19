const constants = {
    STATUSES: {
      OK: 'ok',
      ERROR: 'error',
    },

    SALT_ROUNDS:{
      TEST: 4,
      PRODUCTION: 10,
    }
  };
                                              
Object.freeze(constants);
  
module.exports = constants;  