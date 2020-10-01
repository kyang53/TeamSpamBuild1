(function(){
    function build_quiz(){
      // store the HTML output
      const output = [];
  
      // for each question in quiz_questions.json...
      my_questions.forEach(
        (current_questions, question_number) => {
  
          // store the list multiple choice
          const answers = [];
  
          // and for each available answer...
          for(letter in current_questions.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${question_number}" value="${letter}">
                ${letter} :
                ${current_questions.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${current_questions.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quiz_container.innerHTML = output.join('');
    }
  
    function show_results(){
  
      // gather answer containers from our quiz
      const answer_containers = quiz_container.querySelectorAll('.answers');
  
      // keep track of user's answers
      let num_correct = 0;
  
      // for each question...
      my_questions.forEach( (current_questions, question_number) => {
  
        // find selected answer
        const answer_container = answer_containers[question_number];
        const selector = `input[name=question${question_number}]:checked`;
        const user_answer = (answer_container.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(user_answer === current_questions.correctAnswer){
          // add to the number of correct answers
          num_correct++;
  
          // color the answers green
          answer_containers[question_number].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answer_containers[question_number].style.color = 'red';
        }
      });

       // show number of correct answers out of total
       results_container.innerHTML = `${num_correct} out of ${my_questions.length}`;
      }

      function show_slide(n) {
        slides[current_slide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        current_slide = n;
        if(current_slide === 0){
          previous_button.style.display = 'none';
        }
        else{
          previous_button.style.display = 'inline-block';
        }
        if(current_slide === slides.length-1){
          next_button.style.display = 'none';
          submit_button.style.display = 'inline-block';
        }
        else{
          next_button.style.display = 'inline-block';
          submit_button.style.display = 'none';
        }
      }
    
      function show_next_slide() {
        show_slide(current_slide + 1);
      }
    
      function show_previous_slide() {
        show_slide(current_slide - 1);
      }
  
     
  // Variables
    const quiz_container = document.getElementById('quiz');
    const results_container = document.getElementById('results');
    const submit_button = document.getElementById('submit');
    const my_questions = quiz_data;

    console.log(my_questions);

  
    // Call build_quiz
    build_quiz();

     // Pagination
  const previous_button = document.getElementById("previous");
  const next_button = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let current_slide = 0;

  // Show the first slide
  show_slide(current_slide);

  // Event listeners
  submit_button.addEventListener('click', show_results);
  previous_button.addEventListener("click", show_previous_slide);
  next_button.addEventListener("click", show_next_slide);
})();
 