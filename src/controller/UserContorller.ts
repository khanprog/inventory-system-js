import mongoose from "mongoose"
import { Request, Response } from "express"
import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserSchema } from "../models/UserModel"


const User = mongoose.model("user", UserSchema)

export class UserController {
    public signUpUser(req: Request, res: Response) {
        let { email } = req.body
        User.findOne({ "email": email }, (err: any, existingUser: any) => {
            if (err) {
                res.status(400).send(err)
            }
            if (existingUser) {
                res.status(200).json({ "message": `${email} already exist please login` })
            } else {
                let { password } = req.body
                let passHash = brcypt.hashSync(password, 10)
                req.body.password = passHash

                let user = new User(req.body)

                user.save((err, newUser) => {
                    if (err) {
                        res.status(400).send(err)
                    }

                    const token = jwt.sign({ user_id: newUser._id, role: 0, status: "pending" }, process.env.TOKEN_SECRET!, { expiresIn: "2m" })
                    let data = { "token": token }

                    res.cookie("token", token, { maxAge: 120 * 1000 })
                    res.status(200).json(newUser)
                })
            }
        })

    }

    public loginUser(req: Request, res: Response) {
        let { email, password } = req.body

        User.findOne({ "email": email }, (err: any, u: any) => {
            if (err) {
                res.status(400).send(err)
            }
            if (!brcypt.compareSync(password, u.password)) {
                res.status(401).json({ "message": "email or password is incorrect" })
            } else {
                const token = jwt.sign({ user_id: u._id, role: u.role, status: u.status }, process.env.TOKEN_SECRET!, { expiresIn: "2m" })
                let data = { "token": token }

                res.cookie("token", token, { maxAge: 120 * 1000 })
                res.status(200).json(u)
            }
        })
    }

    public logoutUser(req: Request, res: Response) {
        let { id } = req.body
        let token = { "token": "" }
        User.findOneAndUpdate({ _id: id }, token, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.cookie("token", "", { maxAge: 0})
            res.json({ "message": "user logged out" });
        });
    }

    public getAllUsers(req: Request, res: Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).json(users)
            }
        })
    }

    public getUserByID(req: Request, res: Response) {
        let { userid } = req.params
        User.findById(userid, (err: any, user: any) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).json(user)
            }
        })
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userid }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.deleteOne({ _id: req.params.userid }, (err: any) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    }

}