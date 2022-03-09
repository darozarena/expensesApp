import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces, response, requestParam, httpPost, requestBody, httpPut, httpDelete } from 'inversify-express-utils';
import { checkJwt } from '../middlewares/checkJwt';
import TYPES from '../utils/ioc/types';
import { CategoriesService } from '../services';
import { Ok } from './http/200/Ok';
import { IdentifierDTO } from '../models/Base';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../dto/CategoryDTO';

@controller('/categories', checkJwt)
export class CategoriesController implements interfaces.Controller {

  constructor(
    @inject(TYPES.CategoriesService) private categoriesService: CategoriesService
    ){}

    @httpGet('/')
    public async getAll(
      @requestParam('email') email: string,
      @response() res: express.Response
      ) {
      return Ok.send(res, await this.categoriesService.getAll(email));
    }

    @httpGet('/:id')
    public async getOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.categoriesService.getOne(id));
    }

    @httpPost('/')
    public async create(
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const createRequest = CategoryCreateRequest.build(body);
      return Ok.send(res, await this.categoriesService.create(createRequest));
    }

    @httpPut('/:id')
    public async update(
      @requestParam('id') id: IdentifierDTO,
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const updateRequest = CategoryUpdateRequest.build(body);
      return Ok.send(res, await this.categoriesService.update(id, updateRequest));
    }

    @httpDelete('/:id')
    public async deleteOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.categoriesService.deleteOne(id));
    }
}
