"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        abortOnError: false,
    });
    await app.listen(8088);
}
bootstrap().catch((err) => {
    var _a;
    fs.writeFileSync('graph.json', (_a = core_1.PartialGraphHost.toString()) !== null && _a !== void 0 ? _a : '');
    process.exit(1);
});
//# sourceMappingURL=main.js.map