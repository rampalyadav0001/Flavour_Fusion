import { Router } from "express";
import {registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, upadateAccountDetails, updateUserAvatar, getCurrentUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changePassword)

router.route("/update-account").patch(verifyJWT,upadateAccountDetails)

router.route("/avatar").patch (verifyJWT,upload.single("avatar"), updateUserAvatar)

router.route("/current-user").get(verifyJWT,getCurrentUser)

export default router;