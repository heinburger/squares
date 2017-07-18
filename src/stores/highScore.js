import {observable, action, useStrict} from 'mobx'
import {get, post} from 'axios'

const BASE_URL = '/api/'

useStrict(true)
class HighScoreStore {
  scores = observable.shallowArray()
  @observable requesting = false
  @observable posting = false
  @observable scoreAccepted = false
  @observable receivedOnce = false
  errors = observable.shallowMap()

  @action request = () => {
    this.errors.delete('get')
    this.error = null
    this.requesting = true
  }

  @action success = (scores) => {
    this.receivedOnce = true
    this.requesting = false
    this.scores.replace(scores)
  }

  @action failure = (err) => {
    this.requesting = false
    this.errors.set('get', err || 'something happened..')
  }

  @action getScores = () => {
    this.request()
    get(BASE_URL + 'scores', {params: {limit: 10}})
      .then((resp) => this.success(resp.data))
      .catch((err) => this.failure(err))
  }

  @action requestPost = () => {
    this.errors.delete('post')
    this.posting = true
  }

  @action successPost = (score) => {
    this.posting = false
    this.scoreAccepted = true
    this.scores.push(score)
  }

  @action failure = (err) => {
    this.posting = false
    this.errors.set('post', err || 'something happened..')
  }

  @action postScore = (data) => {
    this.requestPost()
    post(BASE_URL + 'submit', data)
      .then((resp) => this.successPost(resp))
      .catch((err) => this.failurePost(err))
  }
}

const highScoreStore = new HighScoreStore()
export default highScoreStore
