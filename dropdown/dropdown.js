// Declaration
class Dropdown {
    constructor(options) {
        this.element = '';
        this.selected_dom = '';
        this.value = '';
        this.options = {
            'hideOnClick': false,
            'enableSearch': true
        }
        if (options && typeof options == 'object' && Object.keys(options).length) {
            Object.assign(this.options, options)
        }

        this.values = {};
        this.element_search='';
    }
    
    render(element) {
        // TODO: dynamic rendering with options from JS.
        const el = document.querySelector(element)
        this.selected_dom = el.querySelector('.dropdown-selected-option')
        this.element = el;
        let vm = this;
        
        this.element.querySelectorAll('li').forEach((option) => {



            option.addEventListener('click', () => this.onItemClick(option))
            if (option.dataset.value) this.values[option.dataset.value] = option.innerText;
        });

        this.selected_dom.addEventListener('click', function(){
            if (vm.options.enableSearch) {
                vm.element.querySelector('.dropdown-search-wrapper').classList.toggle('show')
            }
            vm.element.querySelector('ul').classList.toggle('show')
        })

        this.element_search = this.element.querySelector('.dropdown-search-wrapper input');
        this.element_search.addEventListener('keyup', function(e){ vm.onSearch(e)} )

        document.addEventListener('click', function(e) {
            const inside_droddown = e.target.closest('.dropdown');

            if (!inside_droddown) {
                vm.hide()
            }


        })
    }
    onSearch(e){
        const query =(this.element_search) ? this.element_search.value : e.target.value;
        if (!query) {
            return;
        }
        this.element.querySelectorAll('li').forEach((option) => {

            let value = option.dataset.value || option.innerText;
            if (value.startsWith(query)) {
                console.log(value, query)
                option.classList.add('matching')
            } else {
                option.classList.remove('matching')                 
            }
        })


    }
    renderSelectedValue(){
        this.element.querySelectorAll('li').forEach((option) => {
            if (option.dataset.value == this.value) {
                option.classList.add('selected')
            } else {
                option.classList.remove('selected')
            }
        });
    }
    setValue(value) {
        // validate
        if (!this.values[value]) {
            return;
        }

        this.value = value;
        this.selected_dom.innerText = this.values[value];

    }

    hide(){
        this.element.querySelector('ul').classList.remove('show')
    }
    onItemClick(opt) {
        console.log(opt)
        if (this.options.hideOnClick) {
            this.hide();
        }
        this.value = opt.dataset.value || '';
        window.dispatchEvent(new CustomEvent('dropdown.onItemClick', {
            detail: {
                'element':opt,
                'value':opt.dataset.value || ''
            }
        }))
        this.selected_dom.innerText = opt.innerText
        this.renderSelectedValue();
    
    }

  }
  