/*****
 *  1. Build a function constructor called Question to describe a question.
 *  A question should include:
 *  - the question itself
 *  the answers from which the player can choose the correct one (choose good datastructure)
 *  correct answer
 *  2. create a couple of questions using the constructor
 *  3. store them all inside of an array
 *  4. Select one random question and log it on the console, together with the possible answers( each question should have a number)
 *  5. use the prompt function to ask the user for the correct answer. the user should input the number of the correct answer such as you displayed it on task 4
 *  6. check if the answer is correct and print to the console whether the answer is correct or not
 *  7. suppose this code would be a plugin for other programmers to use in theier code. so make shure that all your code ist private and doesn't interfere with the others programmers code
 *
 *  *****/

(function () { //IIEF
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(
                i
                + ': '
                + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (ans, callback) {

        var sc;

        if (ans === this.correct) {
            console.log('correct answer!');
            sc = callback(true);
        } else {
            console.log('wrong, try again....')
            sc = callback(false);
        }

        this.displayScore(sc);
    };

    Question.prototype.displayScore = function (score) {
        console.log('Your current score is: ' + score);
        console.log('_____________________________________')
    };

    var q1 = new Question('Is Javascript a thing?', ['yes', 'nope'], 0);
    var q2 = new Question('Is this dank?', ['yes', 'noe', 'dunno'], 2);
    var q3 = new Question('Is this dank stuff?', ['noper', 'noe', 'dunno'], 1);
    var q4 = new Question('who am i?', ['gaffa', 'javva', 'tassa'], 0);

    var questions = [q1, q2, q3, q4];

    function score() {
        var sc = 0;
        return function (correct) {
            if(correct){
                sc++;
            }
            return sc;
        }
    }

    var keepScore = score();

    function nextQuestion() {

        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        if (answer !== 'exit') {
            var answer = prompt('answer?');
            questions[n].checkAnswer(parseInt(answer), keepScore);

            nextQuestion(); //rekursiv
        }
    }
    nextQuestion();
})();

/*****
* 8. After you display the result, display the next random question, so that the game never ends
* 9. be careful: after 8, the game literally never ends. so include exit strategy
* 10. track the user's score to make the game more meaningful.
* 11. display the score in the console.
* *****/