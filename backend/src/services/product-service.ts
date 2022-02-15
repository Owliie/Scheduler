import { Repository } from '../data/repositories'
import { ProductModel } from '../models/product-model'
import { Appointment, Product } from '../data/models'
import { TaskResult } from '../common/taskResult'
import { ProductColumns } from '../data/models/product-columns'
import { AppointmentModel } from '../models/appointment-model'
import { AppointmentColumns } from '../data/models/appointment-columns'
import { QueryArgsHelper } from '../utils/query-args-helper'

class ProductService {

    private productsData: Repository<ProductModel>
    private appointmentsData: Repository<AppointmentModel>

    public constructor (productsData: Repository<ProductModel>, appointmentsData: Repository<AppointmentModel>) {
        this.productsData = productsData
        this.appointmentsData = appointmentsData
    }

    public getAllForUser (userId: string) {
        const filter = { [ProductColumns.businessOwner]: userId }
        const projection = QueryArgsHelper.build(
            ProductColumns.name,
            ProductColumns.price,
            ProductColumns.durationInMinutes
        )
        const options = {
            sort: ProductColumns.name
        }

        return this.productsData.filter(filter, projection, options)
    }

    public async create (product: ProductModel): Promise<TaskResult> {
        return this.productsData.create(product)
            .then((createdProduct) => TaskResult.success('Product created successfully.', createdProduct))
            .catch((err) => TaskResult.failure('Error while saving the product.', err))
    }

    public async delete (id: string): Promise<TaskResult> {
        if (await this.appointmentsData.exists({ [AppointmentColumns.product]: id })) {
            return TaskResult.failure('There is appointment associated with this product. Please delete the appointment first.')
        }

        return this.productsData.delete(id)
            .then(() => TaskResult.success('The product was deleted'))
            .catch((err: any) => TaskResult.failure('Error while deleting the product.', err))
    }

    public update (id: string, newData: any): Promise<TaskResult> {
        return this.productsData.update(id, newData)
            .then(() => TaskResult.success('The product were updated successfully.'))
            .catch((err: any) => TaskResult.failure('Error while updating the product', err))
    }

}

export default new ProductService(new Repository<ProductModel>(Product), new Repository<AppointmentModel>(Appointment))
