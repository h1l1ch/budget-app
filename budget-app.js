/*
THINGS I NEED TO FOCUS ON:

* splice(<target location>, <number of deleting elements, -> elements which are added) 

* indexOf(<element>) - METHOD gets element's index in the array

* var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }; - manually created forEach METHOD suitable for arrays with strings 

* toFixed(<a fixed number of decimals>) - METHOD to get a number up to <> decimal places.

* The substr() - METHOD extracts parts of a string, beginning at the character at the specified position, and returns the specified number of characters. 

** return (type === 'exp' ? sign = '-' : sign = '+') + int + '.' + dec; - EXAMPLE of returning a string from a function.

* parseFloat() and parseInt() - 1) extracts a string and converts to a number with decimals etc. 2) extracts and int part of a string and converts to a number.

* focus() - METHOD relocates a cursor onto the the element upon which it was called.

* insertAdjacentHTML(('beforebegin' / 'afterbegin' / 'beforeend' / 'afterend'), HTML) - insert adjacent element to the element upon which was called.

* parentNode - PROPERTY allows to move in the elements hierarchy of HTML code.

* removeChild(<child's id>) - METHOD for removing a child of an element with a particular ID.

* classList - PROPERTY allows to manipulate with class's name of the element (remove, add, toggle).

*** new Date () - CONSTRUCTOR for creating a date array.

* 'change' - EVENT fires when the element's value is alterated. 
             EXAMPLE: <select class="add__type">
                          <option value="inc" selected>+</option>
                          <option value="exp">-</option>

* event.keyCode  - property extracts a keyCode pressed of the event 'keypress'. event.which - used for older versions of browser.

* event.target.id - extracts and id of the element which was targeted. 

*/


