import  express from 'express'
import {signup,login, protect, logout, removeCookie} from '../controller/authController'
import {getOneUser,updatedMe,uploadUserPhoto, resizeUserPhoto} from '../controller/userController'
const router = express.Router()


router.route('/signup').post(signup)
router.route('/login').post(login)
router.get('/logout', logout)
router.route('/user/:id').get(protect,removeCookie,getOneUser)
router.patch('/user/:id', uploadUserPhoto,resizeUserPhoto, protect,updatedMe)
export default router