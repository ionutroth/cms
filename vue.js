$(".custom-file-input").on("change", function(){
    var fileName = $(this).val().split("\\").pop();
    console.log(fileName);
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});