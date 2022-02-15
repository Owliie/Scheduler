export class TaskResult<T = any> {

    private readonly _isSuccessful: boolean
    private readonly _message: string
    private readonly _data: T

    private constructor (success: boolean, message: string = '', data: T = null) {
        this._isSuccessful = success
        this._message = message
        this._data = data
    }

    public get isSuccessful (): boolean {
        return this._isSuccessful
    }

    public get message () {
        return this._message
    }

    public get data () {
        return this._data
    }

    public static failure<TData = any> (errorMessage: string, data: TData = null): TaskResult {
        return new TaskResult<TData>(false, errorMessage, data)
    }

    public static success<TData = any> (successMessage: string, data: TData = null): TaskResult {
        return new TaskResult<TData>(true, successMessage, data)
    }

}
