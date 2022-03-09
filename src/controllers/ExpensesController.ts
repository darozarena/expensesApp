import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces, response, requestParam, httpPost, httpPut, requestBody, httpDelete } from 'inversify-express-utils';
import { checkJwt } from '../middlewares/checkJwt';
import TYPES from '../utils/ioc/types';
import { ExpensesService } from '../services';
import { Ok } from './http/200/Ok';
import { IdentifierDTO } from '../models/Base';
import { ExpenseCreateRequest, ExpenseUpdateRequest } from '../dto/ExpenseDTO';

@controller('/expenses', checkJwt)
export class ExpensesController implements interfaces.Controller {

  constructor(
    @inject(TYPES.ExpensesService) private expensesService: ExpensesService
    ){}

    @httpGet('/')
    public async getAll(
      @requestParam('email') email: string,
      @response() res: express.Response
      ) {
      return Ok.send(res, await this.expensesService.getAll(email));
    }

    @httpGet('/:id')
    public async getOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.expensesService.getOne(id));
    }

    @httpPost('/')
    public async create(
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const createRequest = ExpenseCreateRequest.build(body);
      return Ok.send(res, await this.expensesService.create(createRequest));
    }

    @httpPut('/:id')
    public async update(
      @requestParam('id') id: IdentifierDTO,
      @requestBody() body,
      @response() res: express.Response,
      ) {
      const updateRequest = ExpenseUpdateRequest.build(body);
      return Ok.send(res, await this.expensesService.update(id, updateRequest));
    }

    @httpDelete('/:id')
    public async deleteOne(
      @requestParam('id') id: IdentifierDTO,
      @response() res: express.Response,
      ) {
      return Ok.send(res, await this.expensesService.deleteOne(id));
    }
}
