import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Admin:Secret123@cluster0.asqllev.mongodb.net/guess-the-song?retryWrites=true&w=majority'),
    DataModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
