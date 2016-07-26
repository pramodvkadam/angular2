"use strict";
var Statement = (function () {
    function Statement(Season, CampsiteId, PaymentType, FromDate, ToDate, AccountId) {
        this.Season = Season;
        this.CampsiteId = CampsiteId;
        this.PaymentType = PaymentType;
        this.FromDate = FromDate;
        this.ToDate = ToDate;
        this.AccountId = AccountId;
    }
    return Statement;
}());
exports.Statement = Statement;
//# sourceMappingURL=statement.js.map