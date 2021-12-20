export class UserData {

    public firstName: string = null;
    public lastName: string = null;
    public username: string = null;
    public email: string = null;
    public password: string = null;
    public companyName: string = null;
    public companyPosition: string = null;

    public isBusinessHolder: boolean = false;
    public pendingActivation: boolean = false;

    public constructor (userData: UserData) {
        for (const key in userData) {
            if (this.hasOwnProperty(key)) {
                this[key] = userData[key]
            }
        }
    }

}
