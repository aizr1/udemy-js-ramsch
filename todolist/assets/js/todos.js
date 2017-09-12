//check specific todos by clicking on them
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

//click on x to delete todostuff
$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(2000, function () {
        $(this).remove();
    });
    event.stopPropagation()
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        //grab new todoS from input field
        var todoText = $(this).val();
        //create a new li and add to ul
        $("ul").append("<li><span>X</span> " + todoText + "</li>")
    }
});