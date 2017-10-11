import fire from './firebase';

const db = fire.database();

const fillDb = function() {
  insertProblems();
  insertUsers();
  insertRooms();
}

const insertProblems = function() {
  db.ref('problems').push( {
    title:'Sudoku',
    description: `Description:
  
    Write a function done_or_not/DoneOrNot passing a board (list[list_lines]) as parameter. If the board is valid return 'Finished!', otherwise return 'Try again!'
  
    Sudoku rules:
  
    Complete the Sudoku puzzle so that each and every row, column, and region contains the numbers one through nine only once.
  
    Rows:
  
    There are 9 rows in a traditional Sudoku puzzle. Every row must contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. There may not be any duplicate numbers in any row. In other words, there can not be any rows that are identical.
  
    Columns: 
  
    There are 9 columns in a traditional Sudoku puzzle. Like the Sudoku rule for rows, every column must also contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. Again, there may not be any duplicate numbers in any column. Each column will be unique as a result.
        
    Regions:
  
    A region is a 3x3 box like the one shown to the left. There are 9 regions in a traditional Sudoku puzzle.
  
    Like the Sudoku requirements for rows and columns, every region must also contain the numbers 1, 2, 3, 4, 5, 6, 7, 8, and 9. Duplicate numbers are not permitted in any region. Each region will differ from the other regions.
  
    For those who don't know the game, here are some information about rules and how to play Sudoku: http://en.wikipedia.org/wiki/Sudoku and http://www.sudokuessentials.com/`,
    userFn: 'doneOrNot',
    difficulty: '3',
    tests: [`Test.assertEquals(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2], 
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]]), "Finished!")`,
            
        `Test.assertEquals(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2], 
            [6, 7, 2, 1, 9, 0, 3, 4, 9],
            [1, 0, 0, 3, 4, 2, 5, 6, 0],
            [8, 5, 9, 7, 6, 1, 0, 2, 0],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 0, 1, 5, 3, 7, 2, 1, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 0, 0, 4, 8, 1, 1, 7, 9]]), "Try again!")`,
                    
        `Test.assertEquals(doneOrNot([[1, 3, 2, 5, 7, 9, 4, 6, 8],
        [4, 9, 8, 2, 6, 1, 3, 7, 5],
        [7, 5, 6, 3, 8, 4, 2, 1, 9],
        [6, 4, 3, 1, 5, 8, 7, 9, 2],
        [5, 2, 1, 7, 9, 3, 8, 4, 6],
        [9, 8, 7, 4, 2, 6, 5, 3, 1],
        [2, 1, 4, 9, 3, 5, 6, 8, 7],
        [3, 6, 5, 8, 1, 7, 9, 2, 4],
        [8, 7, 9, 6, 4, 2, 1, 5, 3]]), "Finished!")`,
        
        `Test.assertEquals(doneOrNot([[1, 3, 2, 5, 7, 9, 4, 6, 8],
          [4, 9, 8, 2, 6, 1, 3, 7, 5],
          [7, 5, 6, 3, 8, 4, 2, 1, 9],
          [6, 4, 3, 1, 5, 8, 7, 9, 2],
          [5, 2, 1, 7, 9, 3, 8, 4, 6],
          [9, 8, 7, 4, 2, 6, 5, 3, 1],
          [2, 1, 4, 9, 3, 5, 6, 8, 7],
          [3, 6, 5, 8, 1, 7, 9, 2, 4],
          [8, 7, 9, 6, 4, 2, 1, 3, 5]]), "Try again!")`,
        
        `Test.assertEquals(doneOrNot([[1, 3, 2, 5, 7, 9, 4, 6, 8],
          [4, 9, 8, 2, 6, 0, 3, 7, 5],
          [7, 0, 6, 3, 8, 0, 2, 1, 9],
          [6, 4, 3, 1, 5, 0, 7, 9, 2],
          [5, 2, 1, 7, 9, 0, 8, 4, 6],
          [9, 8, 0, 4, 2, 6, 5, 3, 1],
          [2, 1, 4, 9, 3, 5, 6, 8, 7],
          [3, 6, 0, 8, 1, 7, 9, 2, 4],
          [8, 7, 0, 6, 4, 2, 1, 3, 5]]), "Try again!")`, 
        
        `Test.assertEquals(doneOrNot([[1, 2, 3, 4, 5, 6, 7, 8, 9],
          [2, 3, 4, 5, 6, 7, 8, 9, 1],
          [3, 4, 5, 6, 7, 8, 9, 1, 2],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [5, 6, 7, 8, 9, 1, 2, 3, 4],
          [6, 7, 8, 9, 1, 2, 3, 4, 5],
          [7, 8, 9, 1, 2, 3, 4, 5, 6],
          [8, 9, 1, 2, 3, 4, 5, 6, 7],
          [9, 1, 2, 3, 4, 5, 6, 7, 8]]), "Try again!")`]
    } );
  
    db.ref('problems').push( {
        title:'Age in 2099',
        description: `Philip's just turned four and he wants to know how old he will be in various years in the future such as 2090 or 3044. His parents can't keep up calculating this so they've begged you to help them out by writing a programme that can answer Philip's endless questions.
        
        Your task is to write a function that takes two parameters: the year of birth and the year to count years in relation to. As Philip is getting more curious every day he may soon want to know how many years it was until he would be born, so your function needs to work with both dates in the future and in the past.
        
        Provide output in this format: For dates in the future: "You are ... year(s) old." For dates in the past: "You will be born in ... year(s)." If the year of birth equals the year requested return: "You were born this very year!"
        
        "..." are to be replaced by the number, followed and proceeded by a single space. Mind that you need to account for both "year" and "years", depending on the result.
        
        Good Luck!`,
        userFn: 'calculateAge',
        difficulty: '1',
        tests: [`Test.assertEquals(calculateAge(2012, 2016),"You are 4 years old.")`,
        `Test.assertEquals(calculateAge(1989, 2016),"You are 27 years old.")`,
        `Test.assertEquals(calculateAge(2000, 2090),"You are 90 years old.")`,
        `Test.assertEquals(calculateAge(2000, 1990),"You will be born in 10 years.")`,
        `Test.assertEquals(calculateAge(3400, 3400),"You were born this very year!")`,
        `Test.assertEquals(calculateAge(900, 2900),"You are 2000 years old.")`,
        `Test.assertEquals(calculateAge(2010, 1990),"You will be born in 20 years.")`,
        `Test.assertEquals(calculateAge(2010, 1500),"You will be born in 510 years.")`,
        `Test.assertEquals(calculateAge(2011, 2012),"You are 1 year old.")`,
        `Test.assertEquals(calculateAge(2000, 1999),"You will be born in 1 year.")`]
    } );
}

const insertUsers = function() {
  let users = ['Kai', 'Colin', 'David', 'Simon', 'Paul', 'ron'];
  users = users.map(user => {return {username: user}})
  
  users.forEach(user => db.ref('users').push(user));
}

const insertRooms = function() {
  const room1 = {
    players: 0,
    spectators: 0,   
    gameStarted: false, 
    creatorName: '',
    challengerName: '',
    problemID: '-KwC4BdkIC86GWKfws4f',
    creatorTestsPassed: 0,
    challengerTestsPassed: 0
  };

  const room2 = {
    players: 1,
    spectators: 0,  
    gameStarted: false,  
    creatorName: 'Colin',
    challengerName: '',
    problemID: '-KwC7SDHgOMW_yZ_UAHf',
    creatorTestsPassed: 0,
    challengerTestsPassed: 0
  };

  const room3 = {
    players: 2,
    spectators: 0,    
    creatorName: 'Simon',
    challengerName: 'David',
    problemID: '-KwC7SDMwYQyVfosoYWr',
    creatorTestsPassed: 1,
    challengerTestsPassed: 2
  };

  const rooms = [room1, room2, room3];

  rooms.forEach(room => db.ref('rooms').push(room))
}

export default fillDb;