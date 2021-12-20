export class User {

    public firstName: string = null;
    public lastName: string = null;
    public username: string = null;
    public email: string = null;
    public password: string = null;
    public companyName: string = null;

    public constructor (userData: User) {
        for (const key in userData) {
            if (this.hasOwnProperty(key)) {
                this[key] = userData[key]
            }
        }
    }

}
