import { safeElementReady, getIssueIDs } from './lib';

async function init() {
  await safeElementReady('body');

  Promise.all(
    getIssueIDs().map(issueID =>
      fetch(`https://www.drupal.org/api-d7/node.json?nid=${issueID}`).then(
        res => res.json(),
      ),
    ),
  )
    .then(results => results.map(({ list: [node] }) => node))
    .then(nodeData => {
      const tableHeader = document.querySelector(
        'table.project-issue thead tr',
      );

      const tableRows = Array.from(
        document.querySelectorAll('table.project-issue tbody tr'),
      );

      tableHeader.insertCell(-1).innerHTML = 'Author';
      tableHeader.insertCell(-1).innerHTML = 'Component';

      nodeData.forEach(
        ({ author, field_issue_component: fieldIssueComponent }, index) => {
          const row = tableRows[index];
          row.insertCell(-1).innerHTML = author.name;
          row.insertCell(-1).innerHTML = fieldIssueComponent;
        },
      );
    });
}

init();
