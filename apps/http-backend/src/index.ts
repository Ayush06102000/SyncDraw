import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {signupSchema} from "@repo/validation"
import { middleware } from './middleware';
const app = express();

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("initialized http server")
})

app.post("/signup",async(req:Request,res:Response)=>{
    const {username,password} = await signupSchema.parseAsync({
        username:req.body.username,
        password:req.body.password
    });

    const userId =1;
    const token = jwt.sign({
        userId
    },"JWT_SECRET")

    res.json({token})
    
})

app.post("/room",middleware,(req:Request,res:Response)=>{
     res.json({roomId : 123})
})


app.listen(3001);