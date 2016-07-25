export class Statement {
    constructor(
        public Season: number,
        public CampsiteId: number,
        public PaymentType: number,
        public FromDate: any,
        public ToDate: any,
        public AccountId: string
    ) { }
}