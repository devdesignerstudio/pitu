//logica de cada rotas
import {Request, Response} from 'express';
import {Link} from '../models/links'
import linksRepository from '../models/linksRepository';


const links : Link[] = [];
let proxyId = 1;

function generateCode(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i=0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

async function postLink(req: Request, res: Response){
    const link = req.body as Link;
    // link.id = proxyId++;
    link.code = generateCode();
    link.hits = 0;
    const result = await linksRepository.add(link);
    if (!result.id) return res.sendStatus(400);

    link.id = result.id!;
    // links.push(link);
    // res.send('POSTlink');
    res.status(201).json(link);
}

async function getLink(req: Request, res: Response){
    const code = req.params.code as string;
    // const link = links.find(item => item.code === code);
    const link = await linksRepository.findByCode(code);

    if (!link)
        res.sendStatus(404);
    else
        res.json(link);
    // res.send('GETlink stats');
}

async function hitLink(req: Request, res: Response){
    const code = req.params.code as string;
    // const index = links.findIndex(item => item.code === code);
    const link = await linksRepository.hit(code);

    // if (index === -1)
    if (!link)
        res.sendStatus(404)
    else{
        // links[index].hits!++;
        // res.json(links[index]);
        res.json(link);
    }
    // res.send('HITlink');
}

export default {
    postLink,
    getLink,
    hitLink
}