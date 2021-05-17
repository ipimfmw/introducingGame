const gameChooser = (function () {
  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "Escape":
        init();
        break;
    }
  });
  const addGame = (name, handleClick) => {
    let container = document.createElement("div");
    container.classList.add("game-container");
    container.innerText = name;
    container.setAttribute("id", name);
    container.addEventListener("click", handleClick);
    return container;
  };
  const clearMenu = () => {
    document.querySelectorAll(".game-container").forEach((node) => {
      node.remove();
    });
  };
  const init = () => {
    clearMenu();
    document.querySelector("#root").appendChild(addGame("wiper", playWiper));
    document
      .querySelector("#root")
      .appendChild(addGame("otaku-game", playOtakuGame));
  };
  const playWiper = () => {
    const game = document.querySelector("#wiper");
    game.classList.add("expanded");
    document.querySelector("#otaku-game")?.remove();
    game.innerText = "";

    const left = document.createElement("div");
    left.classList.add("door");
    const middle = document.createElement("div");
    middle.classList.add("hole");
    const right = document.createElement("div");
    right.classList.add("door");

    game.appendChild(left);
    game.appendChild(middle);
    game.appendChild(right);

    const contentsContainer = document.createElement("div");
    const firstContent = document.createElement("div");
    const secondContent = document.createElement("div");
    contentsContainer.classList.add("wiper-contents-container");
    firstContent.classList.add("first-content");
    secondContent.classList.add("second-content");
    contentsContainer.appendChild(firstContent);
    contentsContainer.appendChild(secondContent);
    game.appendChild(contentsContainer);
  };
  const ListNode = function (text, choices) {
    this.text = text ?? "";
    this.choices = choices ?? [];
    this.render = function (targetNode) {
      const textContainer = document.createElement("div");
      textContainer.classList.add("listnode-text-container");
      textContainer.innerText = this.text;

      const choicesContainer = document.createElement("div");
      choicesContainer.classList.add("listnode-choices-container");
      choices.forEach((choice) => {
        let temp = document.createElement("div");
        temp.classList.add("listnode-choice");
        temp.innerText = choice.text;
        temp.addEventListener("click", () => {
          choice.next?.render(document.querySelector("#otaku-game"));
        });
        choicesContainer.appendChild(temp);
      });
      targetNode.appendChild(textContainer);
      targetNode.appendChild(choicesContainer);
    };
  };
  const playOtakuGame = () => {
    if (document.querySelector("#otaku-game").classList.contains("expanded"))
      return;
    document.querySelector("#otaku-game").classList.add("expanded");
    document.querySelector("#otaku-game").innerText = "";
    document.querySelector("#wiper").remove();
    const niceBubble = new ListNode("넌 친절한 편이구나?", [
      { text: "맞아" },
      { text: "맞아볼래?" },
    ]);
    const badBubble = new ListNode("소를 거는건?", [
      { text: "닥쳐" },
      { text: "닭을 치지그래" },
    ]);
    const initBubble = new ListNode("안녕???", [
      { text: "안녕", next: niceBubble },
      { text: "말 걸지마", next: badBubble },
    ]);

    initBubble.render(document.querySelector("#otaku-game"));
  };
  return {
    init: init,
  };
})();
