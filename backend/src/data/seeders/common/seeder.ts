export interface Seeder {
    seed: () => Promise<void>;

    getSuccessMessage: () => string;

    getErrorMessage: (err: any) => string;
}
