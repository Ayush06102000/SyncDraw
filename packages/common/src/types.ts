import {z} from "zod"

export const signupSchema = z.object({
    username:z.string({required_error:"username is required"}).min(3),
    password:z.string({required_error:"Password is required"}).min(8,"password should be atleast 8 character long").max(32,"Password must be atleast 32 characters")
})

export const signinSchema = z.object({
    username:z.string({required_error:"Username is required"}),
    password:z.string({required_error:"Password is required"})
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
})