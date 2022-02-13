export class TaskResult {

    private readonly _isSuccessful: boolean
    private readonly _message: string
    private readonly _data: string;

    private constructor (success: boolean, message: string = '', data: any = {}) {
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

    public static failure (errorMessage: string, data: any = {}): TaskResult {
        return new TaskResult(false, errorMessage, data)
    }

    public static success (successMessage: string, data: any = {}): TaskResult {
        return new TaskResult(true, successMessage, data)
    }

}
