const otakuGame = (function () {
  const clearChildrenNodes = (node) => {
    console.log(node);
    while (node.children.length > 0) {
      node.children[0].remove();
    }
  };
  const renderFooter = (choices) => {
    choices.forEach((choice) => {
      const choiceContainer = document.createElement("div");
      choiceContainer.classList.add("choice-item-container");
      choiceContainer.innerText = choice.text;
      choiceContainer.addEventListener("click", () => {
        choice.render();
        clearChildrenNodes(document.querySelector("#footer-container"));
      });
      document.querySelector("#footer-container").appendChild(choiceContainer);
    });
  };
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const messageBlock = function ({
    text,
    type = "SYSTEM",
    choices = null,
    next = null,
    talmobeam = false,
  }) {
    this.text = text;
    // type: 'USER', 'SYSTEM'
    this.type = type;
    this.render = async () => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");
      messageContainer.innerText = this.text;
      if (this.type === "USER") {
        messageContainer.classList.add("user-message");
      }
      if (this.type === "SYSTEM") {
        await delay(500);
      }
      if (choices) {
        renderFooter(choices);
      }
      document
        .querySelector("#content-container")
        .appendChild(messageContainer);
      if (next) {
        // await delay(1000);
        next.render();
      }
      if (talmobeam) {
        await delay(2000);
        document.body.classList.add('talmo');

        await delay(2000);
        document.body.classList.remove('talmo');
      }
      document
        .querySelector("#content-container")
        .scroll(0, document.querySelector("#content-container").offsetHeight);
    };
  };
  const init = async () => {
    const container = document.createElement("div");
    container.setAttribute("id", "container");

    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("id", "content-container");
    container.appendChild(contentContainer);

    const footerContainer = document.createElement("div");
    footerContainer.setAttribute("id", "footer-container");
    container.appendChild(footerContainer);
    document.body.appendChild(container);

    end = new messageBlock({text: "game over"})
    aa = new messageBlock({ text: "머리카락만 잘 지켜도 월 700 이득이라고 생각하고 행복하게 사세요~", next: end });
    bb = new messageBlock({ text: "돈 밝히면 대머리됨 탈모 빔~~~", next: end, talmobeam: true });
    kk = new messageBlock({ text: "돈이 짱이지!! 1000만원!!!", type: "USER", next: bb });
    qq = new messageBlock({
      text: "300만원으로 행복하게 살래..",
      type: "USER",
      next: aa,
    });

    p7 = new messageBlock({ text: "세후 월급 1000만원에 평생 대머리로 살기 vs 세후 월급 300만원에 풍성하게 살기", choices: [kk, qq] });
    p6 = new messageBlock({ text: "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하", next: p7});
    p5 = new messageBlock({ text: "컨텐츠 양이 화면 크기를 넘어갈 때 스크롤이 잘 되는지 확인하기 위해 뭔가 계속 넣어야해", next: p6 });
    p4 = new messageBlock({ text: "근데 영 어설픈 게 유튜브에 나오는 싸구려 광고나 어그로 영상같다.", next: p5 });
    p3 = new messageBlock({ text: "카카오톡 처럼 보이게 하니 제법 깔끔하네", next: p4 });
    p2 = new messageBlock({ text: "선택지에 따라 다른 내용으로 이어지는 대화를 시도하고싶었어.", next: p3 });
    p1 = new messageBlock({ text: "커밍아웃 시뮬레이션 따라하기!!", next: p2 });
    pp = new messageBlock({ text: "안녕", next: p1 });
    pp.render();
  };
  return {
    init: init,
  };
})();
