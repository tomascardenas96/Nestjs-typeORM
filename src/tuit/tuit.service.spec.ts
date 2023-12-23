import { Test, TestingModule } from '@nestjs/testing';
import { TuitService } from './tuit.service';

describe('TuitService', () => {
  let service: TuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuitService],
    }).compile();

    service = module.get<TuitService>(TuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
