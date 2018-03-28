
const rp = require('request-promise');
const sentiment = require('sentiment');

// Get a list of recent media tagged with '#stacklasocial'
rp('https://api.instagram.com/v1/tags/stacklasocial/media/recent?access_token=2928100832.b34ca46.8bba36c91160477b8a85460c95156293')
.then(response => {
  response = JSON.parse(response);
  // join the caption-text of all the recent posts
  const content = response.data.map(v => v.caption.text || '').join();
  // does a sentiment analysis using the 'sentiment' nodejs library
  const sentimentAnalysis = sentiment(content);
  console.log('SCORE:', sentimentAnalysis.score);
})
.catch(err => {
  console.log('There was an error processing the request.');
  console.dir(err);
});