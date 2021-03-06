/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { UpdateResult, InsertResult, DeleteResult } from "typeorm";

import * as CatDAO from "../model/DAO/Cat";
import Cat from "../model/entity/Cat";


const selectCat = (catId: number): Promise<Cat|undefined> => CatDAO.selectCat(catId);

const updateCatRainbow = (catId:number, strRainbow:string): Promise<UpdateResult> => CatDAO.updateRainbow(catId, strRainbow);

const getCatFollower = (catId:string): Promise<Array<object>> => CatDAO.getFollower(catId);

const addCatToday = (catId: number, catToday: string, catTodayTime: string): Promise<UpdateResult> => CatDAO.addCatToday(catId, catToday, catTodayTime);

const updateCatCut = (catId: number, catCut: string): Promise<UpdateResult> => CatDAO.updateCut(catId, catCut);

const addCat = (catNickname:string, coordinate:string, address:string, catDescription:string,
    catSpecies:string, userId: number, cut:object): Promise<InsertResult> => CatDAO.addCat(catNickname, coordinate, address, catDescription, catSpecies, userId, cut);

const getCat = (catId: string):Promise<Cat|undefined> => CatDAO.getCat(catId);

const getCatsBylocation = (location:{ NElatitude : number, NElongitude : number, SWlatitude : number, SWlongitude : number }, userId:number):Promise<Array<object>> => CatDAO.getCatsBylocation(location, userId);

const deleteCat = (deleteId: number):Promise<DeleteResult> => CatDAO.deleteCat(deleteId);

const insertFollow = (catId:number, userId:number):Promise<InsertResult> => CatDAO.insertFollow(catId, userId);

const deleteFollow = (catId:number, userId:number):Promise<DeleteResult> => CatDAO.deleteFollow(catId, userId);

const checkFollow = (catId:number, userId:number):Promise<Array<{count: string}>> => CatDAO.checkFollow(catId, userId);
export {
    selectCat,
    updateCatCut,
    updateCatRainbow,
    getCat,
    getCatFollower,
    addCat,
    addCatToday,
    getCatsBylocation,
    deleteCat,
    insertFollow,
    deleteFollow,
    checkFollow,
};
