import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app/app.module';
import { OrderDto } from '../src/order/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('App', () => {
    describe('Order', () => {
      it('Should thrown Order`s order_id is empty', () => {
        const dto: OrderDto = {
          order_id: '',
          description: 'Logistics order',
        };

        return pactum.spec().post('/app/order').withBody(dto).expectStatus(400);
      });

      it('Should thrown Order`s description is empty', () => {
        const dto: OrderDto = {
          order_id: '1234',
          description: '',
        };

        return pactum.spec().post('/app/order').withBody(dto).expectStatus(400);
      });

      it('Should return success', () => {
        const order_id = Date.now().toString();
        const dto: OrderDto = {
          order_id,
          description: 'Logistics Order ' + order_id,
        };

        return pactum
          .spec()
          .post('/app/order')
          .withBody(dto)
          .expectBodyContains('success');
      });
    });
  });
});
