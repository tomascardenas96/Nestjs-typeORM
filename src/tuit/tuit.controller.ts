import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { TuitDTO } from './dto/create-tuit.dto';
import { UpdateTuit } from './dto/update-tuit.dto';

@Controller('tuit')
export class TuitController {
  constructor(private readonly tuitService: TuitService) {}

  @Post(':userID')
  create(@Param('userID') userID: string, @Body() tuit: TuitDTO) {
    return this.tuitService.create(userID, tuit); 
  }

  @Get()
  findAll() {
    return this.tuitService.findAll();
  }

  @Get(':id/tuit')
  findOne(@Param('id') id: string) {
    return this.tuitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tuit: UpdateTuit) {
    return this.tuitService.update(+id, tuit);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuitService.remove(+id);
  }
}
