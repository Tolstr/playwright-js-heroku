// tests/api/smokeTest.spec.ts
//import { test } from '@playwright/test';
// or update the path below if you have a custom fixtures file:
import { test } from '../../utils/fixtures.js';


test('first test', async ({ api }) => {

  api
    .url('https://conduit-api.bondaracademy.com/api')
    .path('/articles')
    .params({ limit: 10, offset: 0 })
    .headers({Authorization:'authToken'})
    .body({"user": {"email": "asapiuser@test.com","password": "asapiuser"}})


});
