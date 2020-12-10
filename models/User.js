const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const CustomError = require('../CustomError');

let userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: {type: String, unique: true, lowercase: true, trim: true},
    skillSets: [{type: String}],
    hobby: [{type: String}]
}, {timestamps: true});

/**
 * @typedef {Object} User
 * @property id
 * @property name
 * @property email
 */
class UserClass {

    /**
     * Get all users
     *
     * @function User.GetAll
     * @param {Object} [filter]
     * @returns {Promise<Object[]>}
     */
    static async GetAll(filter) {
        if (typeof filter === 'undefined') {
            filter = {};
        }
        if (typeof filter !== 'object') {
            throw new CustomError('filter has to be an object', HttpStatus.BAD_REQUEST);
        }
        return await User.find(filter).exec();
    }

    /**
     * Create a new user
     * @function User.NewUser
     *
     * @param {Object} userDetails
     * @param {Object} [options]
     * @returns {Promise<Object>}
     */
    static async NewUser(userDetails, options) {
        if (!userDetails) {
            throw new CustomError('Fields cannot be empty.', HttpStatus.BAD_REQUEST);
        }

        let user = new User(userDetails);
        await user.save(options);

        user.password = undefined;
        return user;
    }

    /**
     * Get user details by ID
     *
     * @function User.GetUser
     * @param {string} userId
     * @returns {Promise<Object>}
     * @throws {CustomError}
     */
    static async GetUser(userId) {
        if (!userId) {
            throw new CustomError('parameter userId is required.', HttpStatus.BAD_REQUEST);
        }
        let user = await User.findById(userId);
        if (!user) {
            throw new CustomError(`User ${userId} was not found.`, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    /**
     * Edit a user
     *
     * @function User.Edit
     * @param {String} userId
     * @param {Object} userDetails
     * @returns {Promise<Object>}
     */
    static async Edit(userId, userDetails) {
        if (!userId) {
            throw new CustomError('userId is required.', HttpStatus.BAD_REQUEST);
        }
        if (!userDetails) {
            throw new CustomError('userDetails is required.', HttpStatus.BAD_REQUEST);
        }

        let user = await User.findByIdAndUpdate(userId, userDetails, {new: true}).exec();
        if (!user) {
            throw new CustomError(`User ${userId} was not found.`, HttpStatus.NOT_FOUND);
        }

        return user;
    }


    /**
     * Delete a user
     *
     * @function User.Delete
     * @param {String} userId
     * @returns {Promise<Object>}
     */
    static async Delete(userId) {
        if (!userId) {
            throw new CustomError('userId is required.', HttpStatus.BAD_REQUEST);
        }

        let user = await User.findByIdAndDelete(userId).exec();
        if (!user) {
            throw new CustomError(`User ${userId} was not found.`, HttpStatus.NOT_FOUND);
        }

        return user;
    }

}

userSchema.loadClass(UserClass);


/**
 * @class User
 */
let User = mongoose.model('User', userSchema);

module.exports = User;
