/***
 * BUDGET CONTROLLER (STANDALONE)
 ***/

var budgetController = (function () {
    //Objekt für ausgaben PRIVAT erzeugen
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    //Objekt für Einnahmen PRIVAT erzeugen
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Datenstruktur
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        }
    }


})();//Invoke Function;


/***
 * UI CONTROLLER (STANDALONE)
 ***/

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    //Used in the other Controller.
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, //'inc' or 'exp'
                description: document.querySelector(DOMStrings.inputDescription).value, //string
                value: document.querySelector(DOMStrings.inputValue).value //string
            };
        },

        addListItem: function (obj, type) {
            // Lokale Vars
            var html, newHtml, element;

            //Create HTML String with placeholder text.
            // Unterscheidung income und expenses, je nachdem anhängen den HTML Fragments
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.input);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        getDOMStrings: function () {
            return DOMStrings;
        }
    }

})();


/***
 * GLOBAL APP CONTROLLER w/ Params budgetCtrl & UICtrl
 * ***/


var controller = (function (budgetCtrl, UICtrl) {

    function setupEventListeners() {

        //DOM-Strings aus privatem Scope via GET-Methode einholen.
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                console.log('Enter was pressed.');
                ctrlAddItem();
            }

        });
    }

    var ctrlAddItem = function () {

        var input, newItem;

        // 1. get the input data
        input = UICtrl.getInput();

        // 2. add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. add new item to UI
        UICtrl.addListItem(newItem, input.type);

        // 4. clear the fields
        UICtrl.clearFields();
        // 5. calculate the budget

        // 6. display the budget on the UI
        console.log('it works....')
    };

    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners()
        }
    }


})(budgetController, UIController);//Invoke Function, Execute other Modules;

controller.init();

