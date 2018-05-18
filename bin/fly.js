const FLY_SET_STATE_MUTATION = 'FLY_SET_STATE_MUTATION';

const fly = (module) => {
  let { flies, actions = {}, mutations = {} } = module;
  mutations = {
    ...mutations, 
    [FLY_SET_STATE_MUTATION]: (state, payload) => {
      Object.keys(payload).forEach(k => {
        state[k] = payload[k];
      })
    }
  }
  const createSetStateFn = (commit) => (props) => {
    commit(FLY_SET_STATE_MUTATION, props);
  }
  const createFlyActions = () => {
    return Object.keys(flies).reduce((pre, key) => {
      const fly = flies[key];
      pre[key] = ({ commit, state }) => {
        fly(createSetStateFn(commit), state);
      }
      return pre;
    }, {})
  }
  actions = {
    ...actions,
    ...createFlyActions()
  }
  return {
    ...module,
    actions, mutations
  }
}

module.exports = fly;