var budgetModule = (function () {

    var Expense = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value
    }; 
    
    var Income = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value
    };

    Expense.prototype.calculatePercentage = function () {
        if (data.totals.inc > 0) {
            this.percentage = Math.round(this.value / data.totals.inc * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var data = {
        types: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        budget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;

        data.types[type].forEach(function(cur){
            sum += cur.value;
        })

        data.totals[type] = sum;
        //console.log(sum)
    };

    return {

        createNewItem: function (type, desc, value) {

            var ID, newItem;

            if (data.types[type].length > 0) {
                ID = data.types[type][data.types[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            //console.log(data.types.inc)

            if (type === 'exp') {
                newItem = new Expense (ID, desc, value);

            } else if (type === 'inc') {
                newItem = new Income (ID, desc, value);
            }

            data.types[type].push(newItem);

            return newItem;
        },

        calculateBudget: function () {

            calculateTotal('inc');
            calculateTotal('exp')

            data.budget = data.totals.inc - data.totals.exp;
            
            if (data.totals.inc > 0) {
                data.percentage = Math.round ((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function () {
            data.types.exp.forEach(function (cur){
                cur.calculatePercentage();
            });
            //console.log(data.types.exp)
        },

        getPercentages: function () {

            var percentages = data.types.exp.map(function (cur){
                return cur.getPercentage();
            });
            return percentages;
        },

        deleteItemData: function (type, ID) {

            var ids, index;

            ids = data.types[type].map(function(cur){
                return cur.id;
            })

            index = ids.indexOf(ID);

            if (index !== -1) {
                data.types[type].splice(index, 1);
            }

        },
    
        getBudget: function () {
            return {
                budget: data.budget,
                totalExp: data.totals.exp,
                totalInc: data.totals.inc,
                percentage: data.percentage
            }
        }
    }

})();

var UIModule = (function () {

    DOMstrings = {
        inputButton: '.add__btn',
        addType: '.add__type',
        addDesc: '.add__description',
        addValue: '.add__value',
        budgetTotal: '.budget__value',
        incTotal: '.budget__income--value',
        expTotal: '.budget__expenses--value',
        percTotal: '.budget__expenses--percentage',
        incList: '.income__list',
        expList: '.expenses__list',
        percLabel: '.item__percentage',
        container: '.container',
        incLabel: '.income__list',
        expLabel: '.expenses__list',
        dateLabel: '.budget__title--month'
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    var formatNumber = function (number, type) {

        var numberSplit, dec, int;
        number = Math.abs(number);
        number = number.toFixed(2);

        numberSplit = number.split('.')
        int = numberSplit[0];
        dec = numberSplit[1];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }

        return (type === 'exp' ? sign = '-' : sign = '+') + int + '.' + dec;

    }
    
    return {

        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.addType).value,
                desc: document.querySelector(DOMstrings.addDesc).value,
                // ParseFloat changes the type of the value from string to number
                value: parseFloat(document.querySelector(DOMstrings.addValue).value)
            }     
        },

        clearFields: function () {

            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.addDesc + ', ' + DOMstrings.addValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(cur) {
                cur.value = "";
            });

            fieldsArray[0].focus(); 
        },

        displayBudget: function (obj) {
            console.log(obj)

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

        displayNewItem: function (newItem, type) {
            
            var newHtml, html, parent;

            if (type === 'inc') {
                parent = DOMstrings.incList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                parent = DOMstrings.expList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', newItem.id);
            newHtml = newHtml.replace('%description%', newItem.desc);
            newHtml = newHtml.replace('%value%', formatNumber(newItem.value, type));

            if (type === 'exp') {
                newHtml = newHtml.replace('%percentage%', newItem.percentage);
            }

            document.querySelector(parent).insertAdjacentHTML('beforeend', newHtml);
        },

        displayPercentages: function (percs) {

            var fields = document.querySelectorAll(DOMstrings.percLabel);

            nodeListForEach(fields, function (current, index){

                if (percs[index] > 0) {
                    current.textContent = percs[index] + '%'; 
                } else {
                    current.textContent = '---';
                }
            })
        },

        deleteItemDisplay: function (itemID) {

            var el = document.getElementById(itemID);

            el.parentNode.removeChild(el)
        },

        changeFields: function () {
            
            var fields = document.querySelectorAll(DOMstrings.addType + ', ' + DOMstrings.addDesc + ', ' + DOMstrings.addValue);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            })

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        displayDate: function () {
            var now, month, year, date; 

            now = new Date ();

            month = now.getMonth();
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            date = months[month] + ' ' + year;

            document.querySelector(DOMstrings.dateLabel).textContent = date;


        }, 

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();

var globalModule = (function (budgetMod, UIMod) {

    var addNewItem = function () {

        var input, newItem;

        input = UIMod.getInput();

        UIMod.clearFields();

        newItem = budgetMod.createNewItem(input.type, input.desc, input.value);

        updateBudget();

        updatePercentages();        

        UIMod.displayNewItem(newItem, input.type);

    };

    var deleteItem = function (event) {

        var itemID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            splitItemID = itemID.split('-');
            type = splitItemID[0];
            ID = parseInt(splitItemID[1]);
        } 

        budgetMod.deleteItemData(type, ID);

        console.log(itemID)

        UIMod.deleteItemDisplay(itemID);

        updateBudget();

        updatePercentages();
    }

    var updateBudget = function () {
        var budget; 

        budgetMod.calculateBudget();

        budget = budgetMod.getBudget();

        UIMod.displayBudget(budget);
    };

    var updatePercentages = function () {

        budgetMod.calculatePercentages();

        var percentages = budgetMod.getPercentages();
        //console.log(percentages)

        UIMod.displayPercentages(percentages)

    };

    var setupEventListeners = function () {

        var DOM = UIMod.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', addNewItem);

        document.addEventListener('keypress', function (event){

           if (event.keyCode === 13 || event.which === 13) {
               addNewItem();
           }
        })

        document.querySelector(DOM.container).addEventListener('click', deleteItem);

        document.querySelector(DOM.addType).addEventListener('change', UIMod.changeFields)

    };

    return {
        init: function () {
            setupEventListeners();
            console.log('App has started');
            UIMod.displayDate();
            UIMod.displayBudget(obj = {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
    }
})(budgetModule, UIModule);

globalModule.init()