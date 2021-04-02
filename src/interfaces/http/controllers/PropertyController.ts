import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ok } from '../processors/response';
import { PropertyApplication } from '@application/property/PropertyApplication';

@controller('/api/v1/properties')
export class PropertyController {
  constructor(
    @inject(TYPES.PropertyApplication)
    private readonly service: PropertyApplication
  ) {}

  @httpGet('/:id')
  async getPropertyById(@request() req: Request, @response() res: Response) {
    const property = await this.service.getPropertyById(req.params.id);
    return res.json(ok(property, `Successfully retrieved a property with an ID of ${req.params.id}`));
  }

  @httpPost('/')
  async createProperty(@request() req: Request, @response() res: Response) {
    const { body } = req;
    await this.service.createProperty(body);
    return res.json({
      status: '000',
      message: 'Success'
    });
  }
}
