class Controller {
  constructor() {}
  ObjectLinker(model, view, parser) {
    this._model = model;
    this._view = view;
    this._parser = parser;
  }

  AddEventHandler() {
    this._view.AddEventHandler({
      "base-view": {
        "center-button": this.BaseView_ShowOverlay(),
        "go-button": this.BaseView_MakeGiftCard(),
        "close-button": this.BaseView_CloseOverlay(),
      },
    });
  }

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  BaseView_ShowOverlay() {
    return () => {
      this._model.ChangeViewModel([
        { view: "base-view", object: "text-input", data: { show: true } },
      ]);
    };
  }
  BaseView_MakeGiftCard() {
    return () => {
      this._view.QuickChange("base-view", "goButton");
      let text = this._view.GetViewData("base-view", "code");
      let codes = this._parser.Run(text);
      if (codes.length === 0) {
        return;
      }
      this._model.ChangeViewModel([
        { view: "base-view", object: "code-book", data: codes },
      ]);
    };
  }
  BaseView_CloseOverlay() {
    return () => {
      this._model.ChangeViewModel([
        { view: "base-view", object: "text-input", data: { show: false } },
      ]);
    };
  }
}
