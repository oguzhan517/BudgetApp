// Variables for DOM
let addButton = document.querySelector(".add-item");
let expenseList = document.querySelector(".expense-list");
let incomeList = document.querySelector(".income-list");
let itemContainer = document.querySelector(".item-container");
let entryToggle = document.querySelector(".entry-toggle");
incomeList.style.display = "none";
let incomePriceSum = document.querySelector(".income-price-sum");
let incomeSum = document.querySelector(".income-sum");
let expenseSum = document.querySelector(".expense-sum");
let expensePriceSum = document.querySelector(".expense-price-sum");
let expensePrices = document.querySelectorAll(".expense-item-price");
let incomePrices = document.querySelectorAll(".income-item-price");
let calcSum = document.querySelector(".calc-sum");
let examineToggle = document.querySelector(".examine-toggle");
let container = document.querySelector(".container");
document.querySelector(".calc-sum-month").style.visibility = "hidden";
let itemMonth = document.querySelector("#month");
let allElements = Array.from(document.querySelectorAll("li"));
let monthpick = document.querySelector("#month-filter");
const dates = document.querySelectorAll(".date");
let totalExpenseMonth = 0;
let totalIncomeMonth = 0;
let incomeArray = localStorage.getItem("incomeArray")
  ? JSON.parse(localStorage.getItem("incomeArray"))
  : [];
let expenseArray = localStorage.getItem("expenseArray")
  ? JSON.parse(localStorage.getItem("expenseArray"))
  : [];

// toggle between income and expense
entryToggle.addEventListener("change", function (e) {
  if (examineToggle.textContent == "Yan yana incele") {
    if (e.target.value == "income") {
      incomeList.style.display = "block";
      expenseList.style.display = "none";
    } else {
      expenseList.style.display = "block";
      incomeList.style.display = "none";
    }
  }
});

// page load functionality

window.addEventListener("load", (event) => {
  incomeArray.forEach((incomeItem) => {
    let htmlItem = `<li class="income-item-${incomeItem.id}"><h2 class="expense-item-header">${incomeItem.incomeName}</h2><div><p class="item-price"><span class="income-item-price">${incomeItem.incomePrice}</span> TL</p>
  <div class="date">${incomeItem.itemDate}</div><button class="delete-button">X</button></div></li>`;
    incomeList.insertAdjacentHTML("beforeend", htmlItem);
    incomeTotal += parseFloat(incomeItem.incomePrice);
  });
  expenseArray.forEach((expenseItem) => {
    let currentYear = moment().year();
    let htmlItem = `<li class="income-item-${expenseItem.id}"><h2 class="expense-item-header">${expenseItem.expenseName}</h2><div><p class="item-price"><span class="income-item-price">${expenseItem.expensePrice}</span> TL</p>
  <div class="date">${expenseItem.itemDate}</div><button class="delete-button">X</button></div></li>`;
    expenseList.insertAdjacentHTML("beforeend", htmlItem);
    expenseTotal += parseFloat(expenseItem.expensePrice);
  });
  incomeSum.textContent = incomeTotal;
  expenseSum.textContent = expenseTotal;
  calcSum.textContent = incomeTotal - expenseTotal;
});

// month pick event functionality
monthpick.addEventListener("change", function (e) {
  allElements = Array.from(document.querySelectorAll("li"));
  totalExpenseMonth = 0;
  totalIncomeMonth = 0;
  if (e.target.value == 13) {
    document.querySelector(".calc-sum-month").style.visibility = "hidden";
    allElements.forEach((element) => (element.style.visibility = "visible"));
  } else {
    document.querySelector(".calc-sum-month").style.visibility = "visible";
    const startDate = moment(`01/${e.target.value}/2024`, "DD/MM/YYYY");
    const endDate = startDate.clone().endOf("month");
    let filteredElements = allElements.filter((element) => {
      return moment(
        element.children[1].children[1].textContent,
        "MM/YYYY"
      ).isBetween(startDate, endDate, undefined, []);
    });
    allElements.forEach((element) => (element.style.visibility = "hidden"));
    filteredElements.forEach((element) => {
      if (element.parentNode.classList.contains("expense-list")) {
        totalExpenseMonth += parseFloat(
          element.children[1].children[0].children[0].textContent
        );
      } else {
        totalIncomeMonth += parseFloat(
          element.children[1].children[0].children[0].textContent
        );
      }
      document.querySelector(
        ".calc-month"
      ).textContent = `${totalIncomeMonth} - ${totalExpenseMonth} = ${
        totalIncomeMonth - totalExpenseMonth
      }`;
      element.style.visibility = "visible";
    });
    if (filteredElements.length == 0) {
      document.querySelector(".calc-sum-month").style.visibility = "hidden";
    }
  }
});

// expense total calculation
let expenseTotal = 0;
expensePrices.forEach((priceElement) => {
  const priceExpense = parseFloat(priceElement.textContent); // Text'i sayıya çevir
  expenseTotal += priceExpense; // Topla
});

// income total calculation
let incomeTotal = 0;
incomePrices.forEach((priceElement) => {
  const priceIncome = parseFloat(priceElement.textContent); //  consoText'i sayıya çevir
  incomeTotal += priceIncome;
  console.log(incomeTotal); // Topla
});

// bridge between expense and income
calcSum.textContent = incomeTotal - expenseTotal;

document.querySelector(".expense-sum").textContent = expenseTotal;
document.querySelector(".income-sum").textContent = incomeTotal;

