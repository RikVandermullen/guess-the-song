import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '6519ff3f.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'c0OlVRN6TRkxlzERceh--CVVOU1ibAu9ckOUqOVPaEY'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
