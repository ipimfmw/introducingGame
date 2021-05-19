const otakuGame = (function(){
    const renderFooter = (choices) => {
        choices.forEach((choice)=>{
            const choiceContainer = document.createElement('div');
            choiceContainer.classList.add('choice-container');
            choiceContainer.innerText = choice.text;
            choiceContainer.addEventListener('click', ()=>{
                choice.render();
            });
        });
    };
    const delay = ms => {
        return new Promise(resolve=> setTimeout(resolve, ms));
    }
    const messageBlock = function({text, type='SYSTEM', choices=null}) {
        this.text = text;
        // type: 'USER', 'SYSTEM'
        this.type = type;
        this.render = async() => {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message-container');
            messageContainer.innerText = this.text;
            if(this.type === 'USER'){
                messageContainer.classList.add('user-message')
            }
            if(this.type === 'SYSTEM'){
                await delay(1000);
            }
            document.querySelector('#content-container').appendChild(messageContainer);
        }
    }
    const init = async ()=>{
        const container = document.createElement('div');
        container.setAttribute('id', 'container');

        const contentContainer = document.createElement('div');
        contentContainer.setAttribute('id', 'content-container');
        container.appendChild(contentContainer);

        const footerContainer = document.createElement('div');
        footerContainer.setAttribute('id', 'footer-container');
        container.appendChild(footerContainer);
        document.body.appendChild(container);

        kk = new messageBlock({text: '나는 재웅이다옹', type: 'USER'})
        tt= new messageBlock({text: 'hi', choices=[kk]});
        await tt.render();
        
        pp = new messageBlock({text: 'hello'});
        await pp.render();

        
        

        aa = new messageBlock({text: 'woeifjwoeifjwoifjwofjwoiefjwoeifjwoiefjwifjwoeifjwoiefjwoifjwiofjweiofjweiofjweiofjwoiejfwoiejfoiwejfoiwjefoiwjfoiwjefiowjefoiwjefiowejfoiwjeofi'});
        await aa.render();
    }
    return {
        init: init,
    }
})()