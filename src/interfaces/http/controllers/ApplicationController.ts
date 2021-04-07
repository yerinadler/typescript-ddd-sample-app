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
import { ApplicationApplication } from '@application/application/ApplicationApplicationService';

@controller('/api/v1/applications')
export class BookController {
  constructor(
    @inject(TYPES.ApplicationApplication)
    private readonly service: ApplicationApplication
  ) {}

  @httpGet('/')
  async getAllBooks(@request() req: Request, @response() res: Response) {
    const books = await this.service.getAllApplications();
    return res.json(ok(books, 'Successfully retrieved all applications'));
  }

  @httpGet('/:id')
  async getBookById(@request() req: Request, @response() res: Response) {
    const book = await this.service.getApplicationById(req.params.id);
    return res.json(ok(book, `Successfully retrieved an application with an ID of ${req.params.id}`));
  }

  @httpPost('/')
  async createBook(@request() req: Request, @response() res: Response) {
    const { body } = req;
    await this.service.createApplication(body);
    return res.json({
      status: '000',
      message: 'Success'
    });
  }

  // @httpPut('/:id')
  // async updateBook(@request() req: Request, @response() res: Response) {
  //   const { id } = req.params;
  //   const { body } = req;
  //   await this.bookApplication.updateBook(id, body);
  //   return res.json({
  //     status: '000',
  //     message: 'Success'
  //   });
  // }

  // @httpDelete('/:id')
  // async deleteBook(@request() req: Request, @response() res: Response) {
  //   const { id } = req.params;
  //   await this.bookApplication.deleteBook(id);
  //   return res.json({
  //     status: '000',
  //     message: 'Success'
  //   });
  // }
}
