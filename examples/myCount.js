import Vue from 'vue';
import Vuex from 'vuex';
import fly from '../bin/fly';

Vue.use(Vuex);

const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve()
    }, time);
  })
}

const module = fly({
  state: {
    myCount: 1,
    my2Count: 3
  },
  flies: {
    async goFly(setState, state) {
      // 直接编写你的业务代码
      await wait(2000);
      setState({
        myCount: state.myCount + 1,
        my2Count: state.my2Count + 1
      })
    }
  }
})


const store = new Vuex.Store(module);
console.log(store.state.myCount, store.state.my2Count); // -> 1, 3

const task = async () => {
  store.dispatch('goFly');
  await wait(3000);
  console.log(store.state.myCount, store.state.my2Count); // -> 2, 4
  store.dispatch('goFly');
  await wait(3000);
  console.log(store.state.myCount, store.state.my2Count); // -> 3, 5
}
task();

