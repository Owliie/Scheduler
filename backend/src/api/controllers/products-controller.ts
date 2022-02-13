import { AuthenticatedRequest } from '../common/authenticated-request'
import { Response } from 'express'
import { ProductService } from '../../services'
import { ProductModel } from '../../models/product-model'
import { responseUtils } from '../../utils/response-utils.js'

class ProductsController {

    public create = (req: AuthenticatedRequest, res: Response): void => {
        const product: ProductModel = {
            name: req.body.name,
            price: req.body.price,
            businessType: req.body.businessTypeId,
            businessOwner: req.user?.id
        }

        ProductService.create(product)
            .then(result => responseUtils.processTaskResult(res, result))
    }

}

export default new ProductsController()
