export class Statement {
    constructor(
        public Season: number,
        public CampsiteId: number,
        public PaymentType: number,
        public FromDate: any,
        public ToDate: any,
        public AccountId: string,
        public statementDate:any
    ) { }
}

export class statementOptions {
    public BookingPaymentType: number;
    public BookingSeason: number;
    public StartDate: string;
    public EndDate: string;
    public StatementDate: string;
    public CampsiteId: number;
    public AccountId: number;
    public InvoiceOnPdf: boolean;
    public AccountLocationId: string;
    public MailToAccount: string;
    public MailSendToAccount: string;
    public StatementNumber: number;
};