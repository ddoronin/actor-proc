import {spawnActorSystem} from '../../src/index';

const aspro = spawnActorSystem('./public/actor-system.js');
aspro.listen((data:any) => {
    console.log('Received', data);
});

setInterval(() => {
    aspro.send({
        type: 'find-and-buy',
        data: {}
    })
}, 5000);
