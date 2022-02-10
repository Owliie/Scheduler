export class TaskResult {

    private readonly _isSuccessful: boolean
    private readonly _message: string

    private constructor (success: boolean, message: string = '') {
        this._isSuccessful = success
        this._message = message
    }

    public get isSuccessful (): boolean {
        return this._isSuccessful
    }

    public get message () {
        return this._message
    }

    public static failure (errorMessage: string): TaskResult {
        return new TaskResult(false, errorMessage)
    }

    public static success (successMessage: string): TaskResult {
        return new TaskResult(true, successMessage)
    }

}
