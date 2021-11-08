import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import * as fs from 'fs';

const mongo_credentials = fs.readFileSync('./credentials/mongo_credentials.json', 'utf8');
const mongo_credentials_json = JSON.parse(mongo_credentials);

@Module({
  imports: [
    CatsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${mongo_credentials_json["username"]}:${mongo_credentials_json["password"]}@${mongo_credentials_json["clusterURL"]}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
