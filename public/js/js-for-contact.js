document.addEventListener("DOMContentLoaded",function (){
    $("form[name=form-contact]").validate({
        rules:{
            name: {
                required: true
            },
            email: "required",
            subject: "required",
            messeage: "required"
        },
        messages:{
            name: {
                required: "Please enter your name"
            },
            email: "Please enter your email",
            subject: "Please enter your subject",
            messeage: "Please enter your message"
        },
        submitHandler: function (){
            $("form[name=form-contact]").submit();
        }
    })
})