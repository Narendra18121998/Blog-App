import  express from "express";
const router = express.Router();
import { userRegistration, userLogin} from "../controllers/auth-controller.js";
import { getAllblogs , addNewblog,getSingleblog} from "../controllers/blog-controller.js";
import { addNewCategory,getAllCategories } from "../controllers/category-controller.js";
import checkIsUserAuthenticated from "../middlewares/auth-middleware.js";
import multer from "multer";
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`public/upload/`)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})

router.post('/user/register' , userRegistration)
router.post('/user/login' , userLogin)

//protected routes
router.get('/get/allblogs' ,checkIsUserAuthenticated, getAllblogs)
router.post('/add/blog' , upload.single("thumbnail") ,checkIsUserAuthenticated, addNewblog)
router.get('/get/blog/:id' ,checkIsUserAuthenticated,getSingleblog)

router.post('/add/category',checkIsUserAuthenticated,addNewCategory)
router.get('/get/categories',checkIsUserAuthenticated,getAllCategories)
export default router;
