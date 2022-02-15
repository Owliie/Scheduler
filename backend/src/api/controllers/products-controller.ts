import { AuthenticatedRequest } from '../common/authenticated-request'
import { Response } from 'express'
import { ProductService } from '../../services'
import { ProductModel } from '../../models/product-model'
import { responseUtils } from '../../utils/response-utils.js'

class ProductsController {

    public allForUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        res.json(await ProductService.getAllForUser(req.user?.id))
    }

    public create = (req: AuthenticatedRequest, res: Response): void => {
        const product: ProductModel = {
            name: req.body.name,
            price: req.body.price,
            durationInMinutes: req.body.durationInMinutes,
            businessOwner: req.user?.id
        }

        ProductService.create(product)
            .then(result => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while creating the product.'))
    }

    public update = (req: AuthenticatedRequest, res: Response): void => {
        const id = req.params.id
        const newBody = {
            name: req.body.name,
            price: req.body.price,
            durationInMinutes: req.body.durationInMinutes
        }

        ProductService.update(id, newBody)
            .then(result => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while updating the product.'))
    }

    public delete = (req: AuthenticatedRequest, res: Response): void => {
        const id = req.params.id
        ProductService.delete(id)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while deleting the product.'))
    }

}

export default new ProductsController()
