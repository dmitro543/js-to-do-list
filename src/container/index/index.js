 class Todo {
    static #NAME = 'todo'

    static #saveData = () => {
        localStorage.setItem(
            this.#NAME,
            JSON.stringify({
                list: this.#list,
                count: this.#count,
            }),
        )
    }

    static #loadData = () => {
        const data = localStorage.getItem(this.#NAME)

        if (data) {
            const { list, count} = JSON.parse(data)
            this.#list = list
            this.#count = count
        }
    }

    static #list = []
    static #count = 0

    static #createTaskData = (text) => {
        this.#list.push({
            id: ++this.#count,
            text,
            done: false,
        })
    }

    static #block = null
    static #template = null
    static #input = null
    static #button = null

    static init = () => {
        this.#template = document.getElementById('task',).content.firstElementChild()

        this.document.querySelector('.task_List')
        this.document.querySelector('.form_input')
        this.document.querySelector('.form_button')
        this.#button.onclick = this.#handeleAdd
        this.#loadData()
        this.#render()
    }

    static #handeleAdd = () => {
        const value = this.#input.value
        if (value.length > 1) {
            this.#createTaskData(value)
            this.#input.value = ''
            this.#render()
            this.#saveData()
        }
    }

    static #render = () => {
        this.#block.innerHTML = ''

        if (this.#list.length === 0) {
            this.#block.innerText = `Список задач пустий`
        } else {
            this.#list.forEach((taskData) => {
                const el = this.#createTaskElem(taskData)
                this.#block.append(el)
            })
        }
    }

    static #createTaskElem = (data) => {
        const el = this.#template.cloneNode(true)

        const [id, text, btnDo, btnCancel] = el.children

        id.innerText = `${data.id}`

        text.innerText = data.text

        btnCancel.onclick = this.#handeleCancel(data)

        btnDo.onclick = this.#handeleDo(data, btnDo, el)

        if(data.done) {
            el.classlist.add('task-done')
            btn.classlist.remove('task-button_do')
            btn.classlist.add('task-button_done')
        }
        
        return el
    }

    static #handeleDo = (data, btn, el) => () => {
        const result = this.#toggleDone(data.id)
        
        if (result === true || result === false) {
            el.classlist.add('task-done')
            btn.classlist.remove('task-button_do')
            btn.classlist.add('task-button_done')

            this.#saveData()
        }
    }

    static #toggleDone = (id) => {
        const task = this.#list.find((item) => item.id === id)

        if(task) {
            task.done = !task.done
            return task.done
        } else {
            return null
        }
    }

    static #handeleCancel = (data) => () => {
        if(confirm('Видалити задачу?')) {
            const result = this.#deleteById(data.id)
            if(result) {
                this.#render()
                this.#saveData()
            }
        }
    }

    static #deleteById = (id) => {
        this.#list = this.#list.filter((item) => item.id !== id)
        return true
    }
}

Todo.init()

window.todo = Todo