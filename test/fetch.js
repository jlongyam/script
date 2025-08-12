if (typeof global === 'object') require('../src/script.js');

// Usage: REST API
function createAPI(baseURL) {
  return {
    // GET (Read)
    get: function(endpoint) {
      return script.fetch(`${baseURL}${endpoint}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        });
    },

    // POST (Create)
    post: function(endpoint, data) {
      return script.fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json());
    },

    // PUT/PATCH (Update)
    put: function(endpoint, data) {
      return script.fetch(`${baseURL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json());
    },

    // DELETE
    delete: function(endpoint) {
      return script.fetch(`${baseURL}${endpoint}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.status === 200) return { success: true };
        throw new Error('Delete failed');
      });
    }
  };
}

// Initialize
const api = createAPI('https://jsonplaceholder.typicode.com');

// 1. Get all posts
api.get('/posts')
  .then(posts => script.display(`First post: ${posts[0].title}`))
  .catch(err => script.display(`Error: ${err.message}`));

// 2. Create new post
api.post('/posts', {
  title: 'New Post',
  body: 'Hello world',
  userId: 1
}).then(data => script.display(`Created post ID: ${data.id}`));

// 3. Update post
api.put('/posts/1', {
  title: 'Updated Title',
  body: 'New content'
}).then(data => script.display(`Updated: ${data.title}`));

// 4. Delete post
api.delete('/posts/1')
  .then(() => script.display('Post deleted'))
  .catch(err => script.display(err.message));

// Usage:  Async/Await
const fetchUserPosts = script.async(function*(userId) {
  try {
    const user = yield script.await(api.get(`/users/${userId}`));
    const posts = yield script.await(api.get(`/users/${userId}/posts`));
    
    script.display(`
      User: ${user.name}
      Posts: ${posts.length}
      Last post: ${posts[posts.length-1].title}
    `);
  } catch (err) {
    script.display(`Failed: ${err.message}`);
  }
});

fetchUserPosts(1);

// Usag: using yield
script.yield()
  .add(function() {
    script.fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(data => {
        script.display("Fetched post ID: " + data.id);
        this.yield.run()
      });
  })
  .add(function() {
    script.display("This runs after fetch")
  })
  .run();
