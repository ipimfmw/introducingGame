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
        await delay(1000);
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

    aa = new messageBlock({ text: "내 팬따윈 필요없어" });
    bb = new messageBlock({ text: "난 말 짧은 남자가 좋더라" });
    kk = new messageBlock({ text: "난 유재웅이다.", type: "USER", next: bb });
    qq = new messageBlock({
      text: "아이유씨 팬이에요!!!",
      type: "USER",
      next: aa,
    });

    pp = new messageBlock({ text: "안녕하세요. 아이유입니다." });
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    pp.render();
    await pp.render();

    tt = new messageBlock({ text: "이름이 뭐에요?", choices: [kk, qq] });
    await tt.render();
  };
  return {
    init: init,
  };
})();
