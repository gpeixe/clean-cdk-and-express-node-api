export class UserAlreadyExistsError extends Error {
    constructor() {
        const message = 'User already exists.'
        super(message)
        this.stack = message
        this.name = 'UserAlreadyExistsError' 
    }
}