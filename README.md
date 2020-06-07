# Budget App with JS ES5

My first project, built with HTML, CSS and JavaScript ES5. Budget app accepts number elements of **income** and **expense** types. Then automatically calculates **total budget**. Simple as that :)


## How to use

* There are **two fields**: *cyan field* represents *income* and *red field* represents *expenses*. 

* There are **three input fields**: *description* (your comments), *value* (how much money), and *type* (either expenses or income). 

* **Click "submit" button** or **press enter**.

* App **calculates**: *total budget*, *expenses percentage* and both *total income & expenses*.


## How to launch

* Need **final version**? Simply check *link* in the *description*. 

* To launch **development code** download *zip file* on your computer and then open *index.html file*.

## Project structure

* **/budget-app.js** single JS file. Includes all three modules and is written in JavaScript ES5. 

* **/index.html** single HTML file.  

* **/style.css** single CSS file.


## Things I've learned 

* How to **structure code** and keep it organized by applying **three modular** constructing approach (**UI module**, **budget module** and **global module**), where:

    * **UI module** includes code related to the *User Interface manipulations*, which decides what *to display to the user*. 
    
    * **Budget module** does *budget calculations* and *numbers shuffling*. All that is done **behind the scenes**.
    
    * **Global module** is the *intermediate module*, **establishes the connection** between *UI* and *budget modules*. 

* While doing this project I got familiar with **four core principles of OOP**(Object Oriented Programming):

    * **Encapsulation**, which is here expressed by *Immediately Invoked Function Expressions*. 
    
      *function invokes itself:*
      ```
         (function (budgetMod, UIMod) {...
         
         ...})(budgetModule, UIModule)
      ```
      
    * **Abstraction** expressed by *closures*. **Closures** are making code *secure* while also being *accessible* and *functional*.
    
      *encapsulated function gets initally called:*
      ```
         (function (budgetMod, UIMod) {... 
      ```
      
      *thanks to the closures only "returned" code can be publically accessed:*
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
    
    * **Inheritance**, here expressed by *object constructors* and their *prototypes*. All constructor's instances inherit properties of constructor's prototype.
    
      *example of "Expense" type *constructor*:* 
      ```
      var Expense = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value
      };
      ```
      *getPercentage() is one of *constructor prototype's* methods. Method gets inherited by all instances created via "Expense"             constructor:*
      ```
      Expense.prototype.getPercentage = function () {
        return this.percentage;
      };
      ```
      
    * Finally, **polymorphism**, here expressed by *flexible functional behavior* depending on the *passing objects* as *arguments*.
      
      *displayBudget() method determines the type of "obj" argument:* 
      ```
      displayBudget: function (obj) {
            var type;
            if (obj.budget > 0) {
                type = 'inc';
            } else if (obj.budget < 0){
                type = 'exp';
            }
      ```
      
      *depending on obj's "budget" property further procedure changes:*
      ```
            document.querySelector(DOMstrings.budgetTotal).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incTotal).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expTotal).textContent = formatNumber(obj.totalExp, 'exp');
      ```


## Authors

* **Philip Chislou** - *Final work* - [Philip Chislou](https://github.com/h1l1ch).
* **Jonas Schmedtmann** - *Template* - [Jonas Schmedtmann](https://github.com/jonasschmedtmann).


## Acknowledgments

* Many thanks to **Jonas**. My first online *Udemy teacher* for babysitting me :) and providing a great opportunity to practice the core set of JS skills, which helped me to build a strong foundation of me as a front-end developer. 
