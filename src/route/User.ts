/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from "express";
import { UpdateResult } from "typeorm";
import { getUserIdbyAccessToken } from "../library/jwt";
import { getEncryPw } from "../library/crypto";
import { User } from "../model";
import { UserService } from "../service";

const router:express.Router = express.Router();

router.patch("/changepw", async (req:express.Request, res:express.Response) => {
    const { password, newPassword }:{password:string, newPassword:string } = req.body;
    const { accessToken }:{accessToken:string} = req.signedCookies;

    try {
        const userId = getUserIdbyAccessToken(accessToken);
        const user:User|undefined = await UserService.getUserById(userId);
        if (!user) {
            res.status(401).send("Fail to get User");
            return;
        }

        // ? 암호화 후 비교
        const encryPassword:string = await getEncryPw(password, user.salt);
        if (encryPassword !== user.password) {
            res.status(402).send("Incorrect Password.");
            return;
        }
        // ? 새로운 Password 암호화
        const encryNewPassword:string = await getEncryPw(newPassword, user.salt);
        const result:UpdateResult = await UserService.updateUserPw(encryNewPassword, userId);

        if (result.raw.changedRows) {
            res.status(201).send("password successfully changed");
            return;
        }
        res.status(409).send("Failed to change user password");
    } catch (e) {
        res.status(400).send(e);
    }
});


export default router;
