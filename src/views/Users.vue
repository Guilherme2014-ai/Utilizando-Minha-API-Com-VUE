<template>
    <div style="background: -webkit-radial-gradient(rgb(163, 206, 255),rgb(255, 210, 210),rgb(224, 224, 224));">


        <br><h1>Painel De Admin</h1><hr><br>


        <div v-for="user in users" :key="user.id">


            
            <div :class="{'modal': isActive == false, 'modal is-active': isActive == true }">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Deseja Realmente Apagar o Usuario ?</p>
                        <button class="delete" aria-label="close" @click="close()"></button>
                    </header>
                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="deleteUser()">Sim</button>
                        <button class="button" @click="close()">Nao</button>
                    </footer>
                </div>
            </div>        



            <div class="card" style="margin:60px; margin-right:250px;margin-left:250px;">

                <header class="card-header">
                    <p class="card-header-title">
                        {{ user.name }}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        {{ user.email }}
                    </div>
                </div>
                
                <footer class="card-footer">
                    <router-link class="card-footer-item" :to="{name: 'Users_Edit', params:{id: user.id}}">Edit</router-link>
                    <a class="card-footer-item" @click="chooseTheUser(user.id)"><strong>Delete</strong></a>
                </footer>

            </div>
        </div><br>

    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            users: [],
            userToDelete: '',
            isActive: false
        }
    },
    methods: {
        close(){
            this.isActive = false
        },
        chooseTheUser(id){
            this.userToDelete = id
            this.isActive = true
        },
        deleteUser(){
            const req = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.delete(`http://localhost/user/${this.userToDelete}`,req).then(data => {
                this.users = data.data
                this.isActive = false
            }).catch(err => {
                this.isActive = false
                setTimeout(() => {
                    alert('Ocorreu um Erro !')
                }, 410);
                console.error(err)
            })
        }
    },
    created(){
        axios.get("http://localhost").then((data) => {
            console.log(data.data)
            this.users = data["data"]
        }).catch(err => {console.error(err)})
    }
}
</script>