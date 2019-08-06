// When does it need to occur (event listeners)? When
// Which elements do I need (selecting)? What
// What is the data type I'm working with and how can extract useful information out of it? How
// What needs to change? The result.

$(document).ready(function() {
  $("button").click(function() {
    // const antotherWay = Array.from(allPrices)

    const allPrices = $(".cost");
    const allPriceArray = [...allPrices];
    const totalPrice = allPriceArray.reduce((sum, currentElement) => {
      const displayValue = $(currentElement).css("display");
      debugger;
      if (displayValue === "inline") {
        const currentElementsPrice = parseInt(currentElement.innerHTML);
        return sum + currentElementsPrice;
      } else {
        return sum;
      }
    }, 0);

    $(".totalPrice").html(totalPrice);
  });

  $(".film-selectors input").change(function() {
    const listItems = $(".films li");
    const litstItemsArray = [...listItems];
    const selectedItems = $(".film-selectors input:checked");
    const selectedItemsArray = [...selectedItems];

    if (selectedItems.length === 0) {
      listItems.show();
      return;
    }

    const selectedElements = selectedItemsArray.map(inputfield => {
      return inputfield.value;
    });

    const listItemsToShow = litstItemsArray.filter(listItem => {
      if (selectedElements.includes(listItem.className)) {
        return listItem;
      }
    });

    const listItemsToHide = litstItemsArray.filter(listItem => {
      if (!selectedElements.includes(listItem.className)) {
        return listItem;
      }
    });

    $(listItemsToShow).show();
    $(listItemsToHide).hide();
  });
});
