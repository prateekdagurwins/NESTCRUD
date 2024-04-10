import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config(); // Load environment variables from .env file
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'your-secret-key', // Change this to a secret key
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(process.env.PORT);
  console.log("Server is running at localhost 3000")
  console.log(process.env.PORT, "port>>>>>>>>>>>>>");

}
bootstrap();
