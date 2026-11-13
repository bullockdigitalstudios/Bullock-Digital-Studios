const search = document.querySelector('#dish-search');
if (search) {
  const chips = [...document.querySelectorAll('[data-category]')];
  const groups = [...document.querySelectorAll('[data-group]')];
  let category = '';
  function render() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    groups.forEach(group => {
      const inCategory = !category || group.dataset.group === category;
      let matches = 0;
      group.querySelectorAll('[data-dish]').forEach(dish => {
        dish.hidden = !inCategory || !dish.dataset.dish.includes(query);
        if (!dish.hidden) matches++;
      });
      group.hidden = !matches;
      count += matches;
    });
    document.querySelector('#menu-count').textContent = `${count} ${count === 1 ? 'dish' : 'dishes'}`;
    document.querySelector('#empty').hidden = count !== 0;
  }
  chips.forEach(chip => chip.addEventListener('click', () => {
    category = chip.dataset.category;
    chips.forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
    render();
  }));
  search.value = new URLSearchParams(window.location.search).get('q') || '';
  search.addEventListener('input', render);
  document.querySelector('.menu-tools').hidden = false;
  render();
}
