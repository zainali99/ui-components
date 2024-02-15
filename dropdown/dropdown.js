// Declaration
class Dropdown {
    constructor(options) {
        this.element = '';
        this.selected_dom = '';
        this.value = '';
        this.options = {
            'hideOnClick': false
        }
        if (options && typeof options == 'object' && Object.keys(options).length) {
            Object.assign(this.options, options)
        }

        this.values = {};

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
            vm.element.querySelector('ul').classList.toggle('show')
        })
        document.addEventListener('click', function(e) {
            const inside_droddown = e.target.closest('.dropdown');

            if (!inside_droddown) {
                vm.hide()
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
  