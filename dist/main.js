"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
async function bootstrap() {
    var port;
    let httpsOptions = null;
    if (process.env.NODE_ENV == "prod") {
        const keyPath = "/root/nginx-ssl/certbot/conf/live/chat-roulet.ru/privkey.pem";
        const certPath = "/root/nginx-ssl/certbot/conf/live/chat-roulet.ru/fullchain.pem";
        httpsOptions = {
            key: (0, fs_1.readFileSync)(keyPath),
            cert: (0, fs_1.readFileSync)(certPath),
        };
        port = 443;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    port = Number(process.env.PORT);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Чат-рулетка')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/swagger', app, document);
    app.useStaticAssets('/root/chatclient/dist');
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    console.log("PORT: ", port);
    await app.listen(port, () => console.log(`Server was started: http://localhost:${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map