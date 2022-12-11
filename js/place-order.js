let items=[];
let customers=[];
let cart=[];
let orders=[];
const loadData=()=>{
    //order id
    generateOrderId();
    //set Date
    let date=new Date();
    let currentDate=date.toISOString().split('T')[0];
    $('#date').html(currentDate)

    //load item codes;
    let tempItemData=JSON.parse(localStorage.getItem('item'));
    if (tempItemData !== null){
        items=tempItemData;
        let itemOption='';
        items.forEach(response=>{
            itemOption+=`
                <option value="${response.code}">${response.code}</option> `
        });
        $('#itemCode').html(itemOption);
        setItemData();
    }
    //load customer ids;
    let tempCustomerData=JSON.parse(localStorage.getItem('customer'));
    if (tempCustomerData!==null){
        customers=tempCustomerData;
        let customerOption='';
        customers.forEach(response=>{
            customerOption+=`
                <option value="${response.id}">${response.id}</option> `
        });
        $('#customerId').html(customerOption)
        setCustomerData();
    }
}

$('#customerId').change(()=>{
    setCustomerData();
})
$('#itemCode').change(()=>{
    setItemData();
})
function setCustomerData(){
    let tempCustomerId=$('#customerId').val();
    let tempCustomer = customers.find(response=>response.id==tempCustomerId);
    $('#name').val(tempCustomer.name)
    $('#address').val(tempCustomer.address)
    $('#salary').val(tempCustomer.salary)
}

function setItemData(){
    let tempItemCode=$('#itemCode').val();
    let tempItem=items.find(response=>response.code==tempItemCode);
    $('#description').val(tempItem.description)
    $('#qtyOnHand').val(tempItem.qtyOnHand)
    $('#unitPrice').val(tempItem.unitPrice)
}
function Cart(code,description,unitPrice,qty,total){
    this.code=code;
    this.description=description;
    this.unitPrice=unitPrice;
    this.qty=qty;
    this.total=total;
}
function addToCart(){
    let qty =Number($('#qty').val());
    let unitPrice=Number($('#unitPrice').val());
    let total=qty*unitPrice;

    if (qty>Number($('#qtyOnHand').val())){
        alert('Please Enter a Valid QTY')
        return;
    }
    let rowNumber=isExists($('#itemCode').val());
    if (rowNumber!=-1){
        let tempQty=cart[rowNumber].qty+qty
        if (tempQty>Number($('#qtyOnHand').val())){
            alert('Please Enter a Valid QTY')
            return;
        }
        cart[rowNumber].qty=tempQty;
        cart[rowNumber].total=cart[rowNumber].qty*unitPrice;
    }else {
        tempCartObject=new
        Cart(
            $('#itemCode').val(),
            $('#description').val(),
            unitPrice,
            qty,
            total
        )
        cart.push(tempCartObject)
    }
    setCartData();
}
const setCartData=()=>{
    let row='';
    cart.forEach(response=>{
        row+=`
        <tr>
        <td>${response.code}</td>
        <td>${response.description}</td>
        <td>${response.unitPrice}</td>
        <td>${response.qty}</td>
        <td>${response.total}</td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="removeItem('${response.code}')">Delete</button>
</td>
</tr>
        `
    });
    $('#cardData').html(row)
    calculateTotal();
}

const calculateTotal=()=>{
    console.log('ok')
    let netTotal=0;
    cart.forEach(response=>{netTotal+=response.total})
    $('#netTotal').html(netTotal)
    console.log(netTotal)
}
const isExists=(code)=>{
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].code==code){
            console.log(i)
            return i;
        }
    }
    return -1;
}
const generateOrderId=()=>{
    //D-1
    //get the last id from the database
    let tempOrderData=JSON.parse(localStorage.getItem('order'));
    if (tempOrderData!==null){
        let lastElement=tempOrderData[tempOrderData.length-1];
        console.log(lastElement)
        let lastElementId=lastElement.orderId;
        let splitValue=Number(lastElementId.toString().split('-')[1]);
        let orderId='D-'+(splitValue+1);
        $('#orderCode').html(orderId);
    }else {
        $('#orderCode').html('D-1')
    }
}

function Order(orderId,date,total,customer,orderItems){
    this.orderId=orderId;
    this.date=date;
    this.total=total;
    this.customer=customer;
    this.orderItems=orderItems;
}
function OrderItems(code,qty,unitPrice,total){
    this.code=code;
    this.qty=qty;
    this.unitPrice=unitPrice;
    this.total=total;
}

function placeOrder(){
    let orderItemsArr=[];
    cart.forEach(response=>{
        let item=new OrderItems(
            response.code,
            response.qty,
            response.unitPrice,
            response.total
        )
        orderItemsArr.push(item)
    })
    let order=new Order(
        $('#orderCode').html(),
        $('#date').html(),
        $('#netTotal').html(),
        $('#customerId').val(),
        orderItemsArr
    );
    let tempOrder=JSON.parse(localStorage.getItem('order'))
    if (tempOrder!=null){
        orders=tempOrder;
    }
    orders.push(order)
    localStorage.setItem('order',JSON.stringify(orders));
    //===============
    updateItemQty(orderItemsArr)
    //===============
    generateOrderId();
    cart=[];
    setCartData();
    alert('Order placed!')
}
const updateItemQty=(details)=>{
    let itemArr=JSON.parse(localStorage.getItem('item'));
    details.forEach(responseData=>{
        if (itemArr!==null){
            for (let i = 0; i < itemArr.length; i++) {
                if (itemArr[i].code==responseData.code){
                    itemArr[i].qtyOnHand=(itemArr[i].qtyOnHand-responseData.qty);
                }
            }
        }
    })
    localStorage.setItem('item',JSON.stringify(itemArr));
    loadData();

}
const removeItem=(code)=>{
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].code==code){
            cart.splice(i,1)
            setCartData();
        }
    }
}