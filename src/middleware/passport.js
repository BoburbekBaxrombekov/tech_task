const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { KEYS } = require('../config')
const { findUserById } = require('../modules/auth/model')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEYS.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async(payload, done) => {
            try{
                const user = await findUserById(payload.user_uuid)

                if(user){
                    done(null, user)
                }else{
                    done(null, false)
                }
            }catch(err){
                console.log(err.message);
            }
            
        })
    )
}