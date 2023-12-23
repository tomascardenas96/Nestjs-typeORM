import { Test, TestingModule } from '@nestjs/testing';
import { TuitController } from './tuit.controller';
import { TuitService } from './tuit.service';

describe('TuitController', () => {
  let controller: TuitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuitController],
      providers: [TuitService],
    }).compile();

    controller = module.get<TuitController>(TuitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
