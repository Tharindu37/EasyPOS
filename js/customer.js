$(document).ready(function (){
    loadTable();
})
let customers = [];
function Customer(id, name, address, salary) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.salary = salary;
}

initializeCustomers = () => {
    let tempData = JSON.parse(localStorage.getItem('customer'));
    if (tempData !== null) {
        customers = tempData;
    }
}

function loadTable() {
    let searchText = $('#search').val();
    let tableBody = '';
    customers.forEach(data => {
        if (data.name.toLowerCase().includes(searchText.toLowerCase()) || data.address.toLowerCase().includes(searchText.toLowerCase())){
            tableBody += `<tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.address}</td>
                        <td>${data.salary}</td>
                        <td>
                        <button class="btn btn-success btn-sm" onclick="loadUpdateModal('${data.id}','${data.name}','${data.address}','${data.salary}')">Update</button>
                        &nbsp;
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${data.id}')">Delete</button>
                        </td>
                       </tr>`
        }
    })
    $('#tableBody').html(tableBody)
}

function saveCustomer() {
    let customer = new Customer(
        $('#customerId').val(),
        $('#customerName').val(),
        $('#customerAddress').val(),
        Number($('#customerSalary').val()),
    );
    if (isExists(customer.id) == undefined) {
        customers.push(customer);
        localStorage.setItem('customer', JSON.stringify(customers));
        launchModal('Success!', 'Customer Saved!');
        loadTable();
    } else {
        launchModal('Warning!', 'Already Exists!')
    }
    clearFields()
}

const isExists = (id) => {
    return customers.find(data => data.id == id);
}

const launchModal = (type, message) => {
    $('#exampleModalLabel').html(type);
    $('.modal-body').html(message)
    $('#success-modal').click();
}

const clearFields = () => {
    $('#customerId').val('')
    $('#customerName').val('')
    $('#customerAddress').val('')
    $('#customerSalary').val('')
}
let tempCustomerId='';
const loadUpdateModal=(id,name,address,salary)=>{
    tempCustomerId=id;
    $('#update_customer_id').val(id);
    $('#update_customer_name').val(name);
    $('#update_customer_address').val(address);
    $('#update_customer_salary').val(salary);

    $('#update-modal').click();
}
function deleteCustomer(id){
    let b = confirm('are you sure?');
    if (b){
        for (let tempId = 0; tempId < customers.length; tempId++) {
            if (customers[tempId].id===id){
                customers.splice(tempId,1);
                localStorage.setItem('customer',JSON.stringify(customers));
                launchModal('Deleted!','Delete Customer');
                loadTable();
            }
        }
    }
}

function updateCustomer(){
    for (let tempId = 0; tempId < customers.length; tempId++) {
        if (customers[tempId].id===tempCustomerId){
            customers[tempId].name=$('#update_customer_name').val()
            customers[tempId].address=$('#update_customer_address').val()
            customers[tempId].salary=$('#update_customer_salary').val()
            localStorage.setItem('customer',JSON.stringify(customers))
            $('#update-close').click();
            launchModal('Updated!','Customer Updated!')
            loadTable();
        }
    }
}