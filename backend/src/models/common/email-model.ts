export interface EmailModel {
    from?: string;
    to: string;
    subject: string;
    html: string;
}
