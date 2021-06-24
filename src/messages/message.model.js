"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var Message = /** @class */ (function () {
    function Message(text, error, responses) {
        if (error === void 0) { error = false; }
        this.text = text;
        this.error = error;
        this.responses = responses;
    }
    return Message;
}());
exports.Message = Message;
