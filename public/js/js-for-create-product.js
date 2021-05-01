document.addEventListener("DOMContentLoaded",function (){
    $("form[name=register-form]").validate({
        rules:{
            name: {
                required: true
            },
            description: "required",
            price: "required",
            thumbnail: "required"
        },
        messages:{
            name: {
                required: "Please enter name product"
            },
            description: "Please enter description",
            price: "Please enter price",
            thumbnail: "Please enter thumbnail"
        },
        submitHandler: function (){
            $("form[name=register-form]").submit();
        }
    })
})