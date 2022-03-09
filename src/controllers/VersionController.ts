import * as express from 'express';
import { controller, httpGet, interfaces, response } from "inversify-express-utils";
import { Ok } from './http/200/Ok';

@controller('/version')
export class VersionController implements interfaces.Controller {

    @httpGet('/')
    public async getVersion(
      @response() res: express.Response
      ) {
      return Ok.send(res, { ok: true });
    }
}
