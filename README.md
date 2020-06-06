# Budget App ES5

My first project, built with HTML, CSS and JavaScript ES5. Budget accepts submitted values of **income** and **expense** types. Then automatically calculates **total budget**. Simple as that :)

## Start

To see the final launched version of the project click the reference link above. In case you would like to launch the project onto your machine simply download the files and open index.html. 

## Summing Up 

* Learned how to **structure code** and keep it organized. Used a three modular build approach (**UI module**, **budget module** and **global module**), where:

    * **UI module** is code related to User Interface manipulations and decides what code should be displayed to the user. 
    * **Budget module** does calculations and humbers shuffling behind the scenes.
    * **Global module** is the intermediate module establishing the connection between UI and budget modules. 

* As the code was written with ES5 version of JavaScript all three modules were constructed in a **single budget-app.js file**. 

* While doing this project I got familiar with ** four core principles* of Object Oriented Programming such as:

    * **Encapsulation** expressed by *Immediately Invoked Function Expressions*. 
      ```
         (function (budgetMod, UIMod) {...
         
         ...})(budgetModule, UIModule) // function invokes itself.
      ```
    * **Abstraction**. To make code easy to use and reveal only necessary parts all necessary code is returned and can be publically           accessed thank to the *closures*.
    
      Encapsulated function gets initally called.
      ```
         (function (budgetMod, UIMod) {... 
      ```
      Only "returned" code can be publically accessed thank to the closures.
      ```
         ...return {
        init: function () {
            setupEventListeners();
            UIMod.displayDate();
            UIMod.displayBudget(obj = {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
      }})(budgetModule, UIModule);
      ```
    
    * **Inheritance** expressed by *constructors* and . All constructor instances inherit all properties from *constructor prototypes*.
    
      Example of "Expense" type *constructor*. 
      ```
      var Expense = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value
      };
      ```
      getPercentage() is one of *constructor prototypes* methods. Instantly gets inherited by all instances created via "Expense"             constructor.
      ```
      Expense.prototype.getPercentage = function () {
        return this.percentage;
      };
      ```
      
    * Finally, **polymorphism** expresses in combining functions with objects.
      
      displayBudget() method execution varies depending on the passing "obj" argument. 
      ```
      displayBudget: function (obj) {
            var type;
            if (obj.budget > 0) {
                type = 'inc';
            } else if (obj.budget < 0){
                type = 'exp';
            }

            document.querySelector(DOMstrings.budgetTotal).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incTotal).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expTotal).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percTotal).textContent = obj.percentage + '%';
            } else if (obj.percentage === -1) {
                document.querySelector(DOMstrings.percTotal).textContent = '---';
            } 
        },
      ```
      
* Learned how to manipulate HTML objects and CSS characteristic using advanced JavaScript.        

## Authors

* **Philip Chislou** - *Final work* - [Philip Chislou](https://github.com/h1l1ch).
* **Jonas Schmedtmann** - *Template* - [Jonas Schmedtmann](https://github.com/jonasschmedtmann).

## Acknowledgments

* Many thank to **Jonas**. My first online *Udemy teacher* for babysitting me :) and providing a great opportunity to practice the core set of JS skills, which helped me to build a strong foundation of me as a front-end developer. 
