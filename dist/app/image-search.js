define(['knockout', 'jquery', 'axios'], function (ko, $, axios, weatherIcons) {
    return function weatherViewModel() {
        this.api = 'http://132.145.52.179:5000'
        this.images = ko.observableArray()
        this.isLoading = ko.observable(false)

        this.search = function (form, e) {
            e.preventDefault()

            this.isLoading(true)

            const image = $('#file-input')[0].files[0]
            const data = new FormData()
            data.append('query_img', image)

            axios.post(`${this.api}/searchRestAPI`, data).then(response => {
                this.images(response.data)
                this.isLoading(false)
            })
        }
    }
})
