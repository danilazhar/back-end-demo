const User = require('../models/User');
const CustomError = require('../CustomError');

class UserController {
    /**
     * Get all Users
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async GetAll(req, res) {
        try {
            let users = await User.GetAll(req.query);
            res.json({
                msg: 'Users were listed successfully',
                users
            });
        } catch (err) {
            CustomError.Handle(err, res);
        }
    }

    /**
     * Register a new user
     *
     * @param req
     * @param res
     * @returns {Promise<Response | * | createServer.NextHandleFunction | Promise<*>>}
     */
    static async NewUser(req, res) {
        try {
            let userDetails = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                skillSets: req.body.skillSets,
                hobby: req.body.hobby
            }
            let user = await User.NewUser(userDetails);
            return res.json({
                msg: 'User was created successfully.',
                item: user
            });
        } catch (err) {
            CustomError.Handle(err, res);
        }
    }

    /**
     * Fetch user details with userId
     *
     * @param req
     * @param req.params.userId
     * @param res
     * @returns {Promise<void>}
     */
    static async GetUser(req, res) {
        try {
            let user = await User.GetUser(req.params.userId);
            res.json(user);
        } catch (err) {
            CustomError.Handle(err, res);
        }
    }

    /**
     * Edit an existing Template
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async Edit(req, res) {
        try {
            let userDetails = req.body;
            userDetails.updatedBy = req.params.userId;
            let user = await User.Edit(req.params.userId, userDetails);
            res.json({
                msg: 'User was updated successfully.',
                item: user
            });
        } catch (err) {
            CustomError.Handle(err, res);
        }
    }

    /**
     * Delete a user
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async Delete(req, res) {
        try {
            let user = await User.Delete(req.params.userId);
            res.json({
                msg: 'User was deleted successfully',
                item: user
            });
        } catch (err) {
            CustomError.Handle(err, res);
        }
    }
}

module.exports = UserController;
