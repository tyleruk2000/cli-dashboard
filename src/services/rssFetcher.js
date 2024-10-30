// rssFetcher.js
const RSSParser = require('rss-parser');
const parser = new RSSParser();

// Function to fetch and display the RSS feed
async function fetchAndDisplayFeed(newsTable, screen) {
  try {
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
    const headlines = feed.items.map((item) => [item.title]);

    // Update the news table with headlines
    newsTable.setData({ headers: ['Headline'], data: headlines });
    screen.render();
  } catch (error) {
    console.error('Error displaying headlines:', error);
  }
}

// Function to set up periodic feed fetching
function startFeedUpdates(newsTable, screen, interval = 10 * 60 * 1000) {
  fetchAndDisplayFeed(newsTable, screen);
  setInterval(() => fetchAndDisplayFeed(newsTable, screen), interval);
}

module.exports = { startFeedUpdates };
