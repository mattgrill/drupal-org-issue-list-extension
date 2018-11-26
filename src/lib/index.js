import elementReady from 'element-ready';
import domLoaded from 'dom-loaded';

export const getIssueIDs = () =>
  Array.from(document.querySelectorAll('td.views-field-title a')).map(link =>
    link
      .getAttribute('href')
      .split('/')
      .pop(),
  );

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export const safeElementReady = selector => {
  const waiting = elementReady(selector);

  // Don't check ad-infinitum
  domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()));

  // If cancelled, return null like a regular select() would
  return waiting.catch(() => null);
};
