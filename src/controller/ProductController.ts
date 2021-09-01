import {Request, Response} from "express"
import mongoose from "mongoose"
import { ProductSchema } from "../models/ProductModel"

const Product = mongoose.model("product", ProductSchema)

export class ProductController{
    public addProduct(req: Request, res: Response){
        let {title} = req.body
        Product.findOne({"title": title}, (err: any, existingProduct: any)=>{
            if (err) {
                res.status(400).send(err)
            }

            if(existingProduct){
                res.status(200).json({ "message": `${title} already exist`})
            }else{
                let warehouse = new Product(req.body)
                warehouse.save((err, product)=>{
                    if(err){
                        res.status(400).send(err)
                    }else{
                        res.status(200).json(product)
                    }
                })
            }
        })
    }

    public getAllProducts(req: Request, res: Response){
        Product.find({}, (err, product)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json(product)
            }
        })
    }

    public getProductById(req: Request, res: Response){
        let {pid} = req.params
        Product.findById(pid, (err: any, product: any)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json(product)
            }
        })
    }

    public updateProduct(req: Request, res: Response){
        let {isStock, isUnstock} = req.body

        if(isStock){
            Product.findById({_id: req.params.pid}, (err: any, product: any)=>{
                if(err){
                      res.status(400).send(err);
                }
                let {stock} = req.body
                product.stock += stock

                Product.findOneAndUpdate({ _id: req.params.pid }, product, { new: true }, (err, product) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(product);
                });

            })
        }else if(isUnstock){
            Product.findById({_id: req.params.pid}, (err: any, product: any)=>{
                if(err){
                      res.status(400).send(err);
                }
                let {stock} = req.body
                product.stock -= stock

                Product.findOneAndUpdate({ _id: req.params.pid }, product, { new: true }, (err, product) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(product);
                });

            })
        }else{
            Product.findOneAndUpdate({ _id: req.params.pid }, req.body, { new: true }, (err, product) => {
                if(err){
                    res.status(400).send(err);
                }
                res.status(200).json(product);
            });
        }
    }

    public removeProduct(req: Request, res: Response){
        Product.deleteOne({ _id: req.params.pid }, (err: any) => {
            if(err){
                res.status(400).send(err);
            }
            res.status(200).json({ message: 'Successfully deleted Product!'});
        });
    }
}