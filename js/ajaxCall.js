var rootpath="http://203.124.98.186/mobappapiv1/Service.svc/";
function ajaxcall(service,parameter,successfunction,errorfunction)
{
	 $.ajax({
			        type: "POST",
			        url: rootpath + service,
			        data: JSON.stringify(parameter),
			        contentType: "application/json; charset=utf-8",
			        datatype: JSON,
			        success: successfunction,
			        error:errorfunction
			    });
}
		