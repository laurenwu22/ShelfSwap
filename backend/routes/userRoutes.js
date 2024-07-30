import express from 'express'; 
import User from '../models/userModel.js';
import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';

// Initialize router
const router = express.Router();

// Google OAuth route
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}))

// Google OAuth callback route
router.get("/auth/google/shelfswap", passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/auth/google",
}))

// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err);
        res.redirect("/");
    });
});

// Configure Google OAuth strategy for Passport
passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/users/auth/google/shelfswap",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
}, async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    try {
        // Attempt to find the user in the database
        const existingUser = await User.findOne({ googleId: profile.id });

        // If the user exists, sign in
        if (existingUser) {
            console.log(`Hi, ${existingUser.fname} ${existingUser.lname}!`);
            return cb(null, existingUser);
        }

        // Otherwise create a new user in the db
        else {
            const user = new User({
                googleId: profile.id,
                fname: profile.name.givenName,
                lname: profile.name.familyName,
                email: profile.emails[0].value,
            });
            // Save the new user to the database
            await user.save();
        }
        cb(null, user);
    } catch (err) {
        cb(err);
    }
}));

export default router;