import { backdrop,commentForm,postForm,userForm,injectData} from './templates.js'
import {postRequest} from './serverApi.js'

(() => {
    //--------------------------------Create Accordions-------------------------------------------
    function createAccordionTemplate() {
        for (const i of [3, 4, 5]) {
            $(".row").append(
                `<div class="col-sm" id="accordion${i}">
                    <div class="group">
                        <h3 class="myheader">${i==3?`<i class="fas fa-user-tie">Users</i><button id="addUser" style="float:right" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`:i==4?`<i class="fas fa-pen"> Posts</i><button id="addPost" style="float:right" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`:`<i class="fas fa-comments"> Comments</i><button id="addComment" style="float:right" type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>`}</h3>
                        <div id="myGroup">
                        <div style="margin-left:20px"  id="accordion${i-3}">
                    </div>
                </div>    
            </div>
    </div>`)
    }
}
//------------------------------------END Create of Accordion Template-----------------------------

//-----------------------------------Init Accordions properties-------------------------------------
function initAccordion() {
    $("#accordion3,#accordion4,#accordion5")
    .accordion({
        heightStyle: "content",
        animate: 500,
        collapsible: true,
        active: false,
        header: "> div > h3"
    })

    $("#accordion0,#accordion1,#accordion2")
    .sortable({
        cursor: "move",
        axis: "y",
        handle: "h3",
        stop: function (event, ui) {
            ui.item.children("h3").triggerHandler("focusin");
            $(this).accordion("refresh");
        }
    })

    .accordion({
        heightStyle: "content",
        animate: 500,
        collapsible: true,
        active: false,
        header: "> div > h3"
    })
}
//----------------------------------------------------------------------------------------
    
//-------------User constructor---------------
function User({id,user_name,full_name}){
    this.id = id;
    this.user_name = user_name;
    this.full_name = full_name;
}
//-------------Post constructor---------------
function Post({id,title,poster,content}){
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.content = content;
}
//-------------Comment constructor---------------
function Comment({id,content,post_id}){
    this.id = id;
    this.content = content;
    this.post_id = post_id;
}


async function doAjax(){
     const arr=[]
     const users =await $.getJSON("http://localhost:3000/users")
     arr.push(users.map(obj => new User(obj)))
     const posts =await $.getJSON("http://localhost:3000/posts")
     arr.push(posts.map(obj => new Post(obj)))
     const comments =await $.getJSON("http://localhost:3000/comments")
     arr.push(comments.map(obj => new Comment(obj)))
    
    injectData(arr)

    
    //----Add event to edit button------------------------------------------------------------------------------------------------------
    $('.editBtn').click(function () {
        const accordion = $(this).parent().parent().parent()["0"].id
        //------------------------------------Show backdrop--------------------------------------------------------------------------
        $('body').append(backdrop())
        const inputsObj = $(this).parent().next().children()
        const inputArr = Object.keys(inputsObj)
        const postId = inputsObj.parent().prev()["0"].innerText.replace("Edit","").split(":")[1].replace("\n","").trim(" ")
        let val;
        
        //---------Create edit form---------------------------------------------------------------------------------------------------
        for (let i = 0; i < inputsObj["length"]; i++) {    
            val = inputsObj[inputArr[i]].innerText.split(":")
            $('#form').append(
                `<div class="form-group">
                    <label>${val[0]}</label>
                        <input  id=${accordion+i}  type="text" class="form-control"  aria-describedby="value" placeholder="${val[1]}">
                </div>`)
        }
        
        //Append submit button  to form
        $('#form').append(`<button id="sub" type="submit" class="btn btn-success">Submit</button>`)
        //----------------------------------------------------------
        $("#close").click(function(){$(this).parent().remove()})
        
        //On submit clicked ,recognize which accordion changed and make put method   
        $('#sub').click(function (e) {
            e.preventDefault() 
            let url,data
            if (accordion == "accordion0") {
                url = 'users'
                data = {
                    id: postId,
                    user_name: $('#accordion00')["0"].value, //TODO: Why the number is string?
                    full_name: $('#accordion01')["0"].value
                }
            }else if (accordion == "accordion1") {
                url = 'posts'
                data = {
                    id: postId,
                    title: $('#accordion10')["0"].value,
                    poster: $('#accordion11')["0"].value,
                    content: $('#accordion12')["0"].value
                }
            }else{
                url = 'comments'
                data = {
                    id: postId,
                    content: $('#accordion20')["0"].value,
                    post_id: $('#accordion21')["0"].value
                }
            }
            
            postRequest(`http://localhost:3000/${url}/${postId}`,data,'PUT') 

        })
    })
}          
        
   doAjax()
   createAccordionTemplate()
   initAccordion()
//--------------------------------------------------------------------------------------------

//ADD events-To main accordions headers (cahnge styled class)---------------------------------
    $('.myheader').click(function () {
        $(this).hasClass("myheader-red") ? $(this).removeClass("myheader-red").addClass("myheader-blue") :
        $(this).removeClass("myheader-blue").addClass("myheader-red")
    })
//----------------------------END-------------------------------------------------------------

//--------------------------------------------------------------------------------------------
    function clickHandler(buttonType){
        $('body').append(backdrop())

        //TODO: Always use curely brackets
        if(buttonType=="postU")
            $('#form').append(userForm())
        else if(buttonType=="postC")
            $('#form').append(postForm())
        else
            $('#form').append(commentForm())
        
        $("#close").click(function(){$(this).parent().remove()})
        
        $(`#${buttonType}`).click(function(){
            if(buttonType=="postU"){
                const user_name=$(this).prev().prev().children().next()["0"].value
                const full_name=$(this).prev().children().next()["0"].value
                postRequest(`http://localhost:3000/users`,{user_name,full_name})
            }
            else if(buttonType=="postC"){
                const title=$(this).prev().prev().prev().children().next()["0"].value
                const poster=$(this).prev().prev().children().next()["0"].value
                const content=$(this).prev().children().next()["0"].value
                postRequest(`http://localhost:3000/posts`,{title,poster,content})     
            }
            else{
                const content=$(this).prev().prev().children().next()["0"].value
                const post_id=$(this).prev().children().next()["0"].value
                postRequest(`http://localhost:3000/comments`,{content,post_id})
            }
        })
    }
//------ADD User,Post,Comment--------------------------------------------------------------------
    $('#addUser').click(function(){clickHandler("postU")})
    $('#addPost').click(function(){clickHandler("postC")})
    $('#addComment').click(function(){clickHandler("postP")}) 
//-----------------------------------------------------------------------------------------------
})()