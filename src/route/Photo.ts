/* eslint-disable no-unused-vars */
import express from "express";
import { UpdateResult } from "typeorm";
import { getUserIdbyAccessToken } from "../library/jwt";
import { User } from "../model";
import { PhotoService, UserService } from "../service";
import uploadFile from "../library/ImageFunction/imgupload";
import deleteFile from "../library/ImageFunction/imgdelete";
import { helper } from "../library/errorHelper";

const router:express.Router = express.Router();

router.get("/album/:catId", helper(async (req:express.Request, res:express.Response) => {
    const { catId }:{catId?: string} = req.params;
    const getPhoto:Array<object> = await PhotoService.getCatAlbum(catId);
    if (!getPhoto) {
        res.status(409).send("Photo not found");
    }
    res.status(200).send(getPhoto);
}));

router.post("/profile/delete", helper(async (req: express.Request, res:express.Response) => {
    const { accessToken }:{accessToken:string} = req.signedCookies;

    const userId = getUserIdbyAccessToken(accessToken);

    const updatePic:UpdateResult = await PhotoService.deleteProfile(userId);
    if (updatePic.raw.changedRows === 0) {
        res.status(409).send("Failed to delete profile picture");
        return;
    }
    const findkey:User|undefined = await UserService.getUserById(userId);
    if (!findkey?.photoName || !findkey) {
        res.status(409).send("Failed to update profile picture");
        return;
    }
    const check:boolean|unknown = await deleteFile(findkey.photoName);
    if (check === false) {
        res.status(409).send("Failed to delete picture from image bucket");
    }
    res.status(201).send("Successfully deleted profile picture");
}));

//! S3에 데이터 저장 후 그 주소를 받아와 데이터베이스에 저장 및 클라이언트에 보내줘야 함.
router.post("/profile", helper(async (req:express.Request, res:express.Response) => {
    const { photoPath }:{ photoPath:string} = req.body;
    const { accessToken }:{accessToken:string} = req.signedCookies;

    const userId = getUserIdbyAccessToken(accessToken);

    const getProfile:User | undefined = await UserService.getUserById(userId);
    if (!getProfile) {
        res.status(409).send("Failed to update profile picture");
        return;
    }
    if (getProfile?.photoPath === null) {
        const secretCode = Math.random().toString(36).slice(4);
        const photoName = secretCode + userId;
        const imagepath:string|boolean = await uploadFile(photoName, photoPath);
        if (typeof (imagepath) === "boolean") {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        const updatePic:UpdateResult = await PhotoService.updateProfile(userId, imagepath, photoName);
        if (updatePic.raw.changedRows === 0) {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        res.status(201).send({ photoPath: imagepath });
    } else {
        const findkey:User|undefined = await UserService.getUserById(userId);
        if (!findkey?.photoName || !findkey) {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        const check:boolean|unknown = await deleteFile(findkey.photoName);
        if (!check) {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        const secretCode = Math.random().toString(36).slice(4);
        const photoName = secretCode + userId;
        const imagepath:string|boolean = await uploadFile(photoName, photoPath);
        if (typeof (imagepath) === "boolean") {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        const updatePic:UpdateResult = await PhotoService.updateProfile(userId, imagepath, photoName);
        if (updatePic.raw.changedRows === 0) {
            res.status(409).send("Failed to update profile picture");
            return;
        }
        res.status(201).send({ photoPath: imagepath });
    }
}));

export default router;
