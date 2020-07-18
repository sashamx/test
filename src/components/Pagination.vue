<template>
    <div class="paging">
        <div
        v-for="n in pages"
        :key="n"
        @click="selectPage(n)"
        :class="curPage === n ? 'active': ''"
        >
        {{n}}
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data(){
        return {
            pages: [],
            curPage: 1
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            page: state => state.posts.page,
            perPage: state => state.posts.perPage,
        }),
    },
    methods: {
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        selectPage(num){
            this.curPage = num
            this.$store.dispatch('setPage', num)
        }
    },
    watch: {
        posts () {
            this.pages = []
            this.setPages();
        }
    },
    updated(){
        this.curPage = this.page
    },
    
}
</script>
<style>
    .paging .active {
        background: #333;
        color: #fff;
    }
</style>
