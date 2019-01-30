export  function userForm(){
        return `<div class="form-group">
                    <label>Username</label>
                        <input id="inpUsername" type="text" class="form-control"  aria-describedby="value" placeholder="Enter Username please">
                </div>
                
                <div class="form-group">
                    <label>FullName</label>
                        <input id="inpFullname" type="text" class="form-control"  aria-describedby="value" placeholder="Enter Fullname please">
                </div>
                
                <button id="postU" style="border-radius:50%" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`
        }
            
    
export  function postForm(){
        return `<div class="form-group">
                    <label>Title</label>
                        <input id="inpTitle" type="text" class="form-control"  aria-describedby="value" placeholder="Enter title please">
                </div>
            
                 <div class="form-group">
                    <label>Poster</label>
                        <input id="inpPoster" type="text" class="form-control"  aria-describedby="value" placeholder="Enter poster please">
                 </div>

                 <div class="form-group">
                    <label>Content</label>
                        <input id="inpContent" type="text" class="form-control"  aria-describedby="value" placeholder="Enter content please">
                 </div>

                <button id="postC" style="border-radius:50%" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`
    }

export  function commentForm(){
        return `<div class="form-group">
                                    <label>Content</label>
                                    <input id="inpContent" type="text" class="form-control"  aria-describedby="value" placeholder="Enter content please">
                                </div>
                
                                <div class="form-group">
                                    <label>Post Id</label>
                                    <input id="inpPostId" type="text" class="form-control"  aria-describedby="value" placeholder="Enter Post Id please">
                                </div>
                
                                <button id="postP" style="border-radius:50%" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`
    }

    
//--------Backdrop fired when pressing on edit button-----------------------------------------------------------
export function backdrop(){
        return `<div id="backdrop" class="fade-in" >
            <button id="close" style="float:right;margin:15px" type="button" class="btn btn-light jello-horizontal">X</button>
            <div style="width:100%;text-align:center">
                <form id="form" style="width:50%;margin:10% auto;color:white">
                </form>
            </div>
        </div>`
    } 
//------------------------------------------------------------------------------------------------------------------
export function injectData(arr){
        arr.map((array, index) =>
            array.map(el => {
                const arr = Object.keys(el).map((item, index) => index !== 0 ? `<p class="values" style="margin-left:10px"><span style="color:red">${item.toUpperCase()}:</span>${el[item]}</p>` : null)
                $(`#accordion${index}`).append(`
                    <div class="group innerDiv">
                        <h3 class="innerHeader">${index==0?"User ID:":index==1?"Post ID:":"Comment ID:"} ${el.id}
                            <button class="btn btn-info editBtn" style="cursor:pointer;float:right;width:"20px">Edit</button>
                        </h3>
                        <div>
                            ${arr.map((el)=>el).join("")}
                        </div>                        
                     </div>`)
            }))
}



 