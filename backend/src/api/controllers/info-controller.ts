import { Request, Response } from 'express'

class InfoController {

    public ping = async (req: Request, res: Response): Promise<void> => {
        res.json('OK')
    }

}

export default new InfoController()
