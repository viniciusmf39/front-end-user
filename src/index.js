const axios = require('axios').default;

class User {
    constructor() {
        this.name = document.getElementById('txtName');
        this.email = document.getElementById('txtEmail');
        this.age = document.getElementById('txtAge');
        this.phone = document.getElementById('txtPhone');
        this.btnRegisterUser = document.getElementById('btnRegister');

        this.getUsers();
        this.events();
    }

    events(){
        this.btnRegisterUser.onclick = (event) => this.createUser(event) ;
    }

    getUsers() {
        axios.get(`http://localhost:3000/users`)
            .then((response) => {
                this.recoveryUser(response.data.usersList);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    recoveryUser(data){
        for(user of data) {
            const html = this.layoutUser(user.name , user.email, user.age , user.phone , user.id) 

            this.inserthtml(html);
        }
        const classe = document.querySelectorAll('.delete-user');

        for (button of classe) {
            button.onclick = event => this.deleteUser(event,button.id);
        }
    }
    deleteUser(id){
        console.log(`deletou o usuario do id; ${id});
    }

    layoutUser(name, email, age, phone, id){
        return `
        <div class =" column mt-5">
             <div class = "card">
                 <div class = "user - body">
                     <h3 class = "user-name">${name}</h3>
                     <p class = "user-email">${email}</p>
                     <p class = "user-age">${age}</p>
                     <p class = "user-phone">${phone}</p>
                     <button type="button" class="btn btn-danger" id="${id}">Deletar</button>
                 </div>
             </div>
        </div>
        `

    userValidate(event){
        event.preventDefault();
        if(this.name.value && this.email.value && this.age.value && this.phone.value){
            const user = {
                name: this.name.value,
                email:this.email.value ,
                age: this.age.value ,
                phone : this.phone.value
            }

            this.createUser(user);
        }else {
            alert('Favor, preencha todos os campos')
        }
        
    }
    inserthtml(html){
        document.getElementById('usersBoard').innerHTML += html ;

        const classe = document.querySelectorAll('delete-user');

    }

    createUser(user){
        axios.post('http://localhost:3000/users', user ) 
            .then((response)=>{
                const html = this.layoutUser(user.name , user.email, user.age, user.phone);

                this.inserthtml(html);
            })
            .catch((error) =>{
                console.log(error);
            })
    }
}

new User();