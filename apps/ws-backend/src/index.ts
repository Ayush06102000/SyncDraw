import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config';

const wss = new WebSocketServer({port:8080});

wss.on('connection',function connection(ws,request){
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);

        if (typeof decoded == 'object' && 'userId' in decoded){
            const userId = (decoded as JwtPayload).userId;
            console.log('Connecter userId:',userId);
        }
        else{
            ws.close();
            return;
        }
    }
    catch(error){
        console.log("JWT verification failed:",error);
        ws.close();
        return;
    }
    ws.on('message',function message(data){
        ws.send('pong');
    })
})