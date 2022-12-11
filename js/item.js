$(document).ready(function (){
    loadTable();
})
let items = [];
function Item(code, description, qtyOnHand, unitPrice) {
    this.code = code;
    this.description = description;
    this.qtyOnHand = qtyOnHand;
    this.unitPrice = unitPrice;
}

initializeCustomers = () => {
    let tempData = JSON.parse(localStorage.getItem('item'));
    if (tempData !== null) {
        items = tempData;
    }
}

function loadTable() {
    let searchText = $('#search').val();
    let tableBody = '';
    items.forEach(data => {
        if (data.description.toLowerCase().includes(searchText.toLowerCase())){
            tableBody += `<tr>
                        <td>${data.code}</td>
                        <td>${data.description}</td>
                        <td>${data.qtyOnHand}</td>
                        <td>${data.unitPrice}</td>
                        <td>
                        <button class="btn btn-success btn-sm" onclick="loadUpdateModal('${data.code}','${data.description}','${data.qtyOnHand}','${data.unitPrice}')">Update</button>
                        &nbsp;
                        <button class="btn btn-danger btn-sm" onclick="deleteItem('${data.code}')">Delete</button>
                        </td>
                       </tr>`
        }
    })
    $('#tableBody').html(tableBody)
}

function saveItem() {
     let item = new Item(
        $('#itemCode').val(),
        $('#description').val(),
        Number($('#quantityOnHand').val()),
        Number($('#unitPrice').val())
    );
    if (isExists(item.code) == undefined) {
        items.push(item)
        localStorage.setItem('item', JSON.stringify(items));
        launchModal('Success!', 'Item Saved!');
        loadTable();
    } else {
        launchModal('Warning!', 'Already Exists!')
    }
    clearFields()
}

const isExists = (code) => {
    return items.find(data => data.code == code);
}

const launchModal = (type, message) => {
    $('#exampleModalLabel').html(type);
    $('.modal-body').html(message)
    $('#success-modal').click();
}

const clearFields = () => {
    $('#itemCode').val('')
    $('#description').val('')
    $('#quantityOnHand').val('')
    $('#unitPrice').val('')
}
let tempItemCode='';
const loadUpdateModal=(code,description,qtyOnHand,unitPrice)=>{
    tempItemCode=code;
    $('#update_item_code').val(code);
    $('#update_item_description').val(description);
    $('#update_item_qtyOnHand').val(qtyOnHand);
    $('#update_item_unitPrice').val(unitPrice);

    $('#update-modal').click();
}
function deleteItem(code){
    let b = confirm('are you sure?');
    if (b){
        for (let tempId = 0; tempId < items.length; tempId++) {
            if (items[tempId].code===code){
                items.splice(tempId,1);
                localStorage.setItem('item',JSON.stringify(items));
                launchModal('Deleted!','Delete Item');
                loadTable();
            }
        }
    }
}

function updateItem(){
    for (let tempId = 0; tempId < items.length; tempId++) {
        if (items[tempId].code===tempItemCode){
            items[tempId].description=$('#update_item_description').val()
            items[tempId].qtyOnHand=$('#update_item_qtyOnHand').val()
            items[tempId].unitPrice=$('#update_item_unitPrice').val()
            localStorage.setItem('item',JSON.stringify(items))
            $('#update-close').click();
            launchModal('Updated!','Item Updated!')
            loadTable();
        }
    }
}