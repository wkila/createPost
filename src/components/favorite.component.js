import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../templates/post.template'
import { TransformService } from '../services/transform.service'

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id)

    this.loader = options.loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    let results = TransformService.fbObjectToArray(await apiService.fetchPosts())
    this.renderList(favorites, results)
    this.loader.hide()
  }

  renderList(list = [], results) {
    if (!list.length) {
      this.$el.insertAdjacentHTML('afterbegin', 'Вы пока ничего не добавили')
    }else {
      results.forEach(item => {
        let codeHTML = ''
        if (list.includes(item.id) && list.length) {
          codeHTML = `
            <ul>
              <li><a href="#" data-id="${item.id}" class="js-link">${item.title}</a></li>
            </ul>
          `
          this.$el.insertAdjacentHTML('afterbegin', codeHTML)
        }
      })
    }
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(event) {
  event.preventDefault()
  if (event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.id
    console.log(postId)
    this.$el.innerHTML = ''

    this.loader.show()
    const post = await apiService.fetchPostById(postId)
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {widthButton: false}))
  }
}
