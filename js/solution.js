$(document).ready(function() {
  // <------ Get Sum of elements with reduce ------>
  //First we get the collection of all the prices
  const allPrices = $(".cost");
  //With the spread operator we cast it to an array
  const allPricesArray = [...allPrices];
  //with reduce we get the sum
  const totalPrice = allPricesArray.reduce((sum, currentElement) => {
    //we use the accumulat for storing values
    //current element is every element that has class="cost"
    //we need to get the innterText and change it to an integer so we can use it to get the sum;
    const prodPrice = parseInt(currentElement.innerText);
    //add current price to sum
    return sum + prodPrice;
  }, 0);
  // Populate the html of the totalPrice element.
  $(".totalPrice").text(totalPrice);

  // <------ Filter out elements ------>
  //We beed all the list elements inside .film
  const allFilms = $(".films li");
  //cast it to an array
  const allFilmsArray = [...allFilms];
  //The event on which the change occurs will be the event buttons

  $(".film-selectors input").on("change", function() {
    //First we need to know what has been selected this can be multiple elements
    const selectedInputs = $("input:checked");
    //Cast html elements to array
    const selectedInputsArray = [...selectedInputs];
    //Use .map to return a new array that only has the selected values;
    const values = selectedInputsArray.map(listItem => listItem.value);

    //If nothing is selected we want to show all the elements and stop the function from executing further
    if (values.length === 0) {
      $(allFilmsArray).show();
      return;
    }
    //We use filter to get all the selected films (which we want to show)
    const selectedFilms = allFilmsArray.filter(film => {
      //includes is an array method which checks if a word exists in the array and will return either true or false;
      return values.includes(film.className);
    });
    // And filter again to get all the elements so we can hide
    const unSelectedFilms = allFilmsArray.filter(film => {
      return !values.includes(film.className);
    });
    // We can use these arrays to select elements
    $(selectedFilms).show();
    $(unSelectedFilms).hide();
  });

  // <------ Order elements ------>
  //Order is the select element. We add an event listener to see which value had been selected and to apply logic
  $("#order").on("change", function() {
    //We need to find the child of select that has been selected
    const value = $(this).find("option:checked")[0].value;
    //We need all the table rows with information and cast it into an array
    const tableRows = $(".table-body tr");
    const tableArray = [...tableRows];

    //Our sorting agorithm will loop over our rows
    const orderedArray = tableArray.sort((nextElement, currentElement) => {
      //The callback has to compare the value of two elements.
      //both next and current element are row items.
      //Here we find the direct children and use the selected value (which should be the same a class name in the html)
      const a = $(nextElement).children(`.${value}`)[0].innerText;
      const b = $(currentElement).children(`.${value}`)[0].innerText;

      if (a < b) return -1;
      if (a > b) return 1;
      else return 0;
    });
    //The ordered row will overwrite the current table.
    $(".table-body").html(orderedArray);
  });
});
