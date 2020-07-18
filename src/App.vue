<template>
  <div class="wrap">
    <div class="leftBlock">
      <div>
        <span><strong>Category:</strong></span>
        <select @change="onChange($event)" v-model="catKey">
          <option
            v-for="c in cats"
            :key="c"
            :value="c"
          >Category {{c}}</option>
        </select>

        <span><strong>Sort by date:</strong></span>
        <select @change="onChange($event)" v-model="dateKey">
          <option
            v-for="d in dates"
            :key="d"
            :value="d"
          >{{d}}</option>
        </select>

        <span><strong>Link:</strong></span>        
        {{urlBuild()}}        
      </div>      
    </div>
    <div class="rightBlock">
      <s-post
        v-for="post in paginate(posts)"
        :key="post.id"
        :post="post"
      ></s-post>
      <s-pagination></s-pagination>
    </div>    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Post from './components/Post'
import Pagination from './components/Pagination'
export default {
  components: {
    SPagination: Pagination,
    SPost: Post
  },
  data(){
    return {
      catKey: '',
      cats: [1,2,3,4,5,6,7,8,9,10],
      dateKey: 'Last',
      dates: ['Last', 'Early'],
    }    
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      page: state => state.posts.page,
      perPage: state => state.posts.perPage,
      category: state => state.posts.category,
      sort: state => state.posts.sort,
    }),
    ...mapGetters([
      'test'
    ]),
  },
  async mounted(){
    try {
      const a = await this.$store.dispatch('allPosts')      
      const querys = this.$route.query.cat
      if(a){
        let arr = querys.split('-')
        const [cat, page, sort] = arr
        this.catKey = Number(cat)
        this.dateKey = sort        
        this.$store.dispatch('setPage', Number(page))
        this.$store.dispatch('changeDate', sort) 
        this.$store.dispatch('changeCat', Number(cat))
      }
    } catch(e){
      throw e
    }
  },
  methods: {    
    paginate (posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return posts.slice(from, to);
    },  
    onChange(){
      this.$store.dispatch('changeCat', this.catKey)
      this.$store.dispatch('changeDate', this.dateKey)
    },
    urlBuild(){
      return `http://testwork.khamdamov.ru/?cat=${this.category}-${this.page}-${this.sort}`
    }
  },  
}
</script>

<style>
html, body {
  background: #f5f6fa;
  padding: 0;
  margin: 0;
  font: normal 13px Arial;
}
.wrap {
  display: flex;
}
.leftBlock {
  flex: 2;
  background: #fff;
  height: 100vh;
}
.leftBlock div {
  padding: 30px;
}
.leftBlock div span {
  padding: 20px 0 10px;
  display: block;
}
.leftBlock div select {
  width: 100%;
}
.rightBlock {
  flex: 8;
}

.paging {
  display: flex;
  padding: 0 30px;
}
.paging div {
  padding: 10px 10px;
  background: #fff;
  margin-right: 10px;
  cursor: pointer;
}
</style>
