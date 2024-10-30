const blessed = require('blessed');
const contrib = require('blessed-contrib');
const RSSParser = require('rss-parser');
const { startFeedUpdates } = require('./src/services/rssFetcher');

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

startFeedUpdates(newsTable, screen);

// Quit on Escape, q, or Ctrl+C
screen.key(['escape', 'q', 'C-c'], () => {
    screen.destroy();  // Clean up the screen
    process.exit(0);
  });

// Allow arrow keys to scroll
newsTable.focus();
screen.render();
