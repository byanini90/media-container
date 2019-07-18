import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MediaData } from 'src/app/api/models/mediaData';
import * as faker from 'faker/locale/es';

export class InMemoryDb implements InMemoryDbService {

    createDb() {
        const medias: MediaData[] = this.manyMedias(50);
        console.log(medias);
        return { medias };
    }

    oneMedia = () => {
        return {
            id: faker.random.number(),
            uuid: faker.random.uuid(),
            type: faker.random.arrayElement(['image', 'video', 'galeria']),
            name: faker.lorem.sentence(),
            created: faker.date.past().getDate(),
            changed: faker.date.past().getDate(),
            width: faker.random.number({ min: 52, max: 3500}),
            height: faker.random.number({ min: 52, max: 3500}),
            author_id: faker.random.arrayElement([faker.random.number(), faker.random.number(), this.getUser()]),
            author: {
                id: faker.random.arrayElement([faker.random.number(), this.getUser()]),
                name: faker.name.firstName(),
            },
            thumbnail: {
                width: faker.random.number({ min: 52, max: 3500}),
                height: faker.random.number({ min: 52, max: 3500}),
                url: faker.random.image()
            },
            url: faker.random.image(),
            license: faker.lorem.word() + '.es',
            site: faker.random.arrayElement(['autobild', 'computerhoy', 'businessinsider'])
        };
    }

    manyMedias = (count: number = faker.random.number(100)) => {
        const res = [];
        for (let i = 0; i < count; i++) {
            res.push(this.oneMedia());
        }
        return res;
    }

    getUser(): number {
        return 1001;
    }

}
