import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { Neo4jService } from 'nest-neo4j';
import { UserSongs } from '../../../../libs/data/src/lib/user-songs.model'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly neo4jService: Neo4jService) {}

  @Get()
  async getHello(): Promise<any> {
    const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)

    return `There are ${res.records[0].get('count')} nodes in the database`
  }

  @Get('recommendations/:userId?') 
  async getRecommendedSongs(@Param('userId') userId: string, @Query('limit') limit: string): Promise<any> {    
    const res = await this.neo4jService.read(`
      MATCH (user:User {id:'${userId}'})-[:GUESSED]-(song:Song)<-[:GUESSED]-(other:User)
      MATCH (other)-[:GUESSED]->(rec:Song)
      WHERE NOT (user)-[:GUESSED]->(rec)
      RETURN DISTINCT rec.id
      LIMIT toInteger(${limit})
    `)

    return res.records.map(record => record.get('rec.id'))
  }

  @Post('user-songs')
  async createUserSongs(@Body() userSongs: UserSongs): Promise<any> {
    const { userId, songs } = userSongs

    const res = await this.neo4jService.write(`
      MATCH (user:User {id: $userId})
      FOREACH (song IN $songs |
        MERGE (s:Song {id: song})
        MERGE (user)-[:GUESSED]->(s)
      )
    `, { userId, songs })

    return res
  }

  @Get('user/:userId')
  async createUser(@Param('userId') userId: string): Promise<any> {  
    const res = await this.neo4jService.write(`
      CREATE (user:User {id: '${userId}'})
    `)

    return res
  }
}
