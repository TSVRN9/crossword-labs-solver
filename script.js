(() => {
  const d = document;
  // get answers (stored in window.grid)
	let answers = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let e = grid[r][c];
      if (e == null) continue;

      if (e.across != null && e.across.is_start_of_word) {
        let word = '';
        for (let i = 0; c+i != grid[r].length && grid[r][c+i] != null; i++) {
          word += grid[r][c+i].char;
        }
        answers.push(word);
      }
      if (e.down != null && e.down.is_start_of_word) {
        let word = '';
        for (let i = 0; r+i != grid.length && grid[r+i][c] != null; i++) {
          word += grid[r+i][c].char;
        }
        answers.push(word);
      }
    }
  }
  
  // make a popup
  let popup_html = `
  <!DOCTYPE html>
  <head>
    <style>
    * {font-family: Arial}
    </style>
  </head>
  <body>
    <h1>Answers</h1>
    <button id="fill">Fill Automatically</button>
    <ol>
      ${answers.map(a => '<li>' + a + '</li>').join('\n')}
    </ol>
  </body>
  `;
  popup = window.open('about:blank', '', 'width=600 height=400');
  popup.document.write(popup_html);
  popup.document.getElementById('fill').addEventListener('click', () => {
    // fill out answers
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        let e = grid[r][c];
        if (e == null) continue;

        const box = d.getElementById(`cx-${r}-${c}`);
        box.dispatchEvent(new Event('click'));
        box.dispatchEvent(new KeyboardEvent('keyup', {key: e.char, bubbles: true}));
      }
    }
  });
})()
