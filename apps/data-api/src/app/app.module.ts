import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { DataModule } from './data.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Admin:Secret123@cluster0.asqllev.mongodb.net/guess-the-song?retryWrites=true&w=majority'),
    DataModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
