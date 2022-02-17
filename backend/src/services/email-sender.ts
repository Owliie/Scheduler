import { EmailModel } from '../models/common/email-model'
import { utils } from '../utils'
import { TaskResult } from '../common/taskResult'

const nodemailer = require('nodemailer')

class EmailSender {

    private sender: any

    public constructor () {
        if (!utils.toBoolean(process.env.TESTING_EMAIL)) {
            this.sender = nodemailer.createTransport({
                service: process.env.EMAIL_PROVIDER,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
        }
    }

    public async sendEmail (email: EmailModel): Promise<TaskResult> {
        let from = process.env.EMAIL_USERNAME
        if (utils.toBoolean(process.env.TESTING_EMAIL)) {
            const testAccount = await nodemailer.createTestAccount()
            this.sender = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            })

            from = testAccount.user
        }

        try {
            const result = await this.sender.sendMail({ from, ...email })
            return TaskResult.success(`Email to: ${email.to} was sent.`, result)
        } catch (err) {
            return TaskResult.failure('Error while sending the email.', err)
        }
    }

}

export default new EmailSender()
