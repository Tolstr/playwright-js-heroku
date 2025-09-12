import { test, expect } from '@playwright/test';

let authToken: string;

test.beforeAll('Run before all',async ({ request }) => {
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { "user": {"email": "asapiuser@test.com","password": "asapiuser"}}
  })
  const tokenResponseJson = await tokenResponse.json();
  authToken = 'Token ' + tokenResponseJson.user.token;
});

test('Get Test Tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
  const tagsResponseJson = await tagsResponse.json();

  expect(tagsResponse.status()).toEqual(200)
  expect(tagsResponseJson.tags[0]).toEqual('Test')
  expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10);

});

test('Get All Articles', async ({ request }) => {
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1&offset=0')
  const articlesResponseJson = await articlesResponse.json();

  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseJson.articles.length).toBeLessThanOrEqual(10);
  expect(articlesResponseJson.articlesCount).toEqual(10);
  

});

test('Create and Delete Article', async ({request}) => {
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
    "article": {
        "title": "Rings of Power Test",
        "description": "About how rings can bring you power in Lord of the Rings",
        "body": "It's fairy tale about rings of power in the imaginary World",
        "tagList": []
    }
}, 
    headers: {
      Authorization: authToken
    }
  })
  const newArticleResponseJson = await newArticleResponse.json();

  expect(newArticleResponse.status()).toEqual(201)
  expect(newArticleResponseJson.article.title).toEqual('Rings of Power Test')
  expect(newArticleResponseJson.article.description).toEqual('About how rings can bring you power in Lord of the Rings')
  expect(newArticleResponseJson.article.body).toEqual("It's fairy tale about rings of power in the imaginary World")

  const slugid = newArticleResponseJson.article.slug

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1&offset=0', {
    headers: {
      Authorization: authToken
    }
  })
  const articlesResponseJson = await articlesResponse.json();
  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseJson.articles[0].title).toEqual('Rings of Power Test')

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugid}`, {
    headers: {
      Authorization: authToken
    }
  })

});

test('Create, Update and Delete Article', async ({request}) => {
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
    "article": {
        "title": "Rings of Power for Sauron",
        "description": "About how rings can bring you power in Lord of the Rings",
        "body": "It's fairy tale about rings of power in the imaginary World",
        "tagList": []
    }
}, 
    headers: {
      Authorization: authToken
    }
  })
  const newArticleResponseJson = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201)
  expect(newArticleResponseJson.article.title).toEqual('Rings of Power for Sauron')
  // expect(newArticleResponseJson.article.description).toEqual('About how rings can bring you power in Lord of the Rings')
  // expect(newArticleResponseJson.article.body).toEqual("It's fairy tale about rings of power in the imaginary World")
  const slugid = newArticleResponseJson.article.slug

  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugid}`,{
    data: {
      "article": {
        "title": "Rings of Power for Sauron Modified",
        "description": "About how rings can bring you power in Lord of the Rings",
        "body": "It's fairy tale about rings of power in the imaginary World",
        "tagList": []
      }
    },
    headers: {
      Authorization: authToken
    }
  })
  const updateArticleResponseJson = await updateArticleResponse.json();
  expect(updateArticleResponse.status()).toEqual(200)
  expect(updateArticleResponseJson.article.title).toEqual('Rings of Power for Sauron Modified')
  const newSlugId = updateArticleResponseJson.article.slug;

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=1&offset=0', {
    headers: {
      Authorization: authToken
    }
  })
  const articlesResponseJson = await articlesResponse.json();
  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseJson.articles[0].title).toEqual('Rings of Power for Sauron Modified')

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`, {
    headers: {
      Authorization: authToken
    }
  })

});