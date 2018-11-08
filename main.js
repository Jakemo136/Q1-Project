document.addEventListener('DOMContentLoaded', function(){

// variables for the test
  const timeClock = document.getElementById("timer");
  const testText = document.getElementById("test-text")
  const textArea = document.querySelector("#textarea2")
  const scoreDisplay = document.querySelector("#result")
  const restartButton = document.getElementById("restart")
  const submitButton = document.getElementById("submit")
  let score = 0

// listens for a click on the Submit button and stores the name to local storage
submitButton.addEventListener("click", function(){
  const name = document.getElementById("name").value

  localStorage.setItem("name", name)
})

// clicking the being button generates text and prepares the timer and listens 
// for a keystroke in the text entry box
restartButton.addEventListener("click", function(){
  clearTextBox()
  clearTestText()
  populateTestText()
  textArea.focus()
  textArea.addEventListener("keydown", timer)
  timeClock.innerHTML = "1:00"
})


// runs the timer, calculates word score when the timer reaches 0:00 and adds the 
// currently stored name and current score to the table
  function timer() {
    
    let timeRemaining = 6
    
    let thisTime = setInterval(function(){
      timeRemaining--;
      
      if (timeRemaining > 9) {
        timeClock.innerHTML = "0:" + timeRemaining
      } else if (timeRemaining < 9 && timeRemaining > 0) {
        timeClock.innerHTML = "0:0" + timeRemaining
      } else if (timeRemaining === 0){
        timeClock.innerHTML = "0:0" + timeRemaining
        clearInterval(thisTime)
        
        calculateScore()
      
        scoreDisplay.innerText = score
        testText.innerText = "Test Finished!"
        localStorage.setItem("score", score)

        populateTable()
      } 
    }, 1000)

    textArea.removeEventListener("keydown", timer)
  } 
  
// functions called in other functions located down here

  function clearTextBox(){ 
    textArea.value = ""
  }

  function populateTestText(){
    let testTextOptions = [text1, text2, text3, text4, text5]
    testText.innerHTML = testTextOptions[Math.floor(Math.random()*5)]
  }

  function clearTestText(){
    testText.value = ""
  }
  
  function calculateScore() {
    let testResult = textArea.value
    let typedWords = testResult.split(" ")
    let wordCount = typedWords.length
    score = wordCount
  }

  function populateTable() {
    let tableBody = document.querySelector("tbody")
    let newRow = document.createElement("tr")
    let newRowName = document.createElement("td")
    let newRowScore = document.createElement("td")
    newRowName.innerText = localStorage.getItem("name")
    newRowScore.innerText = localStorage.getItem("score")
    newRow.appendChild(newRowName)
    newRow.appendChild(newRowScore)
    tableBody.appendChild(newRow)
  }

})

const text1 = "Two common terms used to describe a salesperson are \"Farmer\" and \"Hunter\". The reality is that most professional salespeople have a little of both. A hunter is often associated with aggressive personalities who use aggressive sales technique. In terms of sales methodology, a hunter refers to a person whose focus is on bringing in and closing deals. This process is called \"sales capturing\"."

const text2 = "One morning my friend and I were thinking about how we could plan our summer break away from school. Driving from our own state to several nearby states would help to expand our limited funds. Inviting six other friends to accompany us would lower our car expenses. Stopping at certain sites would also help us stretch our truly limited travel budget. Yesterday I engaged in an interesting and enlightening discussion about finances."

const text3 = "Word processors evolved dramatically once they became software programs rather than dedicated machines. They can usefully be distinguished from text editors, the category of software they evolved from. Word processing added to the text editor the ability to control type style and size, to manage lines (word wrap), to format documents into pages, and to number pages. Functions now taken for granted were added incrementally, sometimes by purchase of independent providers of add-on programs."

const text4 = "Jim and Anne will be in charge of the spring field day to be held in early June. They will ask their friends' aid to get set up. There will be games for the boys and girls. The children will want to hike, ride their bikes, and swim. This yearly event will be held in the new Peach Grove Park. Ruth has work to do on the plans for food for the day. Last year Ruth spent most of her time helping the two cooks with many snacks. Hot dogs, fries, soft drinks, ice cream, and candy apples were big sellers."

const text5 = "A late 20th century trend in typing, primarily used with devices with small keyboards (such as PDAs and Smartphones), is thumbing or thumb typing. This can be accomplished using one or both thumbs. Similar to desktop keyboards and input devices, if a user overuses keys which need hard presses and/or have small and unergonomic layouts, it could cause thumb tendonitis or other repetitive strain injury."