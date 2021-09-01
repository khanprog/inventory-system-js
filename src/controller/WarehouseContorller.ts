import {Request, Response} from "express"
import mongoose from "mongoose"
import { WarehouseSchema } from "../models/WarehouseModel"

const Warehouse = mongoose.model("warehouse", WarehouseSchema)

export class WarehouseController{
    public addWarehouse(req: Request, res: Response){
        let {name} = req.body
        Warehouse.findOne({"name": name}, (err: any, existingWarehouse: any)=>{
            if (err) {
                res.status(400).send(err)
            }

            if(existingWarehouse){
                res.status(200).json({ "message": `${name} already exist`})
            }else{
                let warehouse = new Warehouse(req.body)
                warehouse.save((err, wh)=>{
                    if(err){
                        res.status(400).send(err)
                    }else{
                        res.status(200).json(wh)
                    }
                })
            }
        })

    }

    public getAllWarehouses(req: Request, res: Response){
        Warehouse.find({}, (err, wh)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json(wh)
            }
        })
    }

    public getWarehouseById(req: Request, res: Response){
        let {wid} = req.params
        Warehouse.findById(wid, (err: any, wh: any)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json(wh)
            }
        })
    }

    public removeWarehouse(req: Request, res: Response){
        Warehouse.deleteOne({ _id: req.params.wid }, (err: any) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted warehouse!'});
        });
    }
}