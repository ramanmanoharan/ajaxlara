$(document).ready(function () {

get_company_data()

$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});

//Get all company
function get_company_data() {
    //alert(root_url);
	$.ajax({
        url: root_url,
        type:'GET',
    	data: { }
	}).done(function(data){
        table_data_row(data.data)
	});
}

//Company table row
function table_data_row(data) {

    var	rows = '';
    
	$.each( data, function( key, value ) {
        
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.name+'</td>';
        rows = rows + '<td>'+value.email+'</td>';
        rows = rows + '<td>'+value.phone+'</td>';
        rows = rows + '<td>'+value.address+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
                rows = rows + '<a class="btn btn-info text-white"  id="editCompany" data-id="'+value.id+'" data-toggle="modal" data-target="#modal-id"><i class="fa fa-pencil"></i></a> ';
                rows = rows + '<a class="btn btn-danger text-white"  id="deleteCompany" data-id="'+value.id+'" ><i class="fa fa-trash"></i></a> ';
                rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});

	$("tbody").html(rows);
}

//Insert employee 
$("body").on("click","#createNewCompany",function(e){

    e.preventDefault;
    $('#userCrudModal').html("Create Employee");
    $('#submit').val("Create Employee");
    $('#modal-id').modal('show');
    $('#company_id').val('');
    $('#companydata').trigger("reset");

});

//insert data 
$('body').on('click', '#submit', function (event) {

    event.preventDefault()
    var id = $("#company_id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
   
   
    $.ajax({
      url: store,
      type: "POST",
      data: {
        id: id,
        name: name,
        email: email,
        phone: phone,
        address: address
      },
      dataType: 'json',
      success: function (data) {
          
          $('#companydata').trigger("reset");
          $('#modal-id').modal('hide');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          })
          get_company_data()
      },
      error: function (data) {
          console.log('Error......');
      }
  });
});

//Edit 
$('body').on('click', '#editCompany', function (event) {

    event.preventDefault();
    var id = $(this).data('id');
   
    $.get(store+'/'+ id+'/edit', function (data) {
         
         $('#userCrudModal').html("Edit company");
         $('#submit').val("Edit company");
         $('#modal-id').modal('show');
         $('#company_id').val(data.data.id);
         $('#name').val(data.data.name);
         $('#email').val(data.data.email);
         $('#phone').val(data.data.phone);
         $('#address').val(data.data.address);
     })
});

 //Delete Employee
 $('body').on('click', '#deleteCompany', function (event) {
    if(!confirm("Do you really want to Delete?")) {
       return false;
     }

     event.preventDefault();
    var id = $(this).attr('data-id');
 
    $.ajax(
        {
          url: store+'/'+id,
          type: 'DELETE',
          data: {
                id: id
        },
        success: function (response){
          
            Swal.fire(
              'Delete!',
              'Employee deleted successfully!',
              'success'
            )
            get_company_data()
        }
     });
      return false;
   });

});