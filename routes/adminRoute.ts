import  express  from "express";
import {getAllUser,updateOneAdmin, getOneUser, getAllUserFromName, createOneAdmin,multerImage,resizeMulterImage} from '../controller/adminController'
import {protect} from '../controller/authController'
const router  =express.Router()

router.route('/admin/users').get(protect,getAllUser).patch(updateOneAdmin)
 router.route('/admin/user/id/:id').get(getOneUser)
router.get('/admin/search',getAllUserFromName)
router.post('/admin/newadmin',multerImage,resizeMulterImage,createOneAdmin)
export default router