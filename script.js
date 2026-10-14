const API = "https://jsonplaceholder.typicode.com/users";
const table = document.getElementById("userTable");

const error = document.getElementById("error");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const userDetails = document.getElementById("userDetails");
const close = document.getElementById("close");
const posts = document.getElementById("posts");


let users = [];
console.log("hai");
async function fetchUsers(){

loading.style.display="block";
error.innerHTML="";
table.innerHTML="";
try{

const response = await fetch(API);

if(!response.ok){
throw new Error("Failed to fetch users");
}

users = await response.json();

displayUsers(users);

}
catch(err){
error.innerHTML=err.message;
}
finally{
loading.style.display="none";
}

}

function displayUsers(data){

table.innerHTML="";

data.forEach(user=>{

table.innerHTML+=`
<tr>

<td>${user.name}</td>

<td>${user.username}</td>

<td>${user.email}</td>

<td>${user.phone}</td>

<td>${user.company.name}</td>

<td>
<button onclick="viewDetails(${user.id})">
View
</button>
</td>

<td>
<button onclick="viewPosts(${user.id})">
View Posts
</button>
</td>

</tr>

`;

});

}
search.addEventListener("keyup",()=>{

const text = search.value.toLowerCase();

const filtered = users.filter(user=>

user.name.toLowerCase().includes(text) ||

user.username.toLowerCase().includes(text)

);

displayUsers(filtered);

});
function viewDetails(id){

const user = users.find(u=>u.id===id);

userDetails.innerHTML=`

<p><b>Name :</b> ${user.name}</p>

<p><b>Username :</b> ${user.username}</p>

<p><b>Email :</b> ${user.email}</p>

<p><b>Phone :</b> ${user.phone}</p>

<p><b>Address :</b> ${user.address.street}</p>

<p><b>City :</b> ${user.address.city}</p>

<p><b>Zip Code :</b> ${user.address.zipcode}</p>

<p><b>Website :</b> ${user.website}</p>

<p><b>Company :</b> ${user.company.name}</p>

`;

modal.style.display="block";

}
close.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target==modal){

modal.style.display="none";

}

}

async function viewPosts(id){

posts.innerHTML="<h3>Loading Posts...</h3>";

try{

const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

if(!response.ok){

throw new Error("Unable to fetch posts");

}
const data = await response.json();

posts.innerHTML="";

data.forEach(post=>{

posts.innerHTML+=`

<div class="post">

<h3>${post.title}</h3>

<p>${post.body}</p>

</div>

`;

});
}

catch(err){

posts.innerHTML=`<h3>${err.message}</h3>`;

}

}
document.getElementById("refreshBtn").addEventListener("click",()=>{

table.innerHTML="";
posts.innerHTML="";
fetchUsers();

});

fetchUsers();