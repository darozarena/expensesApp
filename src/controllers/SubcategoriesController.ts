import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, requestBody, requestParam, response } from "inversify-express-utils";
import { checkJwt } from '../middlewares/checkJwt';
import TYPES from '../utils/ioc/types';
import { SubcategoriesService } from '../services';
import { Ok } from './http/200/Ok';
import { IdentifierDTO } from '../models/Base';
import { SubcategoryCreateRequest, SubcategoryUpdateRequest } from '../dto/SubcategoryDTO';

@controller('/subcategories', checkJwt)
export class SubcategoriesController implements interfaces.Controller {

  constructor(
    @inject(TYPES.SubcategoriesService) private subcategoriesService: SubcategoriesService
  ){}

    @httpGet('/')
    public async getAll(
      @requestParam('email') email: string,
      @response() res: express.Response
      ) {
      return Ok.send(res, await this.subcategoriesService.getAll(email));
    }

    @httpGet('/:id')
    public async getOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.subcategoriesService.getOne(id));
    }

    @httpPost('/')
    public async create(
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const createRequest = SubcategoryCreateRequest.build(body);
      return Ok.send(res, await this.subcategoriesService.create(createRequest));
    }

    @httpPut('/:id')
    public async update(
      @requestParam('id') id: IdentifierDTO,
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const updateRequest = SubcategoryUpdateRequest.build(body);
      return Ok.send(res, await this.subcategoriesService.update(id, updateRequest));
    }

    @httpDelete('/:id')
    public async deleteOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.subcategoriesService.deleteOne(id));
    }
}
