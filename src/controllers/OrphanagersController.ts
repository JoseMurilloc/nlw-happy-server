import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import * as Yup from 'yup';

import orphanagesView from '../views/orphanage_view';
// import imagesView from '../views/images_view';

class OrphanagersController {

  async index (request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: {
        pending: true,
      }
    });

    return response.json(orphanagesView.renderMany(orphanages));
  }

  async show (request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
      where: {
        pending: true,
      }
    });

    return response.json(orphanagesView.render(orphanage));
  }

  async create (request: Request, response: Response) {


    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const parserOpenOnWeekends = open_on_weekends === 'true' ? true : false;

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: parserOpenOnWeekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage)

    return response.status(201).json({ orphanage });
  }

  async delete(request: Request, response: Response) {

    try {
      const { id } = request.params;
      const orphanagesRepository = getRepository(Orphanage);

      await orphanagesRepository.delete(id)

      return response.status(204).json()
    } catch(err) {
      console.log(err);
    }
  }
}

export default new OrphanagersController();
