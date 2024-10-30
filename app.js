const blessed = require('blessed');
const contrib = require('blessed-contrib');
const RSSParser = require('rss-parser');

process.env.TERM = 'xterm';

// Create screen object
const screen = blessed.screen({
  smartCSR: true,
  title: 'BBC News Feed',
});

// Create a grid layout
const grid = new contrib.grid({ rows: 1, cols: 1, screen: screen });

// Create a list table to display the news headlines
const newsTable = grid.set(0, 0, 1, 1, contrib.table, {
  keys: true,
  fg: 'white',
  label: 'BBC News Headlines',
  columnWidth: [80],
});

// Initialize RSS parser
const parser = new RSSParser();

// Function to fetch and display the RSS feed
async function fetchFeed() {
  try {
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
    const headlines = feed.items.map((item) => [item.title]);

    // Update the news table with headlines
    newsTable.setData({ headers: ['Headline'], data: headlines });
    screen.render();
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
  }
}

// Fetch the feed every 10 minutes
fetchFeed();
setInterval(fetchFeed, 10 * 60 * 1000);

// Quit on Escape, q, or Ctrl+C
screen.key(['escape', 'q', 'C-c'], () => {
    screen.destroy();  // Clean up the screen
    process.exit(0);
  });

// Allow arrow keys to scroll
newsTable.focus();
screen.render();
