import Catatan from "../models/CatatanModel.js";

export const getCatatan = async(req, res)=>{
    try{
        const response = await Catatan.findAll();
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const getCatatanById = async(req, res)=>{
    try{
        const response = await Catatan.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const createCatatan = async(req, res)=>{
    try{
        await Catatan.create(req.body);
        res.status(201).json({msg: "Catatan Created"});
    } catch (error){
        console.log(error.message);
    }
}

export const updateCatatan = async(req, res)=>{
    try{
        await Catatan.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Catatan Updated"});
    } catch (error){
        console.log(error.message);
    }
}

export const deleteCatatan = async(req, res)=>{
    try{
        await Catatan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Catatan Deleted"});
    } catch (error){
        console.log(error.message);
    }
}