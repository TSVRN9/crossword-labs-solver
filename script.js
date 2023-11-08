(() => {
  // get answers (stored in window.grid)
	let answers = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let e = grid[r][c];
      if (e.across && e.across.is_start_of_word) {
        let word = '';
        for (let i = 0; grid[r][c+i]; i++) {
          word += grid[r][c+i];
        }
        answers.append(word);
      }
      if (e.down && e.down.is_start_of_word) {
        let word = '';
        for (let i = 0; grid[r+i][c]; i++) {
          word += grid[r+1][c];
        }
        answers.append(word);
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
    <ol>
      {answers.map(a => '<li>' + a + '</li>\n')}
    </ol>
  </body>
  `;
  popup = window.open('about:blank', '', 'width=600 height=400');
  popup.document.write(popup_html);
})()
