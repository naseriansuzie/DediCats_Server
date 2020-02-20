/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { UpdateResult, getConnection } from "typeorm";
import User from "../entity/User";

const queryManager = getConnection().createQueryBuilder();

const getUserById = async (id:number):Promise<User|undefined> => {
    const user:User|undefined = await queryManager
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id })
        .getOne();

    return user;
};

const updateUserPw = async (password:string, id:number):Promise<UpdateResult> => {
    const updateResult:UpdateResult = await queryManager
        .update(User)
        .set({ password })
        .where({ id })
        .execute();

    return updateResult;
};

const getUserByEmail = async (email:string):Promise<User|undefined> => {
    const user:User|undefined = await queryManager
        .select("user")
        .from(User, "user")
        .where("user.email = :email", { email })
        .getOne();

    return user;
};

const updateToken = async (id:number, refreshToken:string|null):Promise<UpdateResult> => {
    const updateResult:UpdateResult = await getConnection().createQueryBuilder()
        .update(User).set({ refreshToken })
        .where({ id })
        .execute();

    return updateResult;
};

export {
    getUserById, updateUserPw, getUserByEmail, updateToken,
};
