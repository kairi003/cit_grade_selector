javascript:{
  let check_changed = e=>{
    gradeTable.querySelectorAll('.hidden').forEach(e=>e.classList.remove('hidden'));
    document.querySelectorAll('.term-check').forEach(cb=>{
      if (!cb.checked) {
        let term = cb.nextSibling.textContent;
        for (e of gradeTable.getElementsByClassName(term))
          e.classList.add('hidden');
      }
    });
    gradeTable.querySelectorAll('.subject-category').forEach(e=>{
      if (e.querySelectorAll('table tr').length <= e.querySelectorAll('table tr.hidden').length)
        e.classList.add('hidden');
    })
  }

  document.body.insertAdjacentHTML('beforeEnd', '<style>.hidden{display:none;}</style>');
  
  document.querySelector('center>table:nth-of-type(3)').id = 'gradeTable';
  
  gradeTable.querySelectorAll(':scope>tbody>tr:not(:first-of-type)').forEach(tr=>{tr.classList.add('subject-category')});

  let year_set = new Set();
  gradeTable.querySelectorAll('tbody tbody>tr').forEach(tr=>{
    let year = tr.querySelector('td:nth-last-of-type(2)').textContent;
    let term = tr.querySelector('td:nth-last-of-type(1)').textContent;
    year_set.add(year);
    tr.classList.add('subject', year + term);
  });
  
  let term_select = document.createElement('div')
  gradeTable.insertAdjacentElement('beforeBegin', term_select);
  Array.from(year_set).sort().forEach(year=>{
    [year + '前期', year + '後期'].forEach(term=>{
      let label = document.createElement('label');
      term_select.appendChild(label);
      let cb = document.createElement('input');
      cb.className = 'term-check';
      cb.type = 'checkbox';
      cb.checked = true;
      cb.addEventListener('change', check_changed);
      label.appendChild(cb);
      label.appendChild(document.createTextNode(term));
    })
  });
}
