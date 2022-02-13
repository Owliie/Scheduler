import { Repository } from '../data/repositories'
import { ProductModel } from '../models/product-model'
import { Product } from '../data/models'
import { TaskResult } from '../common/taskResult'

class ProductService {

    private productsData: Repository<ProductModel>

    public constructor (productsData: Repository<ProductModel>) {
        this.productsData = productsData
    }

    public async create (product: ProductModel): Promise<TaskResult> {
        return this.productsData.create(product)
            .then((createdProduct) => TaskResult.success('Product created successfully.', createdProduct))
            .catch((err) => TaskResult.failure('Error while saving the product.', err))
    }

}

export default new ProductService(new Repository<ProductModel>(Product))
