import { Router, Request, Response } from 'express';
import OrphanagersController from './controllers/OrphanagersController';
import uploadConfig from './config/upload'
import multer from 'multer'

const upload = multer(uploadConfig)



const routes = Router();

routes.get('/orphanages', OrphanagersController.index);
routes.get('/orphanages/:id', OrphanagersController.show);
routes.post('/orphanages', upload.array('images'), OrphanagersController.create);

export default routes;
