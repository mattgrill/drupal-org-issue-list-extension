import { safeElementReady } from './lib';

async function init() {
  await safeElementReady('body');

  const majorVersion = document
    .querySelector('div.field-name-field-issue-version div.field-item')
    .textContent.substr(0, 1);

  document
    .querySelectorAll('div.field-name-field-issue-component div.field-item')
    .forEach(component => {
      component.innerHTML = `<a href="https://www.drupal.org/project/issues/search/drupal?status[]=Open&version[]=${majorVersion}.x&component[]=${
        component.textContent
      }">${component.textContent}</a>`;
    });
}

init();
