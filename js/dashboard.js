loadUserDetails=()=>{
    try{
        let userDetails=JSON.parse(localStorage.getItem('user'));
        $('.user-name').html(userDetails.name);
        $('#avatar').attr('src',userDetails.avatar);
        setUi('customer')
    }catch (e){
        alert('Something went wrong!')
        window.location.replace('../index.html')
    }
}

setUi=(location)=>{
    $('#frame').attr('src','../pages/'+location+'.html')
    /*switch (id){
        case "customer":$('#frame').attr('src','../pages/customer.html');break;
        case "item": $('#frame').attr('src','../pages/item.html');break;
        case "orders":$('#frame').attr('src','../pages/orders.html');break;
        case "place-order":$('#frame').attr('src','../pages/place-order.html');break;
    }*/
}