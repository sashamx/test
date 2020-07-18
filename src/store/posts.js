import axios from 'axios'
export default {
  state: {
    posts: [],
    page: 1,
    perPage: 5,
    allPost: [],
    category: 0,
    sort: 'Last'
  },
  mutations: {
    allPosts(state, payload){
      state.posts = payload
      state.allPost = payload
    },
    setPage(state, num){
      state.page = num
    },
    setLike(state, payload){
      const post = state.posts.find(p => p.id === payload.id)
      post.like = payload.like
    },
    changeCat(state, payload){      
      if(payload !== 0) state.posts = state.allPost.filter(p => p.userId === payload)
      state.category = payload
    },
    changeDate(state, payload){      
      if(payload === 'Last') {        
        state.posts = state.posts.sort((a, b) => a.id - b.id)        
      } else {
        state.posts = state.posts.sort((a,b) => a.id + b.id)
      }
      state.sort = payload
    }
  },
  actions: {
    async allPosts({commit}){
      try {
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const finalPosts = []
        let date = new Date()
        posts.data.forEach(post => {
          date.setDate(date.getDate() - 1)
          post.like = false
          post.created = date
          finalPosts.push(post)
        });
        commit('allPosts', finalPosts)
      } catch (e){
        throw e
      } finally {
        return 'final'
      }
    },
    setPage({commit}, num){
      commit('setPage', num)
    },
    async setLike({commit}, payload){
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${payload.id}`, {like: payload.like})        
        commit('setLike', payload)
      } catch (e){
        throw e
      }
    },
    changeCat({commit}, payload){
      commit('changeCat', payload)
    },
    changeDate({commit}, payload){
      commit('changeDate', payload)
    }
  },
  getters: {
    test(state){
      return state
    }
  }
}
