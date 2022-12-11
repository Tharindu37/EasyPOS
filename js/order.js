let orders=[];
const initOrder=()=>{
    let tempData=JSON.parse(localStorage.getItem('order'));
    if (tempData!==null){
        orders=tempData;
        setTableData();
    }
}

function setTableData(){
    let rowData='';
    orders.forEach(responseData=>{
        rowData+=`
         <tr>
         <td>${responseData.orderId}</td>
         <td>${responseData.date}</td>
         <td>${responseData.total}</td>
         <td><button class="btn btn-primary btn-sm" onclick="showDetails('${responseData.orderId}')">Show Details</button></td>
</tr>
        `
    })
    $('#tableData').html(rowData);
}

const showDetails=(id)=>{
    const order=orders.find((e)=>id==e.orderId);
    if (order!=undefined){
        $('#modalButton').click();
        //load table one data
        $('#order_id').html(order.orderId);
        $('#order_cost').html(order.total);
        $('#order_date').html(order.date);
        $('#customer_id').html(order.customer);
        let customers=JSON.parse(localStorage.getItem('customer'));
        if (customers!=null){
            let tempCustomer=customers.find(e=>e.id==order.customer);
            $('#customer_name').html(tempCustomer.name)
        }
        //load table two data
        let tableRowData='';
        order.orderItems.forEach(response=>{
            let items=JSON.parse(localStorage.getItem('item'));
            let description='';
            if (items!=null){
                let item=items.find(e=>e.code==response.code);
                description=item.description;
            }
            tableRowData+=`
            <tr>
            <td>${response.code}</td>
            <td>${description}</td>
            <td>${response.unitPrice}</td>
            <td>${response.qty}</td>
            <td>${response.total}</td>
</tr>
            `
        })
        $('#tableTwoData').html(tableRowData)
    }
}