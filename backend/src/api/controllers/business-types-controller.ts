import { Request, Response } from 'express'
import { BusinessTypesService } from '../../services'

class BusinessTypesController {

    public all = async (req: Request, res: Response): Promise<any> => {
        return res.json(await BusinessTypesService.all())
    }

}

export default new BusinessTypesController()
