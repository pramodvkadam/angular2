"use strict";
var Statement = (function () {
    function Statement(Season, CampsiteId, PaymentType, FromDate, ToDate, AccountId, statementDate) {
        this.Season = Season;
        this.CampsiteId = CampsiteId;
        this.PaymentType = PaymentType;
        this.FromDate = FromDate;
        this.ToDate = ToDate;
        this.AccountId = AccountId;
        this.statementDate = statementDate;
    }
    return Statement;
}());
exports.Statement = Statement;
var statementOptions = (function () {
    function statementOptions() {
    }
    return statementOptions;
}());
exports.statementOptions = statementOptions;
;
//# sourceMappingURL=statement.js.map