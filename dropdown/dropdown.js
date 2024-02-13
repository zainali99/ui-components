// Declaration
class Dropdown {
    constructor(options) {
        this.element = '';
        this.selected_dom = '';
        this.options = {
            'hideOnClick': false
        }
        if (options && typeof options == 'object' && Object.keys(options).length) {
            Object.assign(this.options, options)
        }

    }
    
    render(element) {
        // TODO: dynamic rendering with options from JS.
        const el = document.querySelector(element)
        this.selected_dom = el.querySelector('.dropdown-selected-option')
        this.element = el;
        let vm = this;
        
        this.element.querySelectorAll('li').forEach((option) => {
            option.addEventListener('click', () => this.onItemClick(option))
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
    hide(){
        this.element.querySelector('ul').classList.remove('show')
    }
    onItemClick(opt) {
        console.log(opt)
        if (this.options.hideOnClick) {
            this.hide();
        }
        window.dispatchEvent(new CustomEvent('dropdown.onItemClick', {
            detail: {
                'element':opt,
                'value':opt.dataset.value || ''
            }
        }))
        this.selected_dom.innerText = opt.innerText
        
    
    }

  }
  