export function postRequest(url,data,type="POST"){
    $.ajax({
        url,
        type,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            $('#backdrop').remove()
            location.reload()
        }
    })
}