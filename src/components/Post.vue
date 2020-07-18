<template>    
    <div class="card">
        <div class="title">
            <div>{{post.id}} {{post.title}}</div>
            <div>
                <label :for="'checkbox-'+post.id">{{ checked ? 'Понравилось' : 'Не интересно' }}</label>
                <input type="checkbox" :id="'checkbox-'+post.id" v-model="checked" @click="setLike">
            </div>  
        </div>
        <div class="content">
            {{post.body}}
        </div>
        <div class="cat">
            <i>Category: {{post.userId}}</i>
        </div>
    </div>    
</template>
<script>
export default {
    props: ['post'],
    data(){
        return {
            checked: false
        }
    },
    created(){
        this.checked = this.post.like
    },
    methods:{
        setLike(){
            this.checked = !this.checked
            const arr = {
                id: this.post.id,
                like: this.checked
            }
            this.$store.dispatch('setLike', arr)
        }
    }
}
</script>
<style>
    .card {
        padding: 30px;
        margin: 30px;
        background: #fff;
    }
    .title {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
    }
    .title div + div {
        padding-left: 10px
    }
    .content {padding: 10px 0;}
</style>