// Add Button Functionality
addButton.addEventListener("click", function () {
  // add button for income values
  if (entryToggle.value == "income") {
    let itemMonthValue = itemMonth.value;
    let currentYear = moment().year();
    let itemD = moment(`${itemMonthValue}/2024`, "MM/YYYY");
    let itemDate = itemD.format("MM/YYYY");
    let incomeListLength = incomeList.getElementsByTagName("li").length;
    let incomeName = document.querySelector(".input-name").value;
    let incomePrice = document.querySelector(".input-numeric").value;
    let incomeItem = {
      id: incomeListLength + 1,
      incomeName,
      incomePrice,
      itemDate,
    };
    incomeArray.push(incomeItem);
    localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    if (itemD.format("MM") == monthpick.value) {
      totalIncomeMonth += parseFloat(incomePrice);
    }
    document.querySelector(
      ".calc-month"
    ).textContent = `${totalIncomeMonth} - ${totalExpenseMonth} = ${
      totalIncomeMonth - totalExpenseMonth
    }`;
    incomeTotal += parseFloat(incomePrice);
    document.querySelector(".income-sum").textContent = incomeTotal;
    let htmlItem = `<li class="income-item-${
      incomeListLength + 1
    }"><h2 class="expense-item-header">${incomeName}</h2><div><p class="item-price"><span class="income-item-price">${incomePrice}</span> TL</p>
  <div class="date">${itemDate}</div><button class="delete-button">X</button></div></li>`;
    incomeList.insertAdjacentHTML("beforeend", htmlItem);
    // add button for expense values
  } else {
    let itemMonthValue = itemMonth.value;
    const currentYear = moment().year();
    let itemD = moment(`${itemMonthValue}/2024`, "MM/YYYY");
    let itemDate = itemD.format("MM/YYYY");
    let expenseListLength = expenseList.getElementsByTagName("li").length;
    let expenseName = document.querySelector(".input-name").value;
    let expensePrice = document.querySelector(".input-numeric").value;
    if (itemD.format("MM") == monthpick.value) {
      totalExpenseMonth += parseFloat(expensePrice);
    }
    let expenseItem = {
      id: expenseListLength + 1,
      expenseName,
      expensePrice,
      itemDate,
    };
    expenseArray.push(expenseItem);
    localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
    document.querySelector(
      ".calc-month"
    ).textContent = `${totalIncomeMonth} - ${totalExpenseMonth} = ${
      totalIncomeMonth - totalExpenseMonth
    }`;
    expenseTotal += parseFloat(expensePrice);
    document.querySelector(".expense-sum").textContent = expenseTotal;
    let htmlItem = `<li class="expense-item-${
      expenseListLength + 1
    }"><h2 class="expense-item-header">${expenseName}</h2><div><p class="item-price"><span class="expense-item-price">${expensePrice}</span> TL</p><div class="date">${itemDate}</div><button class="delete-button">X</button></div></li>`;
    expenseList.insertAdjacentHTML("beforeend", htmlItem);
  }
  // final calculation after adding some data
  calcSum.textContent = incomeTotal - expenseTotal;
});

// removing an element from DOM, interested calculations
container.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-button")) {
    if (
      e.target.parentNode.parentNode.parentNode.classList.contains(
        "income-list"
      )
    ) {
      incomeTotal -= parseFloat(
        e.target.previousElementSibling.previousElementSibling.children[0]
          .textContent
      );
      let incomeArray = JSON.parse(localStorage.getItem("incomeArray"));
      let newIncomeArray = incomeArray.filter((item) => {
        return item.id != e.target.parentNode.parentNode.className.slice(-1);
      });
      localStorage.setItem("incomeArray", JSON.stringify(newIncomeArray));
      if (monthpick.value !== "13") {
        totalIncomeMonth -= parseFloat(
          e.target.previousElementSibling.previousElementSibling.children[0]
            .textContent
        );
        document.querySelector(
          ".calc-month"
        ).textContent = `${totalIncomeMonth} - ${totalExpenseMonth} = ${
          totalIncomeMonth - totalExpenseMonth
        }`;
      }
      document.querySelector(".income-sum").textContent = incomeTotal;
    } else {
      expenseTotal -= parseFloat(
        e.target.previousElementSibling.previousElementSibling.children[0]
          .textContent
      );
      let expenseArray = JSON.parse(localStorage.getItem("expenseArray"));
      let newExpenseArray = expenseArray.filter((item) => {
        return item.id != e.target.parentNode.parentNode.className.slice(-1);
      });
      localStorage.setItem("expenseArray", JSON.stringify(newExpenseArray));
      if (monthpick.value !== "13") {
        totalExpenseMonth -= parseFloat(
          e.target.previousElementSibling.previousElementSibling.children[0]
            .textContent
        );
        document.querySelector(
          ".calc-month"
        ).textContent = `${totalIncomeMonth} - ${totalExpenseMonth} = ${
          totalIncomeMonth - totalExpenseMonth
        }`;
      }

      document.querySelector(".expense-sum").textContent = expenseTotal;
    }
    e.target.parentNode.parentNode.remove();
    // final calculation after removing an element
    calcSum.textContent = incomeTotal - expenseTotal;
  }
});

// Examine and normal mod toggle functionality
examineToggle.addEventListener("click", function () {
  if (examineToggle.textContent == "Yan yana incele") {
    examineToggle.textContent = "Normal görünüm";
    itemContainer.style.cssFloat = "left";
    expenseList.style.display = "inline-block";
    expenseList.style.width = "300px";
    incomeList.style.width = "300px";
    incomeList.style.display = "inline-block";
  } else {
    examineToggle.textContent = "Yan yana incele";
    if ((entryToggle.value = "income")) {
      expenseList.style.display = "none";
      incomeList.style.display = "block";
    } else {
      incomeList.style.display = "none";
      expenseList.style.display = "block";
    }
    expenseList.style.width = "500px";
    incomeList.style.width = "500px";
  }
});
